import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from "@prisma/client";

const site = process.env.NEXTAUTH_URL;
const prisma = new PrismaClient();

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Email({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          }
        },
        from: process.env.EMAIL_FROM,
      }),
      // Providers.Auth0({
      //   clientId: process.env.AUTH0_CLIENT_ID,
      //   clientSecret: process.env.Auth0_CLIENT_SECRET,
      //   domain: process.env.AUTH0_DOMAIN
      // })
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),
    pages: {
      signIn: '/auth/sign-in',
    },
    callbacks: {
      /**
       * @param  {string} url      URL provided as callback URL by the client
       * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
       * @return {string}          URL the client will be redirect to
       */
      redirect: async (url, baseUrl) => {
        const locateUrl = url.includes('auth') ? baseUrl : url
        return url.startsWith(baseUrl)
          ? Promise.resolve(locateUrl)
          : Promise.resolve(baseUrl)
      }
    }
  });