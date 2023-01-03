// ** Create Read **/

import * as express from "express";
import { Cat, CatType } from "./app.model"; // 상대 경로로 설정!

const app: express.Express = express();

// 프론트에서 요청이 오면 여기(미들웨어)를 한 번 거치고
// next()함수로 라우터를 찾는 것

// * logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

// * JSON middleware (express에서 제공하는 미들웨어)
app.use(express.json());

// * READ - 고양이 전체 데이터 모두 조회(고양이 데이터 다 가져오는 것)
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    //throw new Error("DB connect error");
    res.status(200).send({
      success: true,
      data: { cats },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// * READ - 특정 고양이 데이터 조회 - ID로 조회
// : 을 붙이면 그 자체는 파라미터가 됨 -> 동적으로 코드 작성 가능
app.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      // 리스트 형태라 find 메소드 사용 가능
      return cat.id == params.id;
    });
    //throw new Error("DB connect error");
    res.status(200).send({
      success: true,
      data: { cat },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// * CREATE 새로운 고양이 추가 API (유저 회원가입, 블로그 포스팅 예)
// Client에서 Server로 데이터가 넘어온다
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data); // CREATE
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// * 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on...");
});
