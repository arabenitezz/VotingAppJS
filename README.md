# Aplicación de Votación de Películas

## Descripción General del Proyecto

Esta es una aplicación web desarrollada con Node.js que permite a los usuarios gestionar y votar por películas. La aplicación utiliza Express.js como framework web, Sequelize como ORM (Mapeo Objeto-Relacional) para interacciones con la base de datos, y EJS para renderizar vistas.

## Características

- Ver todas las películas ordenadas por votos
- Agregar nuevas películas
- Editar películas existentes
- Eliminar películas
- Votar por películas

## Stack Tecnológico

- **Backend:** Node.js
- **Framework Web:** Express.js
- **ORM:** Sequelize
- **Motor de Plantillas:** EJS
- **Gestión de Sesiones:** express-session

## Estructura del Proyecto

```
raíz-del-proyecto/
│
├── app.js                # Archivo principal de la aplicación
├── controllers/
│   └── routes.js         # Define rutas y lógica de la aplicación
├── models/               # Modelos de Sequelize
│   └── index.js          # Definiciones de modelos
└── views/                # Plantillas EJS
    ├── index.ejs         # Plantilla de página principal
    └── add_movie.ejs     # Plantilla de página para agregar película
```

## Componentes Principales

### Configuración de la Aplicación (app.js)
- Configura la aplicación Express
- Configura middlewares para:
  - Análisis de JSON
  - Datos de formularios codificados en URL
  - Gestión de sesiones
- Establece EJS como motor de vistas
- Define rutas
- Inicia el servidor en el puerto 3000 (o puerto definido por el entorno)

### Rutas (routes.js)
La aplicación soporta las siguientes rutas:

- `GET /`: Muestra todas las películas ordenadas por votos
- `GET /add`: Renderiza el formulario de adición de películas
- `POST /add`: Agrega una nueva película a la base de datos
- `PUT /edit/:id`: Actualiza una película existente
- `DELETE /delete/:id`: Elimina una película de la base de datos
- `POST /vote/:id`: Incrementa los votos de una película específica

## Instalación y Configuración

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la base de datos en los modelos de Sequelize

4. Iniciar la aplicación:
   ```bash
   node app.js
   ```

## Variables de Entorno

- `PORT`: Define el puerto en el que se ejecutará el servidor (por defecto 3000)

## Manejo de Errores

La aplicación incluye manejo básico de errores para:
- Operaciones de base de datos
- Procesamiento de rutas
- Gestión de sesiones

Los errores se registran en la consola y se envían respuestas de error apropiadas al cliente.

## Gestión de Sesiones

Utiliza `express-session` para gestionar sesiones de usuario, con la siguiente configuración:
- Clave secreta para firmar sesiones
- Almacenamiento de sesiones no persistente
- Borrado automático de mensajes de sesión después de mostrarlos

## Contribución

1. Hacer un fork del repositorio
2. Crear una rama de características (`git checkout -b caracteristica/MejoraCincreíble`)
3. Confirmar los cambios (`git commit -m 'Agrega alguna MejoraCincreíble'`)
4. Empujar la rama (`git push origin caracteristica/MejoraCincreíble`)
5. Abrir un Pull Request

## Licencia

Especificar la licencia del proyecto aquí (por ejemplo, MIT, Apache 2.0)

Proyecto para Penguin Academy 🐧🚀
