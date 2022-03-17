
MongoDb debe estar ejecutado en local, en caso de querer utilizar una URI se debe modificar el .env de la siguiente manera:
LOCAL_MONGO = false
MONGO_URI_CLOUD = {{URI}}

**front && api**
npm install
npm start
