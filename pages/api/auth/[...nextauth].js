import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  // Configure one or more authentication providers
  providers: [
    {
      id: 'backend',
      name: 'Backend',
      type: 'oauth',
      version: '2.0',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
      requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code',
      profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      },
      clientId: '',
      clientSecret: ''
    }
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)