const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');


/**
 * @openapi
 * components:
 *      schemas:
 *          Admin:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto_generated id of the user.
 *                  name:
 *                      type: string
 *                      description: Name of the user.
 *                  password:
 *                      type: string
 *                      description: email_address of the respective user.
 *                  phone:
 *                      type: string
 *                      description: shows the users phone no..
 *              example:
 *                  id: d5fE_asz
 *                  name: swaroop
 *                  password: xy#@**
 *                  phone: 12345
 */





/**
 * @openapi
 * /a/admin:
 *      get:
 *          summary: Returns list of users
 *          tags: [Admin]
 *          responses:
 *              200:
 *                  description: The list of the users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              items:
 *                                  $ref: '#/components/schemas/Admin'             
 */              



router.get('/admin', function(req,res){
    Admin.find().then((admin) =>{
        res.json(admin)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
});



/**
 * @openapi
 * /a/admin:
 *      post:
 *          summary: Create a new users in the users collections of the D&C Users Database.
 *          tags: [Admin] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Admin'
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              type: string
 *                              example: Admin Data inserted successfully.
 */




 //add a new Admin to db
router.post('/admin', function(req,res,next){
    console.log(req.body);
    Admin.create(req.body).then(function(admin){
      res.status(201).json(admin);
    }).catch();
    
   /* 
    res.send({
        type:'POST'
  
    });
    */
    
});


/**
 * @openapi
 * /a/admin/{id}:
 *      put:
 *          summary: Update a Admin by its id in the user collections of the D&C Users Database.
 *          tags: [Admin] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  name: raju-dudhwala
 *                                  password: *****
 *                                  phone: 12435
 *                                  
 *              '404':
 *                  description: The user was not found.
 *              '500':
 *                  description: There was some server error.
 */



 //update a admin in db
router.put('/admin/:id', function(req,res){
    //res.send("admin updated");
    Admin.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

        if(err){
            res.status(404).json(err);
        }
        else{
            res.status(200).json(result);
        }

    })
});


/**
 * @openapi
 * /a/admin/{id}:
 *      delete:
 *          summary: delete the admin from a list
 *          tags: [Admin]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              200:
 *                  description: The list of the user 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Admin'
 */


 //delete a admin from db
router.delete('/admin/:id', function(req,res){
    Admin.findByIdAndRemove({_id:req.params.id}).then(function(user){
        res.status(200).send("admin is been deleted");
    });
    //res.send("admin deleted");
});

module.exports = router;

