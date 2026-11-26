// alta.js · Validación a medida del formulario de alta en la red del centro (UT 4)

const nacimiento = document.getElementById('nacimiento');
const clave = document.getElementById('clave');
const clave2 = document.getElementById('clave2');
const EDAD_MINIMA = 16;

// Calcula los años cumplidos hoy por alguien nacido en la fecha aaaa-mm-dd
function calcularEdad(textoFecha) {
  const [anio, mes, dia] = textoFecha.split('-').map(Number);
  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  // Si este año todavía no ha llegado su cumpleaños, resto uno
  const yaCumplio = hoy.getMonth() + 1 > mes || (hoy.getMonth() + 1 === mes && hoy.getDate() >= dia);
  if (!yaCumplio) edad--;
  return edad;
}

// Edad mínima: el HTML no sabe calcular edades, así que lo hago con setCustomValidity
function comprobarEdad() {
  nacimiento.setCustomValidity('');
  if (!nacimiento.value) return; // vacío: ya avisa required
  if (calcularEdad(nacimiento.value) < EDAD_MINIMA) {
    nacimiento.setCustomValidity(`Tienes que tener al menos ${EDAD_MINIMA} años para darte de alta.`);
  }
}
nacimiento.addEventListener('input', comprobarEdad);
nacimiento.addEventListener('change', comprobarEdad);

// La fecha de nacimiento no puede ser posterior a hoy
const hoy = new Date();
nacimiento.max = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

// Las dos contraseñas tienen que coincidir
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden.' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);
