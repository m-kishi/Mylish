# Mylish
The Personal English Learning Apps

## Project setup
- イメージを作成
```
docker build -t mylish:latest .
```

- コンテナを起動
```
docker run -it -d -p 8080:8080 -p 3000:3000 -v [Mylishのフォルダパス]:/mylish -e VUE_APP_BASE_RUL=http://localhost:3000 -e CHOKIDAR_USEPOLLING=1 -e TZ=Asia/Tokyo --name mylish mylish:latest
```

- コンテナへCLIでアクセス
```
docker exec [コンテナID] -it /bin/sh
```

- client、server それぞれで package をインストール
```
npm install
```

- client を起動
```
npm run serve
```

- server を起動
```
npm run start-watch
```
