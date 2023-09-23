import { useState } from 'react'
import styles from '@/styles/Home.module.css'

export default function PostForm() {

  const [content, setContent] = useState<string>('')

  const submitPost = async () => {
    // 入力が空の場合は知らせる
    if (content === '') {
      alert('テキストが空です')
      return
    }
    try {
      // POSTリクエストを送信
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (response.ok) {
        // POSTが成功した場合の処理
        setContent('')
        console.log('投稿に成功しました！')
      } else {
        // POSTが失敗した場合の処理
        console.error(response.statusText, data.message);
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