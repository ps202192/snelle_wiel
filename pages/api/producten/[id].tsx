import { query } from "../../../database/db";
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
      console.log(req.query.id)
        const gebruikers =  await query({
            query:"SELECT * FROM `producten` WHERE id = ?",
            values: [req.query.id]
        })
        res.status(200).json(gebruikers)
    }
}


