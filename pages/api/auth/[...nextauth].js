import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios';

const getToken = async ({email, password}) => {
  const body = {email: email, password: password}
  try {
    const {data} = await axios.post('https://dac-datahub-staging.herokuapp.com/account/api/token/', body)
    return data
  } catch (err) {
    console.log(err.response)
    if (err.response.status === 401) {
      res.status(401).json({ statusCode: 401, message: err.response.data.detail })
    } else {
      res.status(500).json({ statusCode: 500, message: err.response.data.detail })
    }
  }
}

const site = process.env.NEXTAUTH_URL
const providers = [
  Providers.Credentials({
    name: 'credentials',
    credentials: {
      email: { label: "Email", type: "text", placeholder: "" },
      password: {  label: "Password", type: "password" }
    },
    authorize: async (credentials) => {
      const user = {}
      const res = await getToken({email:credentials.email, password:credentials.password})

      if (res.access) {
        user.access=res.access
        user.refresh=res.refresh
        user.email=credentials.email.toLowerCase()
      }

      if (user.access) {
        return Promise.resolve(user)
      } else {
        return Promise.resolve(null)
      }
    }
  })
]

const pages = {
  signIn: '/auth/sign-in',
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: null // If set, new users will be directed here on first sign in
}

const options = {
  site: site,
  providers: providers,
  pages: pages
}

export default (req, res) => (
  NextAuth(req, res, options)
)