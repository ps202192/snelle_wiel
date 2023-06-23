import axios from "axios"
import { Session } from "inspector"
import NextAuth , {NextAuthOptions} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { query } from "../../../database/db";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const {username,password}=credentials as any;
          const gebruiker =  await query({
            query:"SELECT * FROM gebruikers WHERE gebruikersnaam = ?",
            values: [username]
          })
          let passCheck = false
          console.log(gebruiker)
          if(gebruiker.length > 0){
            passCheck = await bcrypt.compare(password, gebruiker[0].wachtwoord).then(function(result) {
              return result
              console.log(result)
            })
          }
          if(passCheck){
            const getUser = gebruiker[0]
            return getUser
             
          }
          else{
            return null
          }

          
        }
      })
  ],
  Session:{
    strategy:"jwt",
  },
  pages:{
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token}) {
      const gebruiker =  await query({
        query:"SELECT g.plaats, r.id as rol_id, g.achternaam, g.wachtwoord,g.id, g.naam, g.postcode, g.gebruikersnaam, g.email, r.naam as rol, p.ziek FROM gebruikers g INNER JOIN rol r on g.rol_id = r.id LEFT JOIN personeel_info p on g.id = p.gebruiker_id WHERE g.id = ?",
        values: [token.sub]
      })
      session.gebruiker = gebruiker[0]
      token.rol = gebruiker[0].rol_id
      return session
    }
  }
}

export default NextAuth(authOptions)