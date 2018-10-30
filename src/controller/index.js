const btnReserva = document.getElementById("btnreserva");
btnReserva.addEventListener("click", e => {
  e.preventDefault();
  // const agencia = document.getElementById("nombreAgencia").value;
  const producto = document.getElementById("producto").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  // Get a reference to the database service
  const datosProducto = firebase.database().ref().child('producto');
  datosProducto.push({
    // nombre_agencia: agencia,
    producto: producto,
    fecha: fecha,
    hora: hora
  })
});
