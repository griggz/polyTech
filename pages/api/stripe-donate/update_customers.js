import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { customer, paymentMethod } = req.body

      const update = await stripe.customers.update(
        customer,
        paymentMethod
        // invoiceSetttings
      )
      res.status(200).send(update)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
