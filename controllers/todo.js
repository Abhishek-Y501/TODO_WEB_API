const { validationResult } = require('express-validator');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const db = require('../database/db');


//TODO Add Controller
exports.todoAddController = ((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        var error = new Error('Invalid Todo Details!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    console.log(req.body.name)
    const name = req.body.name;
    const description = req.body.description;
    const status = req.body.status;


    db.getDB().db().collection('todos').insertOne({ name: name, description: description, status: status }).then(data => {
        res.status(201).json({
            objResponse: { responseText: "Successfully Data Added!", responseMethod: "TODO_ADD_SUCCESS", responseCode: 1, data: data }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Error!", responseMethod: "TODO_ADD_Fail", responseCode: 0, data: null }
        next(err);
    })
})

//TODO Get Controller
exports.todoGetController = ((req, res, next) => {
    db.getDB().db().collection('todos').find().toArray().then(data => {
        res.status(200).json({
            objResponse: { responseText: "Successfully Data Retrived!", responseMethod: "TODO_GET_SUCCESS", responseCode: 0, data: data }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Failed!", responseMethod: "TODO_GET_Fail", responseCode: 0, data: null }
        next(err);
    })
})

//TODO  Update Controller
exports.todoUpdateController = ((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = new Error('Invalid Todo Details!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const status = req.body.status;
    const id = req.body.Id;
    db.getDB().db().collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }).then(updatedData => {
        res.status(201).json({
            objResponse: { responseText: "Successfully Data Updated!", responseMethod: "TODO_UPDATE_SUCCESS", responseCode: 1, data: updatedData }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Failed!", responseMethod: "TODO_UPDATE_Fail", responseCode: 0, data: null }
        next(err);
    })
})


//TODO Delete Controller
exports.todoDeleteController = ((req, res, next) => {
    //const id = req.params.id;
    db.getDB().db().collection('todos').deleteOne({ _id: new ObjectId(req.params.id) }).then(data => {
        res.status(200).json({
            objResponse: { responseText: "Data Deleted!", responseMethod: "TODO_DELETE_SUCCESS", responseCode: 0, data: data }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Failed!", responseMethod: "TODO_Delete_Fail", responseCode: 0, data: null }
        next(err);
    })

})
