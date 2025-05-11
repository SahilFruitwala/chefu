"use server";

import { db } from "@/db";
import { usage, features, SelectFeature } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, gt, lt } from "drizzle-orm";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "counter" });

export const updateFeatureCount = async (
  userId: string,
  featureName: string
) => {
  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    userId,
    featureName
  );

  if (usageCount + 1 > featureLimit) {
    logger.error(
      "'%s' has reached the limit for %s generation",
      userId,
      featureName
    );
    return { error: "Feature limit reached" };
  }

  try {
    const featureId = (
      await db
        .select({ id: features.id })
        .from(features)
        .where(eq(features.featureName, featureName))
    )[0].id;

    try {
      return await db
        .update(usage)
        .set({ usageCount: usageCount + 1 })
        .where(and(eq(usage.userId, userId), eq(usage.featureId, featureId)))
        .returning({ count: usage.usageCount });
    } catch (error) {
      log.error("Error updating feature count: %s", error);
      throw new Error("Error updating feature count");
    }
  } catch (error) {
    log.error("Error fetching feature ID: %s", error);
    throw new Error("Error fetching feature ID");
  }
};

export const getFeatureCountAndLimit = async (
  userId: string,
  featureName: string
): Promise<{ usageCount: number; featureLimit: number }> => {
  const { has } = await auth();
  const isProUser = has({ plan: "pro" });

  const today = new Date();

  // TODO: if it is monthy check range else today
  let featuresData;
  try {
    featuresData = (
      await db
        .select()
        .from(features)
        .where(eq(features.featureName, featureName))
        .limit(1)
    )[0];
  } catch (error) {
    log.error("Error fetching feature data: %s", error);
    throw new Error("Error fetching feature data");
  }

  if (!featuresData) {
    log.error("Feature not found: %s", featureName);
    throw new Error("Feature not found");
  }

  if (featuresData.limitType === "daily") {
    try {
      const usages = await db
        .select({
          usageCount: usage.usageCount,
          featureLimit: usage.featureLimit,
        })
        .from(usage)
        .where(
          and(
            eq(usage.userId, userId),
            eq(usage.featureId, featuresData.id),
            gt(usage.periodStart, new Date(today.setDate(today.getDate() - 1))),
            lt(usage.periodStart, new Date(today.setDate(today.getDate() + 1)))
          )
        );
      try {
        if (usages.length === 0) {
          return await insertUsage(userId, featuresData, isProUser, today);
        }
      } catch (error) {
        log.error("Error inserting usage data: %s", error);
        throw new Error("Error fetching usage data");
      }
      return usages[0];
    } catch (error) {
      log.error("Error fetching usage data: %s", error);
      throw new Error("Error fetching usage data");
    }
  }

  // monthly
  const currentDate = today;
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const usages = await db
      .select({
        usageCount: usage.usageCount,
        featureLimit: usage.featureLimit,
      })
      .from(usage)
      .where(
        and(
          eq(usage.userId, userId),
          eq(usage.featureId, featuresData.id),
          gt(
            usage.periodStart,
            new Date(new Date().setDate(today.getDate() - 1))
          ),
          lt(usage.periodStart, endOfMonth)
        )
      );

    try {
      if (usages.length === 0) {
        return await insertUsage(userId, featuresData, isProUser, today);
      }
    } catch (error) {
      log.error("Error inserting usage data: %s", error);
      throw new Error("Error fetching usage data");
    }
    return usages[0];
  } catch (error) {
    log.error("Error fetching usage data: %s", error);
    throw new Error("Error fetching usage data");
  }
};

const insertUsage = async (
  userId: string,
  featuresData: SelectFeature,
  isProUser: boolean,
  today: Date
): Promise<{
  usageCount: number;
  featureLimit: number;
}> => {
  try {
    return (
      await db
        .insert(usage)
        .values({
          userId,
          featureId: featuresData.id,
          usageCount: 0,
          featureLimit: isProUser
            ? featuresData.premiumLimit
            : featuresData.freeLimit,
          periodStart: today,
        })
        .returning({
          usageCount: usage.usageCount,
          featureLimit: usage.featureLimit,
        })
    )[0];
  } catch (error) {
    log.error("Error inserting usage data: %s", error);
    throw new Error("Error inserting usage data");
  }
};
