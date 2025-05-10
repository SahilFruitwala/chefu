"use server";

import { db } from "@/db";
import { usage, features, SelectFeature } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, gt, lt } from "drizzle-orm";

export const updateFeatureCount = async (
  userId: string,
  featureName: string,
) => {
  const { usageCount, featureLimit } = await getFeatureCountAndLimit(
    userId,
    featureName
  );

  if (usageCount + 1 > featureLimit) {
    throw new Error("Feature limit reached");
  }

  const featureId = (
    await db
      .select({ id: features.id })
      .from(features)
      .where(eq(features.featureName, featureName))
  )[0].id;

  return await db
    .update(usage)
    .set({ usageCount: usageCount + 1 })
    .where(and(eq(usage.userId, userId), eq(usage.featureId, featureId)))
    .returning({ count: usage.usageCount });
    
};

export const getFeatureCountAndLimit = async (
  userId: string,
  featureName: string
): Promise<{ usageCount: number; featureLimit: number }> => {
  const { has } = await auth();
  const isProUser = has({ plan: "pro" });

  const today = new Date();

  // TODO: if it is monthy check range else today
  const featuresData = (
    await db
      .select()
      .from(features)
      .where(eq(features.featureName, featureName))
      .limit(1)
  )[0];

  if (featuresData.limitType === "daily") {
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

    if (usages.length === 0) {
      return await insertUsage(userId, featuresData, isProUser, today);
    }
    return usages[0];
  }

  // monthly
  const currentDate = today;
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

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

  if (usages.length === 0) {
    return await insertUsage(userId, featuresData, isProUser, today);
  }
  return usages[0];
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
};
