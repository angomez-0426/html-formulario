# Gestión de Estudiantes

Este proyecto es una aplicación web simple para gestionar estudiantes, permitiendo registrar, listar, buscar, editar y eliminar estudiantes. Los datos se almacenan localmente en el navegador usando localStorage.

## Características

- Registro de estudiantes con código único, nombre, correo y programa académico.
- Validación básica de campos (código numérico, correo válido).
- Lista de estudiantes en una tabla.
- Búsqueda en tiempo real por nombre, correo, programa o código.
- Edición y eliminación de estudiantes.
- Interfaz responsiva con colores suaves.

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página.
- **CSS3**: Estilos y diseño.
- **JavaScript (ES6)**: Lógica del formulario, manipulación del DOM y almacenamiento local.

## Proceso de Creación del Código

### 1. Estructura HTML
- Se creó un formulario con inputs para código, nombre, correo y un select para programa.
- Una tabla para mostrar la lista de estudiantes.
- Un campo de búsqueda para filtrar estudiantes.
- Enlaces al archivo JavaScript.

### 2. Estilos CSS
- Fondo verde claro (#d9ffea).
- Colores azules y verdes para botones y encabezados.
- Bordes redondeados y hover effects.
- Tabla con bordes y colores consistentes.

### 3. Lógica JavaScript (app.js)
- **Almacenamiento**: Usar localStorage para persistir datos.
- **Funciones principales**:
  - `guardarEstudiante()`: Valida y guarda un estudiante.
  - `mostrarEstudiantes()`: Renderiza la tabla con estudiantes.
  - `filtrarEstudiantes()`: Filtra la lista según búsqueda.
  - `editarEstudiante()`: Permite editar inline.
  - `eliminarEstudiante()`: Elimina un estudiante.
- Validaciones: Código único, campos requeridos, formato de correo.

### 4. Mejoras
- Búsqueda insensible a mayúsculas.
- Edición sin recargar página.
- Mensajes de confirmación para eliminación.

## Despliegue

### 1. Inicialización de Git
- `git init` en la carpeta del proyecto.
- `git add .` para agregar archivos.
- `git commit -m "Initial commit"` para el primer commit.

### 2. Subida a GitHub
- Crear repositorio en GitHub (ej: html-formulario).
- `git remote add origin <URL del repo>`.
- `git push -u origin master` para subir.

### 3. Configuración de GitHub Pages
- Hacer el repositorio público.
- Ir a Settings > Pages > Deploy from a branch > Rama master, carpeta /.
- El sitio estará disponible en `https://<usuario>.github.io/<nombre-repo>/`.

### 4. Acceso Público
- Cualquiera con internet puede acceder desde cualquier dispositivo.
- Los datos se almacenan localmente, por lo que cada usuario tiene su propia lista.

## Instalación Local

1. Clona el repositorio: `git clone <URL>`.
2. Abre `index.html` en un navegador web.
3. No requiere servidor, funciona directamente en el navegador.

## Uso

1. Llena los campos del formulario.
2. Haz clic en "Guardar".
3. Usa el campo de búsqueda para filtrar estudiantes.
4. Edita o elimina estudiantes desde la tabla.

## Contribución

Si deseas contribuir, haz un fork del repo, crea una rama para tus cambios y envía un pull request.

## Licencia

Este proyecto es de código abierto. Úsalo libremente.