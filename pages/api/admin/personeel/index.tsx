import { query } from "../../../../database/db";
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
        query:"SELECT COUNT(gebruikers.id) AS max FROM gebruikers WHERE rol_id > 1;",
        values: []
      })
      if(req.query.limit && req.query.offset){
        werknemer.werknemer =  await query({
          query:"SELECT g.plaats, r.id as rol_id, g.achternaam, g.wachtwoord,g.id, g.naam, g.postcode, g.gebruikersnaam, g.email, r.naam as rol, p.ziek FROM gebruikers g INNER JOIN rol r on g.rol_id = r.id LEFT JOIN personeel_info p on g.id = p.gebruiker_id WHERE rol_id > 1 LIMIT ? OFFSET ?",
          values: [req.query.limit, req.query.offset]
        })
      }else{
        werknemer.werknemer =  await query({
          query:"SELECT SELECT g.plaats, r.id as rol_id, g.achternaam, g.wachtwoord,g.id, g.naam, g.postcode, g.gebruikersnaam, g.email, r.naam as rol, p.ziek FROM gebruikers g INNER JOIN rol r on g.rol_id = r.id LEFT JOIN personeel_info p on g.id = p.gebruiker_id WHERE rol_id > 1",
          values: ""
        })
      }
        
        res.status(200).json(werknemer)
    }
    else if(req.method == "POST"){
      let {naam, achternaam, email, wachtwoord, gebruikersnaam, plaats, postcode, rol_id} = req.body.account
      wachtwoord = await bcrypt.hash(wachtwoord, saltRounds).then(function(hash) {
        return hash
     });
     console.log(req.body.account)
      const checkExist =  await query({
        query:"INSERT INTO `gebruikers`(`naam`, `achternaam`, `postcode`, `plaats`, `gebruikersnaam`, `wachtwoord`, `rol_id`, `email`, `aanmeld_datum`) VALUES (?,?,?,?,?,?,?,?,?)",
        values: [naam, achternaam, postcode, plaats, gebruikersnaam, wachtwoord, rol_id, email, new Date()]
      })
      res.status(200).json(checkExist)
    }
  
}


