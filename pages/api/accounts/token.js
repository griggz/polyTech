import axios from 'axios'

export default async (req, res) => {

  if (req.method === 'POST') {
    try {
      // retrieve payment intent data
      const {data} = await axios.post('https://dac-datahub-staging.herokuapp.com/account/api/token/', req.body)
      res.status(200).send(data)
    } catch (err) {
      console.log(err.response)
      if (err.response.status === 401) {
        res.status(401).json({ statusCode: 401, message: err.response.data.detail })
      } else {
        res.status(500).json({ statusCode: 500, message: err.response.data.detail })
      }
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
