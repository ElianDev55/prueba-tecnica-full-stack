# Backend Restaurant API

API REST desarrollada con NestJS para la gestión de un restaurante. Este sistema permite administrar productos, pedidos, facturación y más.

## 📚 Documentación

La documentación completa de la API está disponible a través de Swagger UI en:

```
http://localhost:3001/swagger
```

> **Nota**: El puerto puede variar según la configuración en tu archivo `.env`

## 🚀 Características

- Autenticación JWT
- Gestión de usuarios
- Gestión de productos
- Sistema de facturación
- Envío de correos con SendGrid
- Documentación automática con Swagger

## 🛠️ Estructura del Proyecto

```
src/
├── additional-products/    # Gestión de productos adicionales
├── auth/                  # Autenticación y autorización
├── bill-details/          # Detalles de facturas
├── bills/                 # Gestión de facturas
├── chips/                 # Gestión de chips/snacks
├── details-dishes/        # Detalles de platos
├── dishes/                # Gestión de platos
├── drinks/                # Gestión de bebidas
├── guard/                 # Guards de autenticación
├── interceptors/          # Interceptores globales
├── products/              # Gestión de productos base
├── sauces/               # Gestión de salsas
├── send-grid/            # Servicio de envío de correos
└── users/                # Gestión de usuarios
```

## 📋 Endpoints Principales

### 🔐 Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/validate-token` - Validar token JWT

### 👤 Usuarios

- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario por ID
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### 🍽️ Platos

- `GET /dishes` - Listar platos
- `POST /dishes` - Crear nuevo plato
- `GET /dishes/:id` - Obtener plato por ID
- `PATCH /dishes/:id` - Actualizar plato
- `DELETE /dishes/:id` - Eliminar plato

### 🥤 Bebidas

- `GET /drinks` - Listar bebidas
- `POST /drinks` - Crear nueva bebida
- `GET /drinks/:id` - Obtener bebida por ID
- `PATCH /drinks/:id` - Actualizar bebida
- `DELETE /drinks/:id` - Eliminar bebida

### 💰 Facturación

- `GET /bills` - Listar facturas
- `POST /bills` - Crear nueva factura
- `GET /bills/:id` - Obtener factura por ID
- `GET /bills/user/:userId` - Obtener facturas por usuario
- `GET /bills/sendBi-bill/:bill_id` - Enviar factura por email

## 🔧 Instalación

1. Clonar el repositorio

```bash
git clone <repositorio>
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
```

4. Iniciar el servidor en modo desarrollo

```bash
npm run start:dev
```

## 📨 Configuración de SendGrid

El sistema utiliza SendGrid para el envío de correos electrónicos. Para configurarlo:

1. Crear cuenta en SendGrid
2. Obtener API Key
3. Configurar en el archivo .env:

```env
SENDGRID_API_KEY=tu_api_key
```

## 🔑 Autenticación

La API utiliza autenticación JWT. Para acceder a endpoints protegidos:

1. Obtener token mediante login
2. Incluir token en header:

```
Authorization: Bearer <tu_token>
```

## 🛡️ Seguridad

- Todos los endpoints (excepto login y registro) requieren autenticación
- Las contraseñas se almacenan hasheadas
- Validación de datos en todos los endpoints
- Protección contra inyección SQL

## 📝 Documentación Detallada

Para ver la documentación detallada de cada endpoint:

1. Iniciar el servidor
2. Acceder a `http://localhost:3001/swagger`
3. Explorar cada endpoint con:
   - Descripción completa
   - Parámetros requeridos
   - Ejemplos de request/response
   - Códigos de estado
   - Esquemas de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
