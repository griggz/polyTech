import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST' && req.headers.authorization === process.env.API_AUTH_TOKEN) {
    try {
      const { customer } = req.body

      const invoice = await stripe.invoices.create({
        customer
      })
      res.status(200).send(invoice)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
