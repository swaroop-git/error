// const expect = require("chai").expect;
const request = require("supertest");
// const prompt = require("prompt-sync")();
// const { helloWorld } = require("../testFunctions");
// const testFunctions = require("../testFunctions");

// helloWorld = testFunctions.helloWorld();
// var a = prompt("Enter number 1: ");
// var b = prompt("Enter number 2: ");
// multiply = testFunctions.multiply(Number(a),Number(b));
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.should();
chai.use(chaiHttp)
const server = require("../index");
var app = request.agent(server.app);
var userModel = require("../../Admin/models/admin");


describe("GET Request", function () {
    describe("Getting all the admin from the admins collection of the D&C Users Database.",function(){
    it("A successful get request should return status code equal to 200 and all users.", (done) => {
      chai.request(server.app).get("/a/admin").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return all admin.", (done) => {
            chai.request(server.app).get("/a/admin").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

 describe("POST Request.", function(){
    describe("Adding a user into the users collection of the DealsandCouponsUsers Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
             let res = await chai
         	.request(server.app)
         	.post('/a/admin').send({
                 name: "swaroop",
                 email_address: "swaroop@gmail.com",
                 phone: 1234,
                 password: "xyz@1234"
            })

     expect(res.status).to.equal(201);
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("swaroop");
     res.body.should.have.property('email_address').eq("swaroop@gmail.com");
     res.body.should.have.property('phone').eq(1234);
     res.body.should.have.property('password').eq("xyz@1234");
      });
      afterEach(async () => {
     	await userModel.deleteOne({name: "swaroop"})
 	    });
    });
});

 describe("PUT Request.", function(){
     describe("Updating a admin in the admins collection of the D&C Users Database.",function(){
         it("Successful updation should return status code equal to 200 and the updated admin.", async function(){
             const id = "60d2158323041a04c0936faf";
             let res = await chai
         	.request(server.app)
         	.put('/a/admin/' + id).send({
                 name: "talif",
                 phone: 54321
     })

     expect(res.status).to.equal(200);
     expect(res).to.be.an('object');
     res.body.should.be.a('object');
     res.body.should.have.property('_id');
     res.body.should.have.property('name').eq("talif");
     res.body.should.have.property('email_address').eq("swaroop@gmail.com");
     res.body.should.have.property('phone').eq(54321);
     res.body.should.have.property('password').eq("XYZ@1234");
      });
      it("If the id doesn't exists.", async function(){
         const id = "360";
         let res = await chai
         .request(server.app)
         .put('/a/admin/' + id).send({
             name: "talif",
             phone: 54321
 });

     expect(res.status).to.equal(404);
     expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a admin in the admins collection of the DealsandCouponsUsers Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60ced094b2384d2a9c6df1e1";
            let res = await chai
        	.request(server.app)
        	.delete('/a/admin/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/a/admin/' + id)

    //expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});