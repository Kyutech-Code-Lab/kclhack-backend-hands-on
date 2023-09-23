import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import PostForm from '@/components/PostForm';
import PostItem from '@/components/PostItem';

type Post = {
  id: number,
  content: string,
  created_at: Date,
}

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>KCLHack Hands-On</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1>KCLHack Hands-On</h1>
          <a href='/sample'>サンプルページへ移動</a>
          <PostForm />
          <div>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
