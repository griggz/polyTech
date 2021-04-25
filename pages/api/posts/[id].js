import { getSession } from "next-auth/client";
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

const prep = (data, session, tags) => ({
  title: data.title
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .join("_")
    .toLowerCase()
    .trim(),
  content: data.content.trim(),
  image: data.image.trim(),
  User: {
    connect: { id: session.user.id },
  },
  tags: {
    set: tags,
  },
});

export default async (req, res) => {
  const session = await getSession({ req });
  if (
    req.method === "PUT" &&
    session &&
    session.user.groups.includes("admin")
  ) {
    try {
      const tags = [];
      if (req.body.tags) {
        const tagObjs = await prisma.tags.findMany({
          where: {
            title: { in: req.body.tags },
          },
        });
        tagObjs.map((t) => tags.push({ id: t.id }));
      }
      const obj = prep(req.body, session, tags);
      // Put
      const data = await prisma.posts.update({
        where: { id: parseInt(req.query.id) },
        data: obj,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.response.data.detail,
        data: err.response.data,
      });
    }
  } else if (req.method === "GET" && session) {
    try {
      // GET HERE
      const data = await prisma.posts.findUnique({
        where: {
          id: parseInt(req.query.id),
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
