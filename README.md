<img src="https://raw.githubusercontent.com/kiko2008/nodepop/master/public/logoNP.png" height="180" alt="Nodepop" />


El desarrollo es un API y una pagina web para mostrar el funcionamiento de una tienda de artículos de segunda mano desarrollada con Node.js, Express.js, COTÈ para los microservicios, EJS y MongoDB.



Se ha intentado respetar el patron MVC en el que esta basado el framework express para node.



## Instalación



Necesitamos tener instaladas en nuestro servidor las siguientes dependencias:



```

    cookie-parser

    cross-env

    debug

    ejs

    eslint

    express

    http-errors

    mongoose

    morgan

```

dentro del directorio raiz ejecutaremos:

```bash

npm install

```



## Ejecución

```

dentro del directorio raiz ejecutaremos:

```bash

npm start

```

este paso arrancara la aplicación.





## Desarrollo



### Inicialización de la base de datos

En el archivo **.env.example** hay un ejemplo con los datos configurables por el usuario.

Para el correcto funcionamiento de la aplicación se deberá crear un fichero **.env** con las mismas propiedades que tenemos en **.env.example** pero con los valores que necesitemos para la ejecución de la aplicación.



```bash

npm run installDB

```

este paso **inicializara** la base de datos con una serie de registros para que se pueda empezar a realizar las pruebas inmediatamente.



### Tarea de Calidad



Para poder comprobar que no tenemos errores de calidad tenemos que lanzar la tarea qa configurada en el package.json del proyecto:



```bash

npm run qa

```

### Tarea de Test

Con el comando:
```bash
npm run test
```

Lanzaremos los test e2e del apiv1.


### Levantar api en modo debug



Para levantar el API y poder realizar las pruebas lanzaremos el siguiente comando:



```bash

npm run dev

```

este paso arrancara la aplicación en modo debug.



### Urls de prueba para el API REST



Si el api se ha levantado correctamente tendremos las siguientes opciones:



```bash

POST /apiv1/loginJWT
```
Este es el punto inicial obligatorio para utilizar el apiv1.  

Nos devuelve el token Jwt con el que tendremos que realizar todas las llamadas a los endpoints del api. 


```bash
GET /apiv1/products
```
Este endpoint nos proporcionara los datos de los productos.

Si la llamada se realiza sin token la respuesta sera un status 401 con el mensaje:
```bash
    {

        "success": false,

        "error": "no token provided"

    }
```
Si la llamada se realiza con un token caducado la respuesta sera un status 401 con el siguiente mensaje de error:
```bash
    {

        "success": false,

        "error": "jwt expired"

    }
```
La duración del token es configurable mediante una constante del fichero .env.

Si el token informado en la petición es correcto, el endpoint devuelve todos los productos en formato json.

Otro ejemplo de url de consulta, con todos los parámetros del filtro, podría ser la siguiente:
```bash
GET /apiv1/products?name=Moto%20campo&sale=true&price=2000-&tags=motor,lifestyle
```

El precio permite las posibilidades indicadas en el documento de requisitos:

* precio exacto: price=10

* precio mayor que: price=10-

* precio menor que: price=-10

* precio entre dos valores: price=10-3000


El funcionamiento de la autenticación para ver los tags sera el mismo que para los productos. 

Si realizamos una petición con el token correcto al endpoint de consulta de tags se mostraran en formato Json los tags existentes en la bbdd:
```bash
GET /apiv1/tags
```


Para crear un nuevo producto en la base de datos realizaremos una llamada al siguiente endpoint teniendo en cuenta el funcionamiento del token descrito en los casos anteriores:
```bash
POST /apiv1/newProduct

Body

{

    "image": Elemento de tipo file con la nueva imagen del anuncio,

    "name": "nombre",

    "sale": true,

    "price": "10",

    "tags": ["mobile"]

}

Headers

    x-access-token: my-token
```
A parte de crear un nuevo anuncio este endpoint llamara al microservicio /services/createThumbnailService.js

### Servicio de creación de thumbnails

El api se apoya en un microservicio para la creación del thumbnail de cada nuevo producto. Este microservicio se encuentra en /services/createThumbnailService.js. Para que la creación de los thumbnails se ejecute correctamente debemos tener levantado este servicio, por ejemplo ejecutando el comando:

```bash
node createThumbnailService.js

```

cuando el endpoint de creación de productos llame a este servicio se creara un thumbnail de la imagen del producto en el directorio /images/thumbnails/.



### Web Nodepop

Nodepop es una web de comercialización de artículos de segunda mano localizada a **Ingles** y **Español**.



Para acceder a ella una vez levantado el servidor tendremos que acceder a la url:



```bash

http://localhost:3000/

```

Esto mostrara la home de la web, donde tendremos la posibilidad de autenticarnos para acceder a las paginas privadas de la aplicación.


Al pulsar el boton de login podremos ver la pantalla de login donde podremos autenticarnos en la aplicación.

En el scritp de inicialización de la bd se ha creado el usuario **user@example.com/1234**, para poder autenticarnos en la aplicación y realizar las pruebas que necesitemos.



Una vez autenticados, en el header de la aplicación aparecerán el enlace a la pagina privada de la aplicación con los productos y un boton de logout.



La autenticación se hace por session y dura dos dias, si authSession caduca nos aparece la pagina de login de la aplicación.



### Imagenes

Se han introducido las siguientes imagenes en el directorio **/public/images/**, para que los anuncios las muestren correctamente:

```

lifestyle1.jpg lifestyle2.jpg lifestyle3.jpg lifestyle4.jpg lifestyle5.jpg lifestyle6.jpg lifestyle7.jpg lifestyle8.jpg lifestyle9.jpg lifestyle10.jpg



mobile1.jpg mobile2.jpg mobile3.jpg mobile4.jpg mobile5.jpg mobile6.jpg mobile7.jpg mobile8.jpg mobile9.jpg mobile10.jpg mobile11.jpg mobile12.jpg mobile13.jpg mobile14.jpg mobile15.jpg mobile16.jpg mobile17.jpg mobile18.jpg mobile19.jpg mobile20.jpg



motor1.jpg motor2.jpg motor3.jpg motor4.jpg motor5.jpg motor6.jpg

motor7.jpg motor8.jpg motor9.jpg motor10.jpg motor11.jpg motor12.jpg motor13.jpg motor14.jpg motor15.jpg motor16.jpg motor17.jpg motor18.jpg motor19.jpg motor20.jpg motor21.jpg motor22.jpg motor23.jpg motor24.jpg motor25.jpg motor26.jpg motor27.jpg motor28.jpg motor29.jpg motor30.jpg



work1.jpg work2.jpg work3.jpg work4.jpg

```


## BONUS TRACK! - Crear un módulo público

Se ha publicado en npm el modulo niflettergen.
El modulo sirve para generar la letra del nif, pasando por parametro el numero de identificacion.

La url del repositorio de git es:
```bash
    https://github.com/kiko2008/niflettergenerator
```


## Version



 V1.0



## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)