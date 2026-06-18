![Logo react games](./public/Logo.png)
# REACT GAMES - Backend API

## Programación Web Avanzada (TUDW - UNCo)
**Trabajo Práctico:** API REST con Node.js, Express, Prisma y PostgreSQL.

###  Integrantes y Roles (LAR Developers)
- **Project Manager (PM):** Andrea Crespillo — FAI-5546
- **Developer:** Linda Cristal Parra Sanhueza — FAI-5568
- **Developer:** Ramiro Navarrete — FAI-5522

---

##  Descripción Breve de la Aplicación
Este repositorio contiene el backend exclusivo de **REACT GAMES**, una plataforma web diseñada como una ludoteca digital virtual para amantes de los juegos de mesa. El objetivo de esta API REST es migrar, robustecer y reemplazar por completo el almacenamiento en `localStorage` utilizado previamente en la primera etapa, persistiendo la información de forma real, segura y escalable mediante una arquitectura relacional y endpoints optimizados.

##  Descripción de la Entidad Principal Elegida
La entidad principal de nuestro sistema es **Boardgame (Juego de Mesa)**. Debido a los requerimientos de internacionalización solicitados, esta entidad se diseñó de manera desacoplada mediante una relación de uno a muchos con la tabla **BoardgameTranslation**. 

De esta forma, la tabla base almacena datos globales invariables (como el `id`, `imageURL` y marcas de tiempo), mientras que la tabla de traducciones encapsula de forma localizada el `name`, `description` y el array de `category` en múltiples idiomas (Español/Inglés), optimizando las búsquedas directas mediante SQL nativo y Prisma ORM.

---

##  Tecnologías Utilizadas
- **Node.js** & **Express** (Runtime y Framework del Servidor)
- **Prisma ORM** (Modelado de datos y cliente de persistencia)
- **PostgreSQL** (Base de datos relacional)
- **Swagger UI Express** (Documentación interactiva y testeo de endpoints)
- **Apidog** (Diseño, testeo automatizado y documentación de la API)
- **Cors** & **Dotenv** (Seguridad y variables de entorno)
- **Nodemon** (Entorno de desarrollo ágil)

---

##  Gestión del Proyecto y Enlaces Obligatorios
*(Nota: El repositorio contiene únicamente el código del backend tal como lo solicita la consigna. El frontend se mantiene aislado).*

- **Tablero Kanban (Linear):** [https://linear.app/pwa-lar/project/tp-3-reactgames-backend-ed857e267a97/overview]
- **Repositorio Frontend (GitHub):** [https://github.com/nramiror/TUDW_PWA_LAR_Developers_TP_React_2.git]
- **Documentación Interactiva (Apidog):** [https://app.apidog.com/invite?token=0UDCA9GFzbotH0_10_By9]
- **Despliegue del Backend (Vercel):** [https://tudw-pwa-lar-developers-react-games.vercel.app/]
- **Despliegue del Frontend Actualizado:** [https://tudw-pwa-lar-developers-tp-react-2.vercel.app/]
- **Despligue Neon:** [https://console.neon.tech/app/projects/royal-band-15221509]

---

##  Instalación y Ejecución Local

Siga estos pasos detallados para replicar y ejecutar el entorno de desarrollo en su máquina local:

### 1. Clonar el repositorio y posicionarse en la rama de desarrollo
git clone [https://github.com/Andre-C96/TUDW_PWA_LAR_Developers_ReactGames-BackEnd.git](https://github.com/Andre-C96/TUDW_PWA_LAR_Developers_ReactGames-BackEnd.git)
cd TUDW_PWA_LAR_Developers_ReactGames-BackEnd
git checkout developer

### 2. Instalar las dependencias del proyecto
    npm install

### 3. Configurar las Variables de Entorno
Cree un archivo llamado .env en la raíz del proyecto basándose en el siguiente esquema obligatorio:
PORT=30001
DATABASE_URL="postgresql://neondb_owner:npg_4csaHX0EfdwT@ep-icy-cherry-acndcpgq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

### 4. Ejecutar Migraciones de Prisma
Para impactar la estructura del modelo y mapear las tablas en su base de datos local o remota, ejecute:
    npx prisma migrate dev --name init

### 5. Ejecutar el Seed (Datos de prueba iniciales)
Para de esta manera poblar las tablas con los usuarios base y la ludoteca de juegos de mesa inicial listos para consumir, ejecute:

    npx prisma db seed

### 6. Documentación de la API (Swagger / Apidog) y Credenciales de Prueba
La API expone dos entornos de documentación y pruebas para validar el comportamiento de los endpoints, headers y respuestas HTTP directamente desde la nube o de forma local.

Ruta de Swagger: [COMPLETAR]

Espacio de trabajo en Apidog: [https://app.apidog.com/invite?token=0UDCA9GFzbotH0_10_By9] 
(Reemplaza el uso de Postman para el diseño y testing automatizado de las respuestas JSON).

### 7. Cuenta de prueba para la corrección:
Para testear aquellos endpoints que requieran autenticación o un estado de sesión activo (como la gestión de listas de favoritos o flujos protegidos), utilice las siguientes credenciales pre-cargadas mediante el script de seed:

Correo Electrónico: tester@lar.com

Contraseña: 1111












