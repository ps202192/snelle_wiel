import { query } from "../../../../database/db";
import type { NextApiRequest, NextApiResponse } from 'next'

const saltRounds = 10;

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  
) {
    if(req.method == "GET"){
        const gebruikers =  await query({
            query:"SELECT b.`id`, b.`aantal`, p.naam, p.prijs, p.kleur, p.foto, p.aantal, b.aantal as voorraad, s.naam as `status` FROM `bestellingen` as b INNER JOIN producten p ON b.product_id = p.id INNER JOIN `status` s ON b.status_id = s.id WHERE gebruiker_id = ?;",
            values: [req.query.id]
        })
        res.status(200).json(gebruikers)
    }
    else if(req.method == "DELETE"){
        const checkExist =  await query({
          query:"DELETE FROM `winkelwagen` WHERE id = ?",
          values: [req.query.id]
        })
        res.status(200).json("je bent beter")
      }
      else if(req.method == "PUT"){
        let {email, wachtwoord, plaats, postcode, id} = req.body.account
        const checkExist =  await query({
          query:"UPDATE `gebruikers` SET `postcode`=?,`plaats`=?,`wachtwoord`=?,`email`=? WHERE id = ?",
          values: [ postcode, plaats, wachtwoord, email, id]
        })
        res.status(200).json("je bent beter")
    }
}


