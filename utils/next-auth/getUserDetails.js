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

export default async function getUserDetails(email) {
  const exists = await prisma.user.findMany({
    where: {
      email: email,
    },
    include: {
      leads: true,
      subscribed: true,
    },
  });
  return {
    leads: exists && exists[0].leads.length > 0 ? true : false,
    isSubscribed: exists && exists[0].subscribed.length > 0 ? true : false,
  };
}
