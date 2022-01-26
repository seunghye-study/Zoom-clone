#Noom

zoom clone using webRTC and Websockets

app.js : Frontend
server.js : Backend

{ payload: 'asdf' } // not a string, javascript object


adapter : 현재 우리는 서버의 메모리에서 어댑터 사용, 데이터베이스는 사용하지 않음
우리가 서버를 종료하고 재시작할때 모든 룸, 메세지, 소켓은 사라짐
즉, 서버를 재시작하면 모든게 초기화되고 다시시작됨
하지만 백엔드에 데이터베이스를 두고 초기화하지않았으면 함
모든클라이언트에 대해 서버는 connect를 열어둬야함
whale과 chrome을 동시에 연결했던 것 처럼
여러 클라이언트가 커넥트하면 한 서버가 많은 커넥션들을 메모리에 저장해야함
너무많아지면 서버가 2개, 3개로 늘수도있음

DB를 사용해 서버간 통신을 하게 해줌
규모가 커지면 모든 클라이언트가 동일한 서버에 연결하기는 힘들기 때문


map개념정리하기
