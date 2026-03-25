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

async function cargarEstudiantes() {
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, 'estudiantes'));
    const estudiantes = [];
    querySnapshot.forEach((doc) => {
      estudiantes.push({ id: doc.id, ...doc.data() });
    });
    mostrarEstudiantes(estudiantes);
  } catch (error) {
    console.error('Error cargando estudiantes:', error);
  }
}

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

async function editarEstudiante(id) {
  alert('Editar no implementado aún. ID: ' + id);
}

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

function filtrarEstudiantes() {
  const query = document.getElementById('busqueda').value.toLowerCase();
  const rows = document.querySelectorAll('#tablaEstudiantes tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}

// Cargar estudiantes al inicio
window.onload = cargarEstudiantes;
// Asignar funciones globales para el HTML
window.guardarEstudiante = guardarEstudiante;
window.cargarEstudiantes = cargarEstudiantes;
window.mostrarEstudiantes = mostrarEstudiantes;
window.editarEstudiante = editarEstudiante;
window.eliminarEstudiante = eliminarEstudiante;
window.filtrarEstudiantes = filtrarEstudiantes;