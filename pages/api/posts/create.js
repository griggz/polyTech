import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

const prep = (data, session) => ({
  title: data.title.split(" ").join("_").toLowerCase().trim(),
  content: data.content.trim(),
  User: {
    connect: { id: session.user.id },
  },
});

export default async (req, res) => {
  const session = await getSession({ req });
  if (session && session.user.groups.includes("admin")) {
    if (req.method === "POST") {
      const obj = prep(req.body, session);
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
