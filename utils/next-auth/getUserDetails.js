import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "live") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function getUserDetails(id) {
  const exists = await prisma.user.findMany({
    where: {
      id: id,
    },
    include: {
      leads: true,
      subscribed: true,
      groups: true,
    },
  });
  return {
    leads: exists && exists[0].leads.length > 0 ? true : false,
    isSubscribed: exists && exists[0].subscribed.length > 0 ? true : false,
    groups:
      exists && exists[0].groups
        ? exists[0].groups.map((d) => {
            return d.group;
          })
        : "None",
  };
}
