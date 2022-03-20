<h1>Bienvenidos a mi pequeño proyecto de React</h1>

 <h2> ¿Como montarlo? </h2>

 Debemos tener previamente instalado Node.js y el gestor de paquetes npm, tambien MongoDb si queremos ejecutar la base de datos en local.

 https://es.joecomp.com/how-install-mongodb-debian-10-linux
 
 
 1. Primero ejecutamos la base de datos en local con el comando:
    > sudo systemctl start mongod.service
 2. Luego entramos al directorio apiExpress y lo ejecutamos con:
    > npm start
 3. Por ultimo con una nueva terminal entramos al directorio frontReact y tambien lo ejecutamos:
    > npm start


MongoDb debe estar ejecutado en local, en caso de querer utilizar una URI se debe modificar el .env de la siguiente manera:
LOCAL_MONGO = false
MONGO_URI_CLOUD = {{URI}}


<h2>Posibles errores:</h2>

En caso de recibir el error:

>Error: error:0308010C:digital envelope routines::unsupported
>    at new Hash (node:internal/crypto/hash:67:19)
>    at Object.createHash (node:crypto:135:10)
>    at module.exports (/home/x/challenge001/frontReact/node_modules/webpack/lib/util/createHash.js:135:53)
>    at NormalModule._initBuildHash (/home/x/challenge001/frontReact/node_modules/webpack/lib/NormalModule.js:417:16)
>    at /home/x/challenge001/frontReact/node_modules/webpack/lib/NormalModule.js:452:10
>    at /home/x/challenge001/frontReact/node_modules/webpack/lib/NormalModule.js:323:13
>    at /home/x/challenge001/frontReact/node_modules/loader-runner/lib/LoaderRunner.js:367:11
>    at /home/x/challenge001/frontReact/node_modules/loader-runner/lib/LoaderRunner.js:233:18
>    at context.callback (/home/x/challenge001/frontReact/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
>    at /home/x/challenge001/frontReact/node_modules/babel-loader/lib/index.js:59:103 {
>  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
>  library: 'digital envelope routines',
>  reason: 'unsupported',
>  code: 'ERR_OSSL_EVP_UNSUPPORTED'
>}

bastara con ejecutar:
> export NODE_OPTIONS=--openssl-legacy-provider