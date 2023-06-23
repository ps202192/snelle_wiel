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
      const checkExist =  await query({
        query:"SELECT * FROM `winkelwagen` WHERE 1",
        values: []
      })
      res.status(200).json(checkExist)
    }
    else if(req.method == "POST"){
        console.log(req.body)
      req.body.bestellingen.map(async (bestel) => {
        let { gebruiker_id, product_id, aantal, KUIN_id} = bestel
        let checkExist = []
        if(KUIN_id){
          checkExist = await query({
            query:"SELECT * FROM `bestellingen` WHERE `gebruiker_id` = ? AND `KUIN_id` = ?",
            values: [gebruiker_id, KUIN_id]
          })
        }
        else{
          checkExist = await query({
            query:"SELECT * FROM `bestellingen` WHERE `gebruiker_id` = ? AND `product_id` = ?",
            values: [gebruiker_id, product_id]
          })
        }
        
          if(checkExist.length > 0){
            console.log(checkExist)
            checkExist =  await query({
              query:"UPDATE `bestellingen` SET `aantal`= ?,`bestel_datum`= ? WHERE id = ?",
              values: [aantal + checkExist[0].aantal, new Date(), checkExist[0].id]
            })
          }
          else{
            if(KUIN_id){
              checkExist =  await query({
                query:"INSERT INTO `bestellingen`(`gebruiker_id`, `KUIN_id`, `aantal`, `bestel_datum`, status_id) VALUES (?,?,?,?,?)",
                values: [gebruiker_id, KUIN_id, aantal, new Date(), 1]
              })
            }
            else{
              checkExist =  await query({
                query:"INSERT INTO `bestellingen`(`gebruiker_id`, `product_id`, `aantal`, `bestel_datum`, status_id) VALUES (?,?,?,?,?)",
                values: [gebruiker_id, product_id, aantal, new Date(), 1]
              })
            }
            
          }
      });
      let verwijderWinkelwagen =  await query({
        query:"DELETE FROM `winkelwagen` WHERE `gebruiker_id` = ?",
        values: [req.body.bestellingen[0].gebruiker_id]
      })
      
      res.status(200).json(true)
    }
  
}


