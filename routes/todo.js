const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();

const todoCtrl = require('../controllers/todo')

//Add Todo POST API
/**
* @swagger
* /Todo_Add:
*   post:
*     tags:
*       - TODOs
*     name: Todo_Add
*     summary: Add a new todo
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             description:
*               type: string
*             status:
*               type: string
*         required:
*           - name
*           - price
*           - status
*     responses:
*       200:
*         description: Todo Added successfully
*/
routes.post('/Todo_Add',
    [
        body('name').isString().trim().withMessage('Name must be String type'),
        body('description').isString().trim().withMessage('Description must be String type'),
        body('status').isString().withMessage('Status should be String type')
    ],
    todoCtrl.todoAddController);



//Get Todos GET API
/**
* @swagger
* /Todo_Get:
*   get:
*     tags:
*       - TODOs
*     name: Get All TODOs
*     summary:  Get All TODOs
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: TODOs Retrived successfully
*/
routes.get('/Todo_Get', todoCtrl.todoGetController)



//Update Todo Post API
/**
* @swagger
* /Todo_Update:
*   post:
*     tags:
*       - TODOs
*     name: Update a todo
*     summary: Update a todo
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             description:
*               type: string
*             status:
*               type: string
*         required:
*           - name
*           - price
*     responses:
*       200:
*         description: Product Updated successfully
*/
routes.post('/Todo_Update', [
    body('Id').isString().withMessage('Status should be String type'),
    body('status').isString().withMessage('Status should be String type')
], todoCtrl.todoUpdateController);


//Delete Todo Post API
/**
* @swagger
* /Todo_Delete/{id}:
*   get:
*     tags:
*       - TODOs
*     name: Delete a todo
*     summary:  Delete a todo
*     consumes:
*       - application/json
*     parameters:
 *       - name: id
 *         description: Todo's id
 *         in: path
 *         required: true
 *         type: integer
*     responses:
*       200:
*         description: Todo Get successfully
*/
routes.get('/Todo_Delete/:id', todoCtrl.todoDeleteController);

module.exports = routes;
