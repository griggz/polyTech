import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const exists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      console.log("MADE IT");
      res.status(200).send("");
    } catch (err) {
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
};
