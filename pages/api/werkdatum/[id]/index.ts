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
            query:"SELECT * FROM rooster WHERE id = ?",
            values: [req.query.id]
        })
        res.status(200).json(werknemmer)
    }
    else if(req.method == "POST"){
        const werknemmer =  await query({
            query:"SELECT * FROM rooster WHERE id = ?",
            values: [req.query.id]
        })
        res.status(200).json(werknemmer)
    }
}


