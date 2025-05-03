"use server";

import { db } from "@/db";
import {
  SelectUser,
  users,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function addUser(email: string, id: string) {
  const existingUser = await getUser(email);
  if (existingUser.length === 0) {
    await db.insert(users).values({ email: email, id: id });
  }
}

export async function getUser(email: string): Promise<Array<SelectUser>> {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
}
