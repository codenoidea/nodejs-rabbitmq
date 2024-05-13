docker 빌드

- docker build -t consumer:latest .

docker 실행

- docker run -it -p 3003:3003 consumer:latest

로컬경로

- localhost:3003

메세지 확인

- localhost:3003/receive?queue=diablo4
