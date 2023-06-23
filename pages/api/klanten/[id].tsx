import { query } from "../../../database/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"

const saltRounds = 10;

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  
) {
    if(req.method == "GET"){
      console.log(req.query.id)
        const gebruikers =  await query({
            query:"SELECT * FROM `gebruikers` WHERE id = ?",
            values: [req.query.id]
        })
        res.status(200).json(gebruikers)
    }
    else if(req.method == "DELETE"){
        const checkExist =  await query({
          query:"DELETE FROM `medewerkers` WHERE id = ?",
          values: [req.query.id]
        })
        res.status(200).json("je bent beter")
      }
      else if(req.method == "PUT"){
        let {email, wachtwoord, plaats, postcode, id} = req.body.account
        
        
        if(wachtwoord == ""){
          
          const checkExist =  await query({
            query:"UPDATE `gebruikers` SET `postcode`=?,`plaats`=?,`email`=? WHERE id = ?",
            values: [ postcode, plaats, email, id]
          })
        }else{
          console.log(wachtwoord + " Pass")
          wachtwoord = await bcrypt.hash(wachtwoord, saltRounds).then(function(hash) {
            return hash
        });
          const checkExist =  await query({
            query:"UPDATE `gebruikers` SET `postcode`=?,`plaats`=?,`wachtwoord`=?,`email`=? WHERE id = ?",
            values: [ postcode, plaats, wachtwoord, email, id]
          })
        }
        
        res.status(200).json("je bent beter")
    }
}


