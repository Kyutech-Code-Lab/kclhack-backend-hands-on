# KCLHack バックエンド ハンズオン教材

## 資料

https://zenn.dev/claustra01/articles/8f271d0f1ad676

## 事前準備

Docker Desktopをインストール
- Windowsの場合 https://docs.docker.jp/docker-for-windows/install.html#install-docker-desktop-on-windows
- Macの場合 https://docs.docker.jp/docker-for-mac/install.html#install-and-run-docker-desktop-on-mac

## セットアップ

1. `git clone git@github.com:Kyutech-Code-Lab/kclhack-backend-hands-on.git`を実行し，レポジトリをクローン

2. `cd kclhack-backend-hands-on`を実行し，クローンしてきたディレクトリに移動

3. Docker Desktopアプリを起動
- 環境によってはアカウント作成・ログインが必要

4. `.env.sample`という名前のファイルをコピーし，`.env`という名前に変更

5. `docker compose up -d`を実行し，データベースを起動
- `Container kclhack-backend-hands-on-db  Started`のようなログが出ればOK
- `compose.yml`という名前のファイルの中でデータベースを定義している（これをコピペすれば他の環境でもDockerでデータベースを起動することができる）

6. `npm install`で必要なライブラリを導入
- 今回はデータベースを扱うためPrismaというパッケージを導入している．他の環境でPrismaを使うには`npm install prisma`を実行する必要がある．

7. `npx prisma migrate dev`で`prisma/schema.prisma`の内容をデータベースに反映
- `? Enter a name for the new migration: ›`と聞かれるが，何も入力せずにEnterキーを押してOK．
- `prisma/schema.prisma`の内容を書き換えた後もう一度実行すると，その変更がデータベースに反映される．

8. `npm run dev`を実行し，アプリケーションを起動

9. `http://localhost:3000/`にアクセスし，起動できることを確認

10. `http://localhost:3000/sample`にサンプルがあるので，自由に触ってみる（何か操作した後は**ページの再読み込みが必要**）

## Prisma Studioについて
- `npx prisma studio`を実行し`http://localhost:5555/`にアクセスすると，Prisma Studioというツールが使用できる．
- このツールは接続しているデータベースの中身の確認や編集ができる．かなり直感的に使えると思うのでAPIが実装できているかの確認に使用すると良い．

## Postmanについて
- Postmanというツールを使うと，バックエンドへのリクエストを簡単に送信することができる．デバッグに用いると便利．
- ダウンロード: https://www.postman.com/downloads/
- 使い方: https://zenn.dev/nameless_sn/articles/postman_tutorial