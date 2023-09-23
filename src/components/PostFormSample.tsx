import { useState } from 'react'
import styles from '@/styles/Home.module.css'

export default function PostFormSample() {

  const [content, setContent] = useState<string>('')

  const submitPost = async () => {
    try {
      // POSTリクエストを送信
      const response = await fetch('/api/sample/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        // POSTが成功した場合の処理
        setContent('')
        console.log('投稿に成功しました！')
      } else {
        // POSTが失敗した場合の処理
        console.error(response.statusText)
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  }

  return (
    <div className={styles.postform}>
      <input
        type="text"
        placeholder="テキストを入力"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={submitPost}>投稿</button>
    </div>
  )
}