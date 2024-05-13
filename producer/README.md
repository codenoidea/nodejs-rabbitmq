docker 빌드

- docker build -t producer:latest .

docker 실행

- docker run -it -p 3003:3003 producer:latest

로컬경로

- localhost:3001

메세지 확인

- localhost:3001/send?queue=diablo4&text=season4
