import { auth,currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import db from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE,
  entityTitle: string;
  action: ACTION;
};

export default async function createAudit({
  entityId,
  entityType,
  entityTitle,
  action,
}:Props) {
  try {
    const user = await currentUser();
  const { orgId } = auth();
  if (!user || !orgId) {
    throw new Error("No user found");
  }
  await db.auditLog.create({
    data: {
      orgId,
      action,
      entityId,
      entityType,
      entityTitle,
      userId: user.id,
      userImage: user?.imageUrl,
      userName: user?.firstName + " " + user?.lastName,
    },
  });
  } catch (error) {
    console.log(error);
  }
  
}


