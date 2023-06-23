import { query } from "../../../../database/db";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  
) {
    if(req.method == "GET"){
        const werknemmer =  await query({
            query:"SELECT * FROM ziek_meldingen WHERE gebruiker_id = ?",
            values: [req.query.id]
        })
        res.status(200).json(werknemmer)
    }
    else if(req.method == "POST"){
      const checkExist =  await query({
        query:"SELECT * FROM ziek_meldingen WHERE gebruiker_id = ? AND eind_date IS NULL",
        values: [req.body.id]
      })
      if(checkExist.length == 0){
        const werknemmer =  await query({
          query:"INSERT INTO `ziek_meldingen`(`start_date`,`gebruiker_id`) VALUES (?, ?)",
          values: [new Date(), req.body.id]
        })
        
        let werknemmers =  await query({
          query:"SELECT `id`, `ziek`, `gebruiker_id` FROM `personeel_info` WHERE `gebruiker_id` = ?",
          values: [req.body.id]
        })

        if(werknemmers.length == 0){
          await query({
            query:"INSERT INTO `personeel_info`(`ziek`, `gebruiker_id`) VALUES (?, ?)",
            values: [1, req.body.id]
          })
        }
        else{
          await query({
            query:"UPDATE `personeel_info` SET `ziek`= 1 WHERE gebruiker_id = ?",
            values: [req.body.id]
          })
        }
        
        await query({
          query:"UPDATE `rooster` SET `verwacht`= 0 WHERE gebruiker_id = ? AND begintijd >= ?",
          values: [req.body.id, new Date()]
        })
        res.status(200).json(werknemmer)
      }
      else{
        res.status(200).json("je bent al ziek gemeldt")
      }
    }
    else if(req.method == "PUT"){
      const checkExist =  await query({
        query:"UPDATE `ziek_meldingen` SET `eind_date`= ? WHERE gebruiker_id = ? AND eind_date IS NULL",
        values: [new Date(), req.body.id]
      })
      await query({
        query:"UPDATE `personeel_info` SET `ziek`= 0 WHERE gebruiker_id = ?",
        values: [req.body.id]
      })
      await query({
        query:"UPDATE `rooster` SET `verwacht`= 1 WHERE gebruiker_id = ?",
        values: [req.body.id]
      })
      res.status(200).json("je bent beter")
    }
  
}


