import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY)

export default async (req, res) => {
  if (req.method === 'POST' && req.headers.authorization === process.env.API_AUTH_TOKEN) {
    const { customer, price, paymentMethod, description } = req.body
    // Attach the payment method to the customer
    try {
      await stripe.paymentMethods.attach(paymentMethod, {
        customer: customer
      })

      // Change the default invoice settings on the customer to the new payment method
      await stripe.customers.update(
        customer,
        {
          invoice_settings: {
            default_payment_method: paymentMethod
          }
        }
      )

      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer,
        items: [{ price: price.id }],
        expand: ['latest_invoice.payment_intent']
      })

      // Update Payment Intent
      await stripe.paymentIntents.update(subscription.latest_invoice.payment_intent.id,
        { description: description })

      res.send(subscription)
    } catch (error) {
      res.send({ error: error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
