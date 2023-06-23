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
      console.log(req.query.id)
        let info
        info =  await query({
          query:"SELECT * FROM `rol` WHERE 1",
          values: []
        })
        res.status(200).json(info)
    }
}


