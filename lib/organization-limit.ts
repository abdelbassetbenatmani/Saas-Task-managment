import { MAX_FREE_BOARDS } from "@/constant/board";
import db from "./db";
import { auth } from "@clerk/nextjs";

export const incrementOrganizationBoardCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (orgLimit) {
    await db.organizationLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.organizationLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decrementOrganizationBoardCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (orgLimit) {
    await db.organizationLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.organizationLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const isAvailableOrganizationBoard = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }
  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (!orgLimit) {
    return 0;
  }
  return orgLimit.count;
};
