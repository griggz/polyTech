import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST' && req.headers.authorization === process.env.API_AUTH_TOKEN) {
    try {
      const { email, name, address, phone, source } = req.body

      const customerExist = await stripe.customers.list(
        {
          email: email,
          limit: 0
        })
      // console.log('customerExist', customerExist.data[0])
      if (customerExist.data.length < 1) {
        const customer = await stripe.customers.create({
          email,
          name,
          address,
          phone,
          source
        })
        res.status(200).send(customer.id)
      } else {
        res.status(200).send(customerExist.data[0].id)
      }
    } catch (err) {
      res.send({ error: err })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
