import { useState } from "react";
import styles from '@/styles/Home.module.css'

type PostItemProps = {
  post: {
    id: number;
    content: string;
    created_at: Date;
  };
};

export default function PostItemSample({ post }: PostItemProps) {

  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(post.content);

  const updatePost = async () => {
    // 入力が空の場合は知らせる
    if (editedContent === '') {
      alert('テキストが空です')
      return
    }
    try {
      // PUTリクエストを送信
      const response = await fetch('/api/sample/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: post.id,
          content: editedContent,
        }),
      });
      if (response.ok) {
        // POSTが成功した場合の処理
        setIsEditting(false);
        console.log('更新に成功しました！')
      } else {
        // POSTが失敗した場合の処理
        console.error(response.statusText)
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  }

  const deletePost = async () => {
    try {
      // DELETEリクエストを送信
      const response = await fetch(`/api/sample/posts?id=${post.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // 削除が成功した場合の処理
        console.log('削除に成功しました！');
      } else {
        // 削除が失敗した場合の処理
        console.error(response.statusText);
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  }

  if (!isEditting) {
    return (
      <div className={styles.postitem}>
        <p>id: {post.id}, content: {post.content}</p>
        <button onClick={() => {setIsEditting(true)}}>編集</button>
        <button onClick={deletePost}>削除</button>
      </div>
    )
  }

  return (
    <div className={styles.postitem}>
      <p>id: {post.id}, content: </p>
      <input
        type="text"
        placeholder="テキストを入力"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={updatePost}>更新</button>
      <button onClick={deletePost}>削除</button>
    </div>
  )

};
