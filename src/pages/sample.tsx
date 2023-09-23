import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import PostFormSample from '@/components/PostFormSample'
import PostItemSample from '@/components/PostItemSample';

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
        const response = await fetch('/api/sample/posts');
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
          <h1>KCLHack Hands-On (Sample)</h1>
          <a href='/'>戻る</a>
          <PostFormSample />
          <div>
            {posts.map((post) => (
              <PostItemSample key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
