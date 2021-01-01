import axios from 'axios'

const prep = (data) => ({
  first_name: data.first_name,
  last_name: data.last_name,
  email: data.email,
  job_title: data.job_title,
  work_phone: +data.work_phone,
  web_site: data.web_site,
  organization: data.organization,
  number_of_staff: +data.number_of_staff,
  industry: data.industry,
  solution_option: data.solution_option,
  method_of_referral: data.method_of_referral,
  additional_details: data.additional_details,
  contact_source: data.contact_source
})

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const obj = prep(req.body)
      const {data} = await axios.post('https://dac-datahub-staging.herokuapp.com/api/leads/contact_us/', obj)
      if (req.body.subscribe) {
        await axios.post(
          'https://dac-datahub-staging.herokuapp.com/api/leads/subscribe/',
          {
            email: obj.email
          }
        )
      }
      res.status(200).send(data)
    } catch (err) {
      console.log(err)
      res.status(500).json({ statusCode: 500, message: err.response.data.detail, data: err.response.data })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
