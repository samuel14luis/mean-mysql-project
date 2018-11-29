const dbConnection = require('../dbConnection');
const connection = dbConnection();

const empleadoModel = require('../models/empleadoModel')

let empleadoController = {};

empleadoController.getEmpleados = (req, res) => {
    empleadoModel.getEmpleados(connection, (error, data) => {
        res.json(data)
    })   
}

empleadoController.getEmpleado = (req, res) => {
    empleadoModel.getEmpleado(connection, req.params.id, (error, data) => {
        res.json(data)
    })   
}

empleadoController.insertEmpleado = (req, res) => {
    const empleado_nuevo = {
        id: null,
        title: req.body.title,
        news: req.body.news
    }  

    empleadoModel.insertEmpleado(connection, empleado_nuevo, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                msg: 'Error',
                result: error
            })
            throw error;
        }
        if(result) {
            res.json({
                success: true,
                msg: 'Empleado insertado',
                result
            })
        }
    }) 
}

empleadoController.updateEmpleado = (req, res) => {
    const empleado_actualizar = {
        id_news: req.params.id || req.body.id_news ,
        title: req.body.title,
        news: req.body.news
    }  
    

    empleadoModel.updateEmpleado(connection, empleado_actualizar, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                msg: 'Error',
                result: error
            })
            throw error;
        }
        if(result) {
            res.json(result)            
        }
    }) 
}

empleadoController.deleteEmpleado = (req, res) => {

    let id_news = req.params.id || req.body.id_news;
    console.log(req.params);
    
    empleadoModel.deleteEmpleado(connection, id_news, (error, result) => {
        if (error) {
            res.status(500).json(error)
            throw error;
        } else {
            res.json(result)
        }
    })
}

module.exports = empleadoController;