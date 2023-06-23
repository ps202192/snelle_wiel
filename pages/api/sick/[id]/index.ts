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
      console.log(req.query.id)
        const werknemmer =  await query({
            query:"SELECT * FROM sick WHERE id = ?",
            values: [req.query.id]
        })
        res.status(200).json(werknemmer)
    }
  
}


