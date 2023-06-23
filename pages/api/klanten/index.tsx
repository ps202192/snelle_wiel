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
      let werknemer = {}
      console.log(req.query.offset)
      werknemer.max = await query({
        query:"SELECT COUNT(medewerkers.id) AS max FROM medewerkers;",
        values: []
      })
      if(req.query.limit && req.query.offset){
        werknemer.werknemer =  await query({
          query:"SELECT * FROM medewerkers LIMIT ? OFFSET ?",
          values: [req.query.limit, req.query.offset]
        })
      }else{
        werknemer.werknemer =  await query({
          query:"SELECT * FROM medewerkers",
          values: ""
        })
      }
        
        res.status(200).json(werknemer)
    }
    else if(req.method == "POST"){
      let {naam, achternaam, email, wachtwoord, gebruikersnaam, plaats, postcode} = req.body.account
      wachtwoord = await bcrypt.hash(wachtwoord, saltRounds).then(function(hash) {
        return hash
     });
      const checkExist =  await query({
        query:"INSERT INTO `gebruikers`(`naam`, `achternaam`, `postcode`, `plaats`, `gebruikersnaam`, `wachtwoord`, `rol_id`, `email`, `aanmeld_datum`) VALUES (?,?,?,?,?,?,?,?,?)",
        values: [naam, achternaam, postcode, plaats, gebruikersnaam, wachtwoord, 1, email, new Date()]
      })
      res.status(200).json(checkExist)
    }
  
}


