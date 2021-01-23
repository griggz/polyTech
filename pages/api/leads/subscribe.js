import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const subscribe = await prisma.subscribe.create({
        data: req.body
      })
      res.status(200).send(subscribe)
    } catch (err) {
      console.log(err)
      res.status(500).json({ statusCode: 500, message: err.response.data.detail, data: err.response.data })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
