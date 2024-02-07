commands:-
  Dep:-
    npm i express sequelize pg pg-hstore joi jsonwebtoken bcrypt

  devDep:-
    npm i -D @types/express @types/sequelize @types/joi @types/jsonwebtoken @types/bcrypt @types/node nodemon typescript ts-node

lib/framework used:-
  -Express.
  -JWT(jsonwebtoken).
  -joi.
  -sequelize ORM.
  -bcrypt.
  -nodemon.
  -ts-node.

read this:-
  -tsc(typescipt compiler) must be configured in the machine ( or ) visit the "dist" folder and give "npm start" after installing modules it starts the index.js file in the dist(make sure the postgresdb is installed on your machine and username and password are configured correctly).
  -for run in typescript use command "npm run dev" after installing modules.
  -postman collection data is added ,the filename is "collection.json" please use that and modifiy headers with authorization.
  -sql db backup is given , filename "postgresdb.sql" please use this file by using restore functionality in pgadmin.
  
  
