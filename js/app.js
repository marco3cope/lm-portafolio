const hoy = new Date();
const texto = hoy.toLocaleDateString("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
document.getElementById("fecha").textContent = "Hoy es " + texto;
