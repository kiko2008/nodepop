# NodePop

El desarrollo es un API y una pagina web para mostrar el funcionamiento de una tienda de articulos de segunda mano desarrollada con Node.js, Express.js, EJS y MongoDB.

Se ha intentado respetar el patron MVC en el que esta basado el framework express para node.

## Instalacion

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


## Desarrollo

### Inicializacion de la base de datos
```bash
npm run installDB
```

### Tarea de Calidad

Para poder comprobar que no tenemos errores de calidad tenemos que lanzar la tarea qa configurada en el package.json del proyecto:

```bash
npm run qa
```

## Levantar api en modo debug

Para levantar el API y poder realizar las pruebas lanzaremos el siguiente comando:

```bash
npm run dev
```

## Urls de prueba para el API

Si el api se ha levantado correctamente podremos probarla lanzando la siguiente url en un navegador:

```bash
GET
http://localhost:3000/apiv1/products
```

otro ejemplo de url de consulta, con todos los parametros del filtro, podria ser la siguiente:

```bash
GET
http://localhost:3000/apiv1/products?name=Mustang&sale=false&price=2000-&tags=motor,lifestyle
```

Para mostrar los tags existentes lanzaremos:
```bash
GET
http://localhost:3000/apiv1/tags
```

Para mostrar los tags existentes lanzaremos:
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



## Version

 V1.0

## License
[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)