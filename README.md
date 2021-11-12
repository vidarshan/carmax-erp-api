
<h1 align="center">Carmax API⚙️</h1>

*API for the Carmax ERP system*

# Setup 🚀

## Step 1 : 

- Create a folder named "config" in the root, In the config folder, create a file named `config.env` and add the following information according to your environment.

      NODE_ENV=development or production
      PORT=5000
      JWT_SECRET=''
      JWT_EXPIRE=''

## Step 2 : 

- In the config folder, create a file named `config.json` and add the following information according to your database.

      {
        "development": {
          "username": "",
          "password": "",
          "database": "",
          "host": "",
          "dialect": ""
        },
        "test": {
          "username": "",
          "password": "",
          "database": "",
          "host": "",
          "dialect": ""
        },
        "production": {
          "username": "",
          "password": "",
          "database": "",
          "host": "",
          "dialect": ""
        }
      }
      
# Scripts 📄
 
## Run the API [Continuous]
Run the API using nodemon : 

      npm run dev
      
## Run the API [Normal]
Run the API once : 

      npm start
      
## Run migrations
Run migrations : 

      npm run migrate
      
## Undo migrations
Undo migrations : 

      npm run undo-migrate
      
## Generate Model
Generate a model file and a migration : 

      npm run generate-model
      
## Generate Seed
Generate a seed file : 

      npm run generate-seed
      
## Run Seed 
Seed the database :

      npm run seed
      
## Create Database
Create a new database for the given name :
      
      npm run drop-db

## Drop Database
Drop the given database :

      npm run create-db
      
      
# References 📔
     
 - Express JS Documentation  : https://expressjs.com/
 
 - Sequelize Documentation   : https://sequelize.org/master/
 
 - Sequelize CLI             : https://www.npmjs.com/package/sequelize-cli
     
