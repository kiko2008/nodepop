<img src="https://raw.githubusercontent.com/kiko2008/nodepop/master/public/logoNP.png" height="180" alt="Nodepop" />

El desarrollo es un API y una pagina web para mostrar el funcionamiento de una tienda de artículos de segunda mano desarrollada con Node.js, Express.js, EJS y MongoDB.

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

## Ejecucion
```
dentro del directorio raiz ejecutaremos:
```bash
npm start
```
este paso arrancara la aplicación.


## Desarrollo

### Inicialización de la base de datos
Decido dejar el archivo .env con la cadena de conexión a la base de datos por no haber credenciales ni datos susceptibles de tratar con mayor seguridad.

```bash
npm run installDB
```
este paso **inicializara** la base de datos con una serie de registros para que se puede empezar a realizar las pruebas inmediatamente.

### Tarea de Calidad

Para poder comprobar que no tenemos errores de calidad tenemos que lanzar la tarea qa configurada en el package.json del proyecto:

```bash
npm run qa
```

### Levantar api en modo debug

Para levantar el API y poder realizar las pruebas lanzaremos el siguiente comando:

```bash
npm run dev
```
este paso arrancara la aplicación en modo debug.

### Urls de prueba para el API REST

Si el api se ha levantado correctamente podremos probarla lanzando la siguiente url en un navegador:

```bash
GET
http://localhost:3000/apiv1/products

```
Esto devolverá en formato Json todos los productos

Otro ejemplo de url de consulta, con todos los parámetros del filtro, podría ser la siguiente:

```bash
GET
http://localhost:3000/apiv1/products?name=Moto%20campo&sale=true&price=2000-&tags=motor,lifestyle
```
El precio permite las posibilidades indicadas en el documento de requisitos:
* precio exacto: price=10
* precio mayor que: price=10-
* precio menor que: price=-10
* precio entre dos valores: price=10-3000

En el caso de los tags se puede consultar por uno o varios valores separados por comas como se ve en el ejemplo.



Para mostrar los tags existentes lanzaremos:
```bash
GET
http://localhost:3000/apiv1/tags
```

Para crear un nuevo producto en la base de datos lanzaremos la siguiente operación:
```bash
POST
http://localhost:3000/apiv1/newProduct

JSON
{
    "name": "nombre",
    "sale": true,
    "price": "10",
    "photo": "mobile10.jpg",
    "tags": ["mobile"]
}

```
### Urls de prueba para la web
Si el api se ha levantado correctamente podremos probarla lanzando la siguiente url y se mostraran los resultados en una web de ejemplo:

```bash
GET
http://localhost:3000/products

```
Esto mostrara todos los productos en la web Nodepop.

Otro ejemplo de url de consulta, con todos los parámetros del filtro, podría ser la siguiente:

```bash
GET
http://localhost:3000/products?name=Moto%20campo&sale=true&price=2000-&tags=motor,lifestyle
```
Esta operación mostrara los resultados del a consulta en la web Nodepop.

Para mostrar los tags existentes lanzaremos:
```bash
GET
http://localhost:3000/tags
```

### Imagenes
Se han introducido las siguientes imagenes en el directorio **/public/images/**:
```
lifestyle1.jpg lifestyle2.jpg lifestyle3.jpg lifestyle4.jpg lifestyle5.jpg lifestyle6.jpg lifestyle7.jpg lifestyle8.jpg lifestyle9.jpg lifestyle10.jpg

mobile1.jpg mobile2.jpg mobile3.jpg mobile4.jpg mobile5.jpg mobile6.jpg mobile7.jpg mobile8.jpg mobile9.jpg mobile10.jpg mobile11.jpg mobile12.jpg mobile13.jpg mobile14.jpg mobile15.jpg mobile16.jpg mobile17.jpg mobile18.jpg mobile19.jpg mobile20.jpg

motor1.jpg motor2.jpg motor3.jpg motor4.jpg motor5.jpg motor6.jpg
motor7.jpg motor8.jpg motor9.jpg motor10.jpg motor11.jpg motor12.jpg motor13.jpg motor14.jpg motor15.jpg motor16.jpg motor17.jpg motor18.jpg motor19.jpg motor20.jpg motor21.jpg motor22.jpg motor23.jpg motor24.jpg motor25.jpg motor26.jpg motor27.jpg motor28.jpg motor29.jpg motor30.jpg

work1.jpg work2.jpg work3.jpg work4.jpg
```

Si necesitamos usar alguna imagen nueva deberíamos introducirla en este directorio para que la aplicación pueda mostrarla en la web.

## Version

 V2.0

## License
[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)