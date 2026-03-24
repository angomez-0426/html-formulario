# Gestión de Estudiantes 

Este es un proyecto simple que hice para gestionar estudiantes. Básicamente, es un formulario web donde puedes agregar, ver, buscar, editar y borrar estudiantes. Todo se guarda en el navegador, así que no necesitas un servidor ni nada complicado.

## ¿Qué hace?

- Agregar estudiantes con código, nombre, email y programa.
- Ver todos en una tabla bonita.
- Buscar por nombre, email, programa o código (en tiempo real).
- Editar o borrar estudiantes fácilmente.
- Interfaz chévere con colores suaves.

## Tecnologías que usé

- **HTML5**: Para la estructura de la página.
- **CSS3**: Para que se vea bonito.
- **JavaScript**: Para la lógica y guardar datos localmente.

## Cómo lo hice

### 1. La estructura (HTML)
Puse un formulario con campos para el código (solo números), nombre, email y un menú para elegir el programa. Después, una tabla para mostrar los estudiantes y un campo para buscar.

### 2. Los estilos (CSS)
Elegí colores verdes y azules suaves, botones redondeados y un fondo relajante. Nada fancy, pero se ve bien.

### 3. La lógica (JavaScript en app.js)
- Uso localStorage para guardar los datos (no se pierden al recargar).
- Funciones principales:
  - `guardarEstudiante()`: Chequea que todo esté bien y guarda.
  - `mostrarEstudiantes()`: Dibuja la tabla con todos.
  - `filtrarEstudiantes()`: Busca mientras escribes.
  - `editarEstudiante()`: Edita directo en la tabla.
  - `eliminarEstudiante()`: Borra con confirmación.
- Validé cosas como que el código sea único y el email válido.

### 4. Mejoras que agregué
- Búsqueda sin importar mayúsculas.
- Edición sin refrescar la página.
- Mensajes para confirmar borrados.

## Cómo desplegarlo

### 1. Git y GitHub
- `git init` para empezar.
- `git add .` y `git commit -m "Primer commit"` para guardar.
- Subí a GitHub creando un repo llamado "html-formulario".
- `git remote add origin <URL>` y `git push` para subir.

### 2. GitHub Pages
- Hice el repo público.
- Fui a Settings > Pages > Elegí la rama master y carpeta raíz.
- ¡Listo! El sitio está en https://angomez-0426.github.io/html-formulario/

### 3. Acceso público
Ahora cualquiera con internet puede usarlo desde su PC o móvil. Los datos son locales, así que cada uno tiene su lista.

## Para probarlo local

1. Clona el repo: `git clone <URL>`.
2. Abre index.html en tu navegador.
3. ¡Ya está! No necesitas instalar nada.

## Cómo usarlo

1. Llena los campos.
2. Dale a "Guardar".
3. Busca con el campo de arriba.
4. Edita o borra desde la tabla.

## Contribuciones

Si quieres mejorar algo, haz un fork y manda un PR. ¡Todo bienvenido!

## Licencia

Es open source, úsalo como quieras. 😊
