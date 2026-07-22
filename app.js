// ===================================================
//                  Proyecto GYM
// ===================================================

// Elementos del DOM

const planesdiv = document.querySelector("#planes");
const planElegido = document.querySelector("#planElegido");
const selectMeses = document.querySelector("#meses");

//JSON
let planes = [];

//Carga de Planes en JSON
fetch("planes.json")
  .then((response) => response.json())
  .then((datos) => {
    planes = datos;
    planes.forEach((plan) => {
      const tarjeta = document.createElement("div");
      tarjeta.innerHTML = `<h3>${plan.nombre}</h3>
            <p>Precio: $${plan.precio}</p>
            <p>Beneficios: ${plan.beneficios.join(", ")}</p>`;
      const boton = document.createElement("button");
      boton.textContent = "Contratar Plan";
      boton.dataset.nombre = plan.nombre;

      tarjeta.appendChild(boton);
      planesdiv.appendChild(tarjeta);
    });
  })
  .catch((error) => {
    console.log("Error al cargar los planes: " + error);
  });

//listener delegado
planesdiv.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // Verifica si el elemento clickeado es un botón
    const nombrePlan = event.target.dataset.nombre; // Obtiene el nombre del plan del atributo de datos del botón
    const planElegidoObj = planes.find((plan) => plan.nombre === nombrePlan); // Busca el objeto del plan correspondiente al nombre
    const meses = Number(selectMeses.value); // Obtiene el valor seleccionado del select y lo convierte a número
    let precioFinal = planElegidoObj.precio * meses; // Calcula el precio final multiplicando el precio del plan por la cantidad de meses
    if (meses >= 12) {
      precioFinal = precioFinal * 0.85;
      planElegido.textContent = `Has elegido el plan ${nombrePlan} por ${meses} meses. Precio final: $${precioFinal} (Se aplicó un descuento del 15% por contratar 12 meses o más)`; // Muestra un mensaje indicando que se aplicó un descuento
    } else {
      planElegido.textContent = `Has elegido el plan ${nombrePlan} por ${meses} meses. Precio final: $${precioFinal}`; // Muestra el resumen del plan elegido en el contenedor correspondiente
    }

    Toastify({
      text: `¡Contrataste el plan ${nombrePlan}!`,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#4CAF50" },
    }).showToast();
  }
});
