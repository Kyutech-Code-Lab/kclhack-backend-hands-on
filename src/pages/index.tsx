import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import PostFormSample from '@/components/PostFormSample'

export default function Home() {

  

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
          <PostFormSample />
        </div>
      </div>
    </>
  )
}
