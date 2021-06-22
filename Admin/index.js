const express = require('express');
const app = express();
const adminsRightsRouter = require('./routes/a');
// var adminController = require('../controllers/insert-admin-controller');
// var userController = require('../../users/controllers/insert-user-controller');
// // var router = express.Router();
// var userModel = require('../../users/models/user-models');
var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Deals and Coupons Finder App -- Admins Microservice.",
        description: "This application is built using Node.js.",
        contact: {
          name: "Amazing Web Developer"
        }
    },
        servers: [
            {
                url: "http://localhost:3000"
            }
            ]
    },

    // ['.routes/*.js']
    apis: ["./routes/*.js"]
  };
  
  
  


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
const PORT = 3000;

app.use('/a',adminsRightsRouter);

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


module.exports = {
  app: app,
  adminsRightsRouter: adminsRightsRouter
}



