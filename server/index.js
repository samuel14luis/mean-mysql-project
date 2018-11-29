const express = require('express');
const app = express();
const cors = require('cors');

const dbConnection = require('./dbConnection');
const connection = dbConnection();

//Settings - Configuraciones
app.set('port', process.env.PORT || 3000);

//Middlewares - Intermediarios
app.use(express.json()) // para que el servidor entienda el formato JSON
app.use(cors({origin: 'http://localhost:4200'}));

//Routes - Rutas
app.use('/api/empleados',require('./routes/empleados.routes'))

//Starting the server - Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port')); 
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('Database connected as id ' + connection.threadId);
      });
});