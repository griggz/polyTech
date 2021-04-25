import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

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
    connect: tags,
  },
});

export default async (req, res) => {
  const session = await getSession({ req });
  if (session && session.user.groups.includes("admin")) {
    if (req.method === "POST") {
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
      try {
        const post = await prisma.posts.create({
          data: obj,
        });

        res.status(200).send(post);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          statusCode: 500,
          message: err.response.data.detail,
          data: err.response.data,
        });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  } else {
    res.send({
      error: "You need to signed in!",
    });
  }
};
