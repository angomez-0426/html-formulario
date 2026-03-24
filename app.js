// Función para guardar estudiante
async function guardarEstudiante() {
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

  try {
    // Verificar si el código ya existe
    const q = window.query(window.collection(window.db, 'estudiantes'), window.where('codigo', '==', codigo));
    const querySnapshot = await window.getDocs(q);
    if (!querySnapshot.empty) {
      alert('Ese código ya está registrado.');
      return;
    }

    // Agregar estudiante
    await window.addDoc(window.collection(window.db, 'estudiantes'), {
      codigo,
      nombre,
      correo,
      programa
    });

    alert('Estudiante guardado exitosamente');
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('programa').value = '';
    cargarEstudiantes();
  } catch (error) {
    console.error('Error guardando estudiante:', error);
    alert('Error al guardar el estudiante.');
  }
}

// Función para cargar estudiantes
async function cargarEstudiantes() {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, 'estudiantes'));
    const estudiantes = [];
    querySnapshot.forEach((doc) => {
      estudiantes.push({ id: doc.id, ...doc.data() });
    });
    console.log('Estudiantes cargados:', estudiantes);
    mostrarEstudiantes(estudiantes);
  } catch (error) {
    console.error('Error cargando estudiantes:', error);
  }
}

// Función para mostrar estudiantes (actualizar para usar el array)
function mostrarEstudiantes(estudiantes) {
  const tbody = document.getElementById('tablaEstudiantes');
  tbody.innerHTML = '';

  estudiantes.forEach(estudiante => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${estudiante.codigo}</td>
      <td>${estudiante.nombre}</td>
      <td>${estudiante.correo}</td>
      <td>${estudiante.programa}</td>
      <td>
        <button class="action-btn" onclick="editarEstudiante('${estudiante.id}')">Editar</button>
        <button class="action-btn" onclick="eliminarEstudiante('${estudiante.id}')">Eliminar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Función para editar estudiante (simplificada)
async function editarEstudiante(id) {
  // Lógica para editar (puedes implementar un modal o inline edit)
  alert('Editar no implementado aún. ID: ' + id);
}

// Función para eliminar estudiante
async function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro de eliminar este estudiante?')) {
    try {
      await window.deleteDoc(window.doc(window.db, 'estudiantes', id));
      cargarEstudiantes();
    } catch (error) {
      console.error('Error eliminando estudiante:', error);
    }
  }
}

// Función para filtrar estudiantes
function filtrarEstudiantes() {
  const filtro = document.getElementById('busqueda').value.toLowerCase();
  // Implementar filtrado en el array cargado
  // Por simplicidad, recargar y filtrar
  cargarEstudiantes(); // Luego filtrar en mostrarEstudiantes si es necesario
}

// Cargar estudiantes al inicio
window.onload = cargarEstudiantes;
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