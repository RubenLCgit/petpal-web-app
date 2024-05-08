# PetPal Web App

<img src="./src/assets/img/PetPal_LOGO(1).png" alt="Logo" width="200"/>

### Descripción
**PetPal Web App** es parte de mi primer proyecto completo de aplicación web que trabaja en conjunto con un API que creé posteriormente y una base de datos creada mediante code first dockerizada. La idea de la app es ofrecer un conjunto de herramientas útiles para propietarios de mascotas y veterinarios, facilitando la gestión de información, seguimiento de salud y análisis.

### Características
- **Gestión de Mascotas:** Organiza toda la información de tus mascotas en un solo lugar.
- **Autenticación Segura:** Uso de JWT para la autenticación y gestión de usuarios.
- **Visualización de Datos:** Gráficos intuitivos utilizando `chart.js`.
- **Multilenguaje:** Compatibilidad con múltiples idiomas gracias a `vue-i18n`.
- **Interfaz Moderna:** Construida con `Vuetify` para una experiencia de usuario moderna y receptiva.

### Tecnologías Usadas (Frontend)
- **Frontend:** Vue 3, Vue Router, Pinia
- **UI Framework:** Vuetify
- **Construcción:** Vite

### Tecnologías Usadas (Backend)
La aplicación backend está desarrollada con **.NET** y **EntityFrameworkCore**, proporcionando una API robusta y segura:

- **API Framework:** ASP.NET Core
- **ORM:** EntityFrameworkCore
- **Autenticación:** JWT para autenticación de usuarios y BCrypt.Net para hash de contraseñas
- **Gestión de Usuarios:** Servicios RESTful para CRUD de usuarios con roles y permisos
- **Logger:** Uso extensivo de `ILogger` para un registro eficiente de eventos y errores

[Repositorio de la API Backend](https://github.com/RubenLCgit/API-ASP.NET-Core.git)

### Instalación y Uso
1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu_usuario/petpal-web-app.git
    ```
2. Entra al directorio del proyecto:
    ```bash
    cd petpal-web-app
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

### Scripts Disponibles
- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Realiza la construcción de la aplicación para producción.
- **`npm run preview`**: Vista previa de la aplicación construida.
- **`npm run lint`**: Linter para mantener la calidad del código.
- **`npm run format`**: Formatea el código con Prettier.

### Contribuciones
Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las directrices de contribución y abrir un issue antes de enviar un Pull Request.

