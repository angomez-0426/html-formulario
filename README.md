# Gestión de Estudiantes 

Este es un proyecto simple que hice para gestionar estudiantes. Básicamente, es un formulario web donde puedes agregar, ver, buscar, editar y borrar estudiantes.  

Los datos pueden almacenarse de dos formas:
- **Localmente** usando `localStorage` (modo básico, sin necesidad de servidor).
- **En la nube** usando **Firebase Firestore**, lo que permite compartir la información entre múltiples usuarios.

## ¿Qué hace?

- Agregar estudiantes con código, nombre, email y programa. (En el caso de el codigo, se hace la verificacion de que si sean valores numericos y que ningun otro estudiante coincida con el mismo codigo, el email tambien tiene una comprobacion, el nombre igual que no tenga caracteres numericos, y puse que el programa sea de seleccion para que no se tengan errores).
- Ver todos en una tabla bonita.
- Buscar por nombre, email, programa o código (en tiempo real para que se pueda filtrar en caso de que quiera ver los estudiantes de una carrera en especifico o alguno de los otros atributos).
- Editar o borrar estudiantes fácilmente.
- Interfaz chévere con colores suaves.

## Tecnologías que usé

- **HTML5**: Para la estructura de la página.
- **CSS3**: Para la parte grafica de la página. 
- **JavaScript**: Para la lógica y guardar datos.
- **Firebase Firestore**: Base de datos en la nube para compartir datos entre usuarios.

## Cómo configurar Firebase

Para usar la base de datos en la nube:

1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un proyecto.
2. Habilita Firestore Database.
3. Ve a Project Settings > General > Your apps > Web app, copia la config.
4. En `index.html`, reemplaza `TU_API_KEY`, etc., con tus valores reales.
5. ¡Listo! Los datos se guardan en la nube y se comparten entre todos los usuarios.

## Cómo lo hice

### 1. La estructura (HTML)
Puse un formulario con campos para el código (solo números), nombre, email y un menú para elegir el programa. Después, una tabla para mostrar los estudiantes y un campo para buscar.

### 2. Los estilos (CSS)
Elegí colores verdes y azules suaves, botones redondeados y un fondo relajante. Nada fancy, pero se ve bien.

### 3. La lógica (JavaScript en app.js)
- Uso `localStorage` para persistencia local y **Firebase Firestore** para almacenamiento en la nube, permitiendo sincronización entre usuarios.
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
- Hice el repositorio público.
- Fui a Settings > Pages > Elegí la rama master y carpeta root.
- El sitio está en https://angomez-0426.github.io/html-formulario/

### 3. Acceso público
Ahora cualquiera con internet puede usarlo desde su PC o móvil. Dependiendo de la configuración, los datos pueden ser locales (por usuario) o compartidos usando Firebase.

## Para probarlo local

1. Clona el repositorio: `git clone <URL>`.
2. Abre index.html en tu navegador.
3. No necesitas instalar nada.

## Cómo usarlo

1. Llena los campos.
2. Dale a "Guardar".
3. Busca con el campo de arriba.
4. Edita o borra desde la tabla.
