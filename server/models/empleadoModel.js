let empleadoModel = {};

empleadoModel.getEmpleados = (connection, callback) => {
    if(connection) {
        connection.query('SELECT * FROM news;', (error, result) => {
            if(error) throw error;
            callback(null, result);
        });
    }
}

empleadoModel.getEmpleado = (connection, id, callback) => {
    if(connection) {
        connection.query("SELECT * FROM news WHERE id_news = ?;", [id],(error, result) => {
            if(error) throw error;
            callback(null, result);
        });
    }
}

empleadoModel.insertEmpleado = (connection, empleado, callback) => {
    if(connection) {
        connection.query("INSERT INTO news(title, news) values(?, ?);", [empleado.title, empleado.news], (error, result) => {
            if(error) throw error;
            callback(null, result);
        });
    }
}

empleadoModel.updateEmpleado = (connection, empleado, callback) => {
    if(connection) {
        const sql = "UPDATE news SET title=?, news=? WHERE id_news=?";
        data = [empleado.title, empleado.news, empleado.id_news]

        console.log('actualizando ',data);

        connection.query(sql, data, (error, result) => {
            if(error) throw error
            callback(error, {
                success: true,
                msg: 'Empleado actualizado',
                result
            })
        })
    }
}

empleadoModel.deleteEmpleado = (connection, id, callback) => {
    if(connection) {
        connection.query("SELECT * FROM news WHERE id_news = " + connection.escape(id), (error, row) => {
            if(row.length > 0) {
                connection.query("DELETE FROM news WHERE id_news = " + connection.escape(id), (err, result) => {
                    if(err) {
                        callback(err, {
                            success: false,
                            msg: 'Empleado no eliminado',
                            result
                        })
                    } else {
                        callback(err, {
                            success: true,
                            msg: 'Empleado eliminado',
                            result
                        })
                    }
                })
            } else {
                callback(error, {
                    success: false,
                    msg: 'Empleado no encontrado',
                    result: error
                })
            }
        })
    }
}

module.exports = empleadoModel;