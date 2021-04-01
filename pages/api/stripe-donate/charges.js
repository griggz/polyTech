import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { paymentIntentId } = req.body

      // retrieve payment intent data
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId)

      res.status(200).send(paymentIntent.charges.data[0])
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
