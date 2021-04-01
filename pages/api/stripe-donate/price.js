import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST' && req.headers.authorization === process.env.API_AUTH_TOKEN) {
    try {
      const { amount, currency } = req.body

      const product = await stripe.products.create(
        {
          name: 'Covid19-Donation Monthly Subscription',
          type: 'service',
          description: 'Monthly donation subscription plan.'
        })

      const price = await stripe.prices.create(
        {
          unit_amount: amount,
          currency,
          recurring:
          {
            interval: 'month'
          },
          product: product.id
        })
      res.status(200).send(price)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
