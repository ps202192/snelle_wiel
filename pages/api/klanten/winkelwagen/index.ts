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
      let { gebruiker_id, product_id, KUIN_id, aantal} = req.body.winkelwagen
      let checkExist = []
      console.log("1")
      if(KUIN_id){
        checkExist =  await query({
          query:"SELECT * FROM `winkelwagen` WHERE `gebruiker_id` = ? AND`KUIN_id` = ?",
          values: [gebruiker_id, KUIN_id]
        })
      }
      else{
        checkExist =  await query({
          query:"SELECT * FROM `winkelwagen` WHERE `gebruiker_id` = ? AND `product_id` = ?",
          values: [gebruiker_id, product_id]
        })
      }
      
      if(checkExist.length > 0){
        
        checkExist =  await query({
          query:"UPDATE `winkelwagen` SET `aantal`= ?,`opgeslagen_op`= ? WHERE id = ?",
          values: [aantal + checkExist[0].aantal, new Date(), checkExist[0].id]
        })
      }
      else{
        if(KUIN_id){
          KUIN_id = KUIN_id.replace('k', '')
          console.log(KUIN_id)
          checkExist =  await query({
            query:"INSERT INTO `winkelwagen`(`gebruiker_id`, `KUIN_id`, `aantal`, `opgeslagen_op`) VALUES (?,?,?,?)",
            values: [gebruiker_id, KUIN_id, aantal, new Date()]
          })
          
        }
        else{
          checkExist =  await query({
            query:"INSERT INTO `winkelwagen`(`gebruiker_id`, `product_id`, `aantal`, `opgeslagen_op`) VALUES (?,?,?,?)",
            values: [gebruiker_id, product_id, aantal, new Date()]
          })
        }
        
      }
      
      res.status(200).json(checkExist)
    }
  
}


