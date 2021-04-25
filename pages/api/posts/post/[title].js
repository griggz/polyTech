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
      // GET HERE
      const data = await prisma.posts.findUnique({
        where: {
          title: req.query.title,
        },
        include: {
          tags: true,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.response.data.detail,
        data: err.response.data,
      });
    }
  } else {
    res.setHeader("Allow", "POST", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
