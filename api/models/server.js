const express = require('express');
const cors = require('cors');
const connectionDb = require('../database/config');

class Server {
   constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
         user: '/api/users',
         rol: '/api/roles'
      }

      this.dbConnection();

      this.middlewares();

      this.routes();
   }


   async dbConnection() {
      await connectionDb()
   }

   middlewares(){
      this.app.use(express.json());
      this.app.use(cors());
      this.app.use(express.static('public'));
   };

   routes(){
      this.app.use(this.paths.user, require('../routes/users'));
      this.app.use(this.paths.rol, require('../routes/roles'));
   }

   listen(){
      this.app.listen(this.port, () => {
         console.log('Server on port')
      })
   }

}

module.exports = Server;