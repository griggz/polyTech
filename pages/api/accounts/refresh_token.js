import axios from 'axios'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // retrieve payment intent data
      const {data} = await axios.post('https://dac-datahub-staging.herokuapp.com/api​/leads​/contact_us​/', req.body)
      res.status(200).send(data)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.response.data.detail, data: err.response.data })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
