import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // switch文でメソッド(リクエストのタイプ)別に場合分けを行う
  switch (req.method) {

    // 投稿作成用API
    case 'POST':
      // リクエストの中のcontentを取得
      const newContent = await req.body.content
      // contentが存在しない場合，BadRequestを返す
      if (newContent == null) {
        res.status(400).end()
        break
      }
      // contentが空文字列の場合，BadRequestを返す
      if (newContent === '') {
        res.status(400).end()
        break
      }
      // データベースに新しい投稿を作成
      try {
        const newPost = await prisma.posts.create({
          data: {
            content: newContent,
          }
        })
        // 作成に成功した場合，作成した投稿を返す
        res.status(200).json(newPost)
        break
      } catch {
        // データベースの接続エラーなどで作成できなかった場合，InternalServerErrorを返す
        res.status(500).end()
        break
      }

    // 投稿取得用API
    case 'GET':
      // リクエストの中のidを取得
      const id = req.query.id
      // idが指定されているか否かで場合分けを行う
      if (id != null) {
        // idが指定されている場合，そのidの投稿をデータベースから取得
        try {
          const post = await prisma.posts.findUnique({
            where: {
              id: Number(id)
            }
          })
          // そのidの投稿が存在しない場合，NotFoundを返す
          if (post == null) {
            res.status(404).end()
            break
          }
          // 取得に成功した場合，取得した投稿を返す
          res.status(200).json(post)
          break
        } catch {
          // データベースの接続エラーなどで取得できなかった場合，InternalServerErrorを返す
          res.status(500).end()
          break
        }
      } else {
        // idが指定されていない場合，全ての投稿をデータベースから取得
        try {
          const posts = await prisma.posts.findMany({
            orderBy: {
              id: 'desc', // idの降順で取得
            }
          })
          // 取得に成功した場合，取得した投稿を返す
          res.status(200).json(posts)
          break
        } catch {
          // データベースの接続エラーなどで取得できなかった場合，InternalServerErrorを返す
          res.status(500).end()
          break
        }
      }
    
    // 投稿編集用API
    case 'PUT':
      // リクエストの中のidとcontentを取得
      const updateId = req.body.id
      const updateContent = req.body.content
      // idまたはcontentが存在しない場合，BadRequestを返す
      if (updateId == null || updateContent == null) {
        res.status(400).end()
        break
      }
      // contentが空文字列の場合，BadRequestを返す
      if (updateContent === '') {
        res.status(400).end()
        break
      }
      // データベース内の投稿データを更新
      try {
        const updatedPost = await prisma.posts.update({
          where: {
            id: Number(updateId)
          },
          data: {
            content: updateContent
          }
        })
        // 更新に成功した場合，更新後の投稿を返す
        res.status(200).json(updatedPost)
        break
      } catch {
        // データベースの接続エラーなどで更新できなかった場合，InternalServerErrorを返す
        res.status(500).end()
        break
      }
    
    // 投稿削除用API
    case 'DELETE':
      // リクエストの中のidを取得
      const deleteId = req.query.id
      // idが存在しない場合，BadRequestを返す
      if (deleteId == null) {
        res.status(400).end()
        break
      }
      // データベース内の投稿データを削除
      try {
        const deletedPost = await prisma.posts.delete({
          where: {
            id: Number(deleteId)
          }
        })
        // そのidの投稿が存在しない場合，NotFoundを返す
        if (deletedPost == null) {
          res.status(404).end()
          break
        }        
        // 削除に成功した場合，削除した投稿を返す
        res.status(200).json(deletedPost)
        break
      } catch {
        // データベースの接続エラーなどで削除できなかった場合，InternalServerErrorを返す
        res.status(500).end()
        break
      }

    // 意図しないメソッドの場合，MethodNotAllowedを返す
    default:
      res.status(405).end()
      break
  
  }
}