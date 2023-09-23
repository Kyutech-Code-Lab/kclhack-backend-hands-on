import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // switch文でメソッド(リクエストのタイプ)別に場合分けを行う
  switch (req.method) {

    // 投稿作成用API
    case 'POST':
      // まだ実装されておらず，NotImplementedを返している
      res.status(501).end()
      break

    // 投稿取得用API
    case 'GET':
      // まだ実装されておらず，NotImplementedを返している
      res.status(501).end()
      break
    
    // 投稿編集用API
    case 'PUT':
      // まだ実装されておらず，NotImplementedを返している
      res.status(501).end()
      break
    
    // 投稿削除用API
    case 'DELETE':
      // まだ実装されておらず，NotImplementedを返している
      res.status(501).end()
      break

    // 意図しないメソッドの場合，MethodNotAllowedを返す
    default:
      res.status(405).end()
      break
  
  }
}