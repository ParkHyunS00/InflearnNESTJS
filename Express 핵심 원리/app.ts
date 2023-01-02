import * as express from "express";

// app은 Express의 인스턴스, 서버역할
const app: express.Express = express();
const port: number = 8000;

// /로 요청을 했을 때 어떻게 응답을 해줄 것인지
app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req); // req엔 요청 정보가 담겨있다
  res.send({ name: "Park", age: 99, friends: ["ss", "tt", "qq"] }); // send로 요청에 대한 응답을 보냄 -> 프론트엔드한테 보냄
  // 프론트가 이 데이터를 받아서 가공 후 페이지에 띄워주는 것
});
// app.get() 이 부분은 라우터

// listen - 서버를 연다(기동시킨다)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
