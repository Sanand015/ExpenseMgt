const app=require('./index')
const request = require("supertest");
const {newUser,cred,existedUser,trans,blank,falsecred,userId}=require("./mockData")




describe("test cases for expense mgt app",()=>{
    it("test case to create the user", async () => {
        const updateUser = await request(app).put("/create-user").send(newUser);
        expect(updateUser.status).toBe(201);
      });

      it("test case to check the existed user", async () => {
        const updateUser = await request(app).put("/create-user").send(existedUser);
        expect(updateUser.status).toBe(403);
      });

      it("test case testing valid token", async () => {
        const auth = await request(app).post('/add-expense').send(userId);
        expect(auth.status).toBe(403);  
      });

      it("test case testing false token", async () => {
        const auth = await request(app).post('/add-expense').send(blank);
        expect(auth.status).toBe(403);
      });

      it("test case for authenticating a user", async () => {
        const auth = await request(app).post('/login').send(cred);
        expect(auth.status).toBe(200);
      });


      it("test case for non existed  user", async () => {
        const auth = await request(app).post('/login').send(falsecred);
        expect(auth.status).toBe(401);
      });


      it("test case for insertion trans", async () => {
        const auth = await request(app).post('/add-trans').send(trans);
        expect(auth.status).toBe(500);
      });

      it("test case to get the net amount", async () => {
        const updateUser = await request(app).get("/get-amount").send(userId);
        expect(updateUser.status).toBe(500);
      });


      
})