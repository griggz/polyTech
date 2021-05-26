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

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const leads = await prisma.leads.findMany({
        include: {
          solutionType: true,
        },
      });
      const subs = await prisma.subscribe.findMany();

      res.status(200).send({ leads: leads, subs: subs });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.response.data.detail,
        data: err.response.data,
      });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
