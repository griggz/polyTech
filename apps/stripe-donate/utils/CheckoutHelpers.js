import axios from 'axios'

// Function to create a plan via api
const createPrice = async (amount, currency) => {
  try {
    const price = await axios.post('/api/price', {
      amount: amount,
      currency: currency
    })
    return price.data
  } catch (err) {
    console.log(err)
  }
}

// Function to create a subscription
const fetchCharge = async (paymentIntentId) => {
  try {
    const charge = await axios.post('/api/charges', {
      paymentIntentId: paymentIntentId
    })
    return charge.data
  } catch (err) {
    console.log(err)
  }
}

export { createPrice, fetchCharge }
