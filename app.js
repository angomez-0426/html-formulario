// Configuración de IndexedDB (Base de datos del navegador)
// IndexedDB es una base de datos local en el navegador que permite almacenar datos de forma persistente.
// Aquí se abre la base de datos 'EstudiantesDB' con versión 2 (actualizada para forzar índices únicos).
// Si la base de datos no existe, se crea; si la versión cambia, se actualiza.
let db;
const request = indexedDB.open('EstudiantesDB', 2);

// Evento que se ejecuta si hay un error al abrir la base de datos
request.onerror = function(event) {
  console.log('Error opening DB');
};

// Evento que se ejecuta cuando la base de datos se abre exitosamente
request.onsuccess = function(event) {
  db = event.target.result;  // Asigna la instancia de la base de datos a la variable db
  cargarEstudiantes();  // Carga los estudiantes existentes en la tabla
};

// Evento que se ejecuta si la base de datos necesita actualizarse (por ejemplo, nueva versión)
request.onupgradeneeded = function(event) {
  db = event.target.result;
  // Si es una actualización de versión, borrar el objectStore anterior y recrear con índices
  if (event.oldVersion < 2) {
    if (db.objectStoreNames.contains('estudiantes')) {
      db.deleteObjectStore('estudiantes');
    }
  }
  // Crea un 'object store' llamado 'estudiantes' con clave primaria 'id' autoincremental
  const objectStore = db.createObjectStore('estudiantes', { keyPath: 'id', autoIncrement: true });
  // Crea índices para buscar por nombre, correo, programa y código (código único)
  objectStore.createIndex('nombre', 'nombre', { unique: false });
  objectStore.createIndex('correo', 'correo', { unique: false });
  objectStore.createIndex('programa', 'programa', { unique: false });
  objectStore.createIndex('codigo', 'codigo', { unique: true });
};

// Function to save student
function guardarEstudiante() {
  const codigo = document.getElementById('codigo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const programa = document.getElementById('programa').value.trim();

  if (!codigo || !nombre || !correo || !programa) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validaciones
  if (!/^\d+$/.test(codigo)) {
    alert('El código debe ser solo numérico.');
    return;
  }
  if (!/^[\p{L}\s]+$/u.test(nombre)) {
    alert('El nombre solo puede contener letras y espacios (incluye acentos).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert('El correo no es válido.');
    return;
  }
  if (!/^[\p{L}\s]+$/u.test(programa)) {
    alert('El programa solo puede contener letras y espacios (incluye acentos).');
    return;
  }

  console.log('Intentando guardar estudiante:', { codigo, nombre, correo, programa });

  const transaction = db.transaction(['estudiantes'], 'readwrite');
  const objectStore = transaction.objectStore('estudiantes');
  const request = objectStore.add({ codigo, nombre, correo, programa });

  request.onsuccess = function(event) {
    console.log('Estudiante guardado exitosamente');
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('programa').value = '';
    cargarEstudiantes();
  };

  request.onerror = function(event) {
    if (event.target.error.name === 'ConstraintError') {
      alert('Ese código ya está registrado.');
    } else {
      console.log('Error guardando estudiante:', event.target.error);
      alert('Error al guardar el estudiante. Revisa la consola para más detalles.');
    }
  };
}

// Function to load students
function cargarEstudiantes() {
  const transaction = db.transaction(['estudiantes'], 'readonly');
  const objectStore = transaction.objectStore('estudiantes');
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const estudiantes = event.target.result;
    console.log('Estudiantes cargados:', estudiantes);
    const tbody = document.getElementById('tablaEstudiantes');
    tbody.innerHTML = '';

    estudiantes.forEach(estudiante => {
      const row = tbody.insertRow();
      row.dataset.id = estudiante.id;
      row.insertCell(0).textContent = estudiante.codigo;
      row.insertCell(1).textContent = estudiante.nombre;
      row.insertCell(2).textContent = estudiante.correo;
      row.insertCell(3).textContent = estudiante.programa;
      const cell = row.insertCell(4);
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'action-btn';
      editBtn.onclick = function() { editarEstudiante(estudiante.id); };
      cell.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'action-btn';
      deleteBtn.onclick = function() { eliminarEstudiante(estudiante.id); };
      cell.appendChild(deleteBtn);
    });
  };
}

// Function to delete student
function eliminarEstudiante(id) {
  const transaction = db.transaction(['estudiantes'], 'readwrite');
  const objectStore = transaction.objectStore('estudiantes');
  const request = objectStore.delete(id);

  request.onsuccess = function(event) {
    console.log('Estudiante eliminado');
    cargarEstudiantes();
  };

  request.onerror = function(event) {
    console.log('Error eliminando estudiante');
  };
}

// Function to edit student
function editarEstudiante(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  const cells = row.cells;

  // Make cells editable (codigo, nombre, correo, programa)
  for (let i = 0; i < 4; i++) {
    const input = document.createElement('input');
    input.type = i === 2 ? 'email' : 'text';  // correo email, demás text para evitar flechitas numéricas
    if (i === 0) {
      input.inputMode = 'numeric';
      input.pattern = '\\d*';
      input.title = 'Solo dígitos';
    }
    input.value = cells[i].textContent;
    input.className = 'edit-input';
    cells[i].innerHTML = '';
    cells[i].appendChild(input);
  }

  // Change buttons
  const actionCell = cells[4];
  actionCell.innerHTML = '';
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Guardar Cambios';
  saveBtn.className = 'action-btn';
  saveBtn.onclick = function() { guardarCambios(id); };
  actionCell.appendChild(saveBtn);
}

// Function to save changes
function guardarCambios(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  const cells = row.cells;
  const codigo = cells[0].querySelector('input').value.trim();
  const nombre = cells[1].querySelector('input').value.trim();
  const correo = cells[2].querySelector('input').value.trim();
  const programa = cells[3].querySelector('input').value.trim();

  if (!codigo || !nombre || !correo || !programa) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validaciones
  if (!/^\d+$/.test(codigo)) {
    alert('El código debe ser solo numérico.');
    return;
  }
  if (!/^[\p{L}\s]+$/u.test(nombre)) {
    alert('El nombre solo puede contener letras y espacios (incluye acentos).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert('El correo no es válido.');
    return;
  }
  if (!/^[\p{L}\s]+$/u.test(programa)) {
    alert('El programa solo puede contener letras y espacios (incluye acentos).');
    return;
  }

  console.log('Intentando actualizar estudiante:', { id, codigo, nombre, correo, programa });

  const transaction = db.transaction(['estudiantes'], 'readwrite');
  const objectStore = transaction.objectStore('estudiantes');
  const request = objectStore.put({ id: parseInt(id), codigo, nombre, correo, programa });

  request.onsuccess = function(event) {
    console.log('Estudiante actualizado exitosamente');
    cargarEstudiantes();
  };

  request.onerror = function(event) {
    if (event.target.error.name === 'ConstraintError') {
      alert('Ese código ya está registrado.');
    } else {
      console.log('Error actualizando estudiante:', event.target.error);
      alert('Error al actualizar el estudiante. Revisa la consola para más detalles.');
    }
  };
}

// Function to filter students
function filtrarEstudiantes() {
  const query = document.getElementById('busqueda').value.toLowerCase();
  const rows = document.querySelectorAll('#tablaEstudiantes tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}