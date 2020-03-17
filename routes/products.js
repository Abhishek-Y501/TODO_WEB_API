const express = require('express');
const productCtrl = require('../controllers/products');
const { body } = require('express-validator');

const routes = express.Router();

/**
 * @swagger
 * definitions:
 *   product:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       price:
 *         type: integer
 *       imageUrl:
 *         type: string
 */


//GET PRODUCTS
/**
* @swagger
* api/getProducts:
*   get:
*     tags:
*       - Products
*     name: Get All Products
*     summary:  Get All Products
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Products Retrived successfully
*/
routes.get('/getProducts', productCtrl.getProducts);


/**
* @swagger
* /addProduct:
*   post:
*     tags:
*       - Products
*     name: AddProduct
*     summary: Add a new product
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
*             price:
*               type: number
*         required:
*           - name
*           - price
*     responses:
*       200:
*         description: Product Added successfully
*/
routes.post('/addProduct',
    [
        body('name').isString().trim().withMessage('Name must be String type'),
        body('price').isNumeric(),
    ],
    productCtrl.addProduct);



/**
* @swagger
* /getProductById/{id}:
*   get:
*     tags:
*       - Products
*     name: Get a single Product
*     summary:  Get a single Product
*     consumes:
*       - application/json
*     parameters:
 *       - name: id
 *         description: Product's id
 *         in: path
 *         required: true
 *         type: integer
*     responses:
*       200:
*         description: Product Get successfully
*/
routes.get('/getProductById/:id', productCtrl.getProductById);



/**
* @swagger
* /updateProduct:
*   post:
*     tags:
*       - Products
*     name: Update a product
*     summary: Update a product
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             id:
*               type: number
*             name:
*               type: string
*             price:
*               type: number
*         required:
*           - name
*           - price
*     responses:
*       200:
*         description: Product Updated successfully
*/
routes.post('/updateProduct', productCtrl.updateProduct);

/**
* @swagger
* /deleteProduct/{id}:
*   get:
*     tags:
*       - Products
*     name: Delete a Product
*     summary:  Delete a Product
*     consumes:
*       - application/json
*     parameters:
 *       - name: id
 *         description: Product's id
 *         in: path
 *         required: true
 *         type: integer
*     responses:
*       200:
*         description: Product Get successfully
*/
routes.get('/deleteProduct/:id', productCtrl.deleteProduct);

module.exports = routes;