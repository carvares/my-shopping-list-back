import app from "../src/app";
import connection from "../src/database";
import supertest from "supertest";

describe("POST /list", ()=>{
    it("returns 201 for valid params",async()=>{
        const result = await supertest(app)
        .post("/list")
        .send({text: "batata"});
        expect(result.status).toEqual(201);
    })
    it("returns 401 for invalid params",async()=>{
        const result = await supertest(app)
        .post("/list")
        .send({text: ""});
        expect(result.status).toEqual(401);
    })
})
describe("GET /list",()=>{
    it("returns 200 for valid params",async()=>{
        const result = await supertest(app)
        .get("/list")
        expect(result.status).toEqual(200);
    })
})

afterAll(async ()=>{
    await connection.query(
      `TRUNCATE list 
     RESTART IDENTITY`);
     connection.end();
   
   })