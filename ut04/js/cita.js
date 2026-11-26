// cita.js · Validación a medida del formulario de cita del taller BiciRuta (UT 4)
// Se carga con defer, así que cuando se ejecuta el HTML ya existe.

// Referencias a los campos que vamos a controlar
const fecha = document.getElementById('fecha');
const quiereCuenta = document.getElementById('quiero-cuenta');
const cuenta = document.getElementById('cuenta');
const clave = document.getElementById('clave');
const clave2 = document.getElementById('clave2');
const averia = document.getElementById('averia');
const contador = document.getElementById('contador');

// Convierte un objeto Date en texto aaaa-mm-dd, el formato que entiende <input type="date">
function aFechaISO(d) {
  const anio = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() empieza en 0
  const dia = String(d.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

// Regla 1 · Fecha mínima: mañana. Si eligen una fecha anterior, el navegador
// muestra su propio mensaje porque el valor queda por debajo de min.
const manana = new Date();
manana.setDate(manana.getDate() + 1);
fecha.min = aFechaISO(manana);

// Regla 2 · Domingos cerrados
function comprobarFecha() {
  fecha.setCustomValidity(''); // primero limpio el error anterior
  if (!fecha.value) return;    // si está vacío, ya se encarga required

  // Separo aaaa-mm-dd y creo la fecha en hora local. new Date("2026-10-25")
  // se interpretaría en UTC y podría darme el día anterior.
  const [anio, mes, dia] = fecha.value.split('-').map(Number);
  const elegida = new Date(anio, mes - 1, dia);

  if (elegida.getDay() === 0) { // 0 = domingo
    fecha.setCustomValidity('El taller cierra los domingos.');
  }
}
fecha.addEventListener('input', comprobarFecha);
fecha.addEventListener('change', comprobarFecha);

// Regla 3 · Cuenta opcional: el fieldset empieza con disabled (en el HTML).
// Al marcar la casilla se habilita y el foco va a la contraseña.
quiereCuenta.addEventListener('change', () => {
  cuenta.disabled = !quiereCuenta.checked;
  if (quiereCuenta.checked) {
    clave.focus();
  }
});

// Regla 4 · Contraseñas que coinciden (el mínimo de 8 caracteres con letras
// y números lo comprueba el pattern del HTML)
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden.' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);

// Contador de caracteres de la avería
function actualizarContador() {
  contador.textContent = `${averia.value.length} / 500 caracteres`;
}
averia.addEventListener('input', actualizarContador);
actualizarContador();
