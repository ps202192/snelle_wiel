import { query } from "../../../../../database/db";
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
        let info = {}
        info.gebruikers =  await query({
            query:"SELECT g.plaats, r.id as rol_id, g.achternaam, g.wachtwoord,g.id, g.naam, g.postcode, g.gebruikersnaam, g.email, r.naam as rol FROM gebruikers g INNER JOIN rol r on g.rol_id = r.id WHERE g.id = ?",
            values: [req.query.id]
        })
        info.rollen =  await query({
          query:"SELECT * FROM `rol` WHERE 1",
          values: [req.query.id]
        })
        res.status(200).json(info)
    }
    else if(req.method == "DELETE"){
        const checkExist =  await query({
          query:"DELETE FROM `gebruikers` WHERE id = ?",
          values: [req.query.id]
        })
        res.status(200).json("je bent beter")
      }
      else if(req.method == "PUT"){
        let {naam, achternaam, postcode, plaats, gebruikersnaam,rol_id, wachtwoord, email, id} = req.body.account
        
       console.log(req.body.account)
       if(wachtwoord == ""){
        const checkExist =  await query({
          query:"UPDATE `gebruikers` SET `naam`=?,`achternaam`=?,`postcode`=?,`plaats`=?,`gebruikersnaam`=?,`rol_id`=?,`email`=? WHERE id = ?",
          values: [naam, achternaam, postcode, plaats, gebruikersnaam,rol_id, email, id]
        })
       }else{
        wachtwoord = await bcrypt.hash(wachtwoord, saltRounds).then(function(hash) {
          return hash
        });
        const checkExist =  await query({
          query:"UPDATE `gebruikers` SET `naam`=?,`achternaam`=?,`postcode`=?,`plaats`=?,`gebruikersnaam`=?,`wachtwoord`=?,`rol_id`=?,`email`=? WHERE id = ?",
          values: [naam, achternaam, postcode, plaats, gebruikersnaam, wachtwoord,rol_id, email, id]
        })
       }
        
      //   console.log(checkExist)
        res.status(200).json("je bent beter")
    }
}


