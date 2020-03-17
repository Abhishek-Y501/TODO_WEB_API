const express = require('express');
const fileCtrl = require('../controllers/file');

const routes = express.Router();

/**
* @swagger
* /uploadCsv:
*   get:
*     tags:
*       - Files
*     name: Get All Files
*     summary:  Get All Files
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: Files Retrived successfully
*/
routes.get('/uploadCsv', fileCtrl.uploadCsv);

module.exports = routes;
