const programa = document.getElementById("programas")
var starCountRef = firebase.database().ref('programación');
starCountRef.on('value', function (snapshot) {
  updateStarCount(snapshot.val());
});
const updateStarCount = (snap) => {
  const dias = ["lunes", "martes", "miercoles", "jueves",'viernes', "sabado", "domingo"]
  dias.forEach((item) => {

  


    const programming = snap[item].programming;   console.log(programming);
   const arrayTemplateProgramming = programming.map((element, index) => {

    const sele = element.publicidad
  const arrayPubli = sele.map((elem) => `<option value="${elem}">${elem}</option>`)
  const stringOption = arrayPubli.join('');
  const select = `<select id="intervals">${stringOption}</select>`;

     return  ` <li class="list-group-item" data-dia="${item}" data-index="${index}" data-programa="${element.programa}"  
      class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
      <div class=" bd-highlight mb-3">
        <div class="mr-auto p-2 bd-highlight ">${element.programa}</div>
        <div class="p-2 bd-highlight">
          <p class="card-text">
            <small class="text-muted">${element.time}</small>
          </p>
        </div>
        <div class="p-2 bd-highlight">
          <p class="card-text">
          ${select}
          </p>
        </div>
      </div>
    </li>`
    });
    
    programa.innerHTML += `  <div class="col-12 col-md-3 mt-2">
  <div class="row">  
  <div class="col-12 ">
  <h1 class="bg-dark text-white rounded text-center"> ${item}</h1>
  </div>
  </div>
  <div class="row">
    <div class="col-12">
    <ul class="list-group">${arrayTemplateProgramming.join('')} 
  </ul>
   </div>
   </div>
   </div>`
  })
  // console.log(data);
}


const getProgram = () => {

  const day = event.currentTarget.getAttribute("data-dia")
  const program = event.currentTarget.getAttribute("data-programa")
  const index = event.currentTarget.getAttribute("data-index")

  // console.log(day , program);

  var starCountRef = firebase.database().ref('programación/' + day);
  starCountRef.on('value', function (snapshot) {
    const progra = snapshot.val().programming

    const selectprogram = progra.filter((element, i) => element.programa === program && i == index)

    showmodal(selectprogram)
    // console.log(selectprogram);

  });
}



const showmodal = (selectprogram) => {
  console.log(selectprogram);
  const sele = selectprogram[0].publicidad
  const arrayPubli = sele.map((elem) =>
    `<option value="${elem}">${elem}</option>`)
  const stringOption = arrayPubli.join('');
  const select = `<select id="intervals">${stringOption}</select>`;
  document.getElementById("body").innerHTML = '';
  document.getElementById("body").innerHTML +=
    ` <div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"  >
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${selectprogram[0].programa}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" id="modalBody">
    <div>   
    <p>Espacios Disponibles</p>
     ${select}
     <p>${selectprogram[0].monto} </p>
  </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>`
  // , document.getElementById().innerHTML += select;
}





// const btnReserva = document.getElementById("btnreserva");
// const formulario = document.getElementById("formulario");

// btnReserva.addEventListener("click", e => {
//   e.preventDefault();
//   // const agencia = document.getElementById("nombreAgencia").value;
//   const producto = document.getElementById("producto").value;
//   const fecha = document.getElementById("fecha").value;
//   const hora = document.getElementById("hora").value;
//   // Get a reference to the database service
//   const datosProducto = firebase.database().ref().child('producto');
//   datosProducto.push({
//     // nombre_agencia: agencia,
//     producto: producto,
//     fecha: fecha,
//     hora: hora
//   })
// });




// 8const writeHorario = (data) => {
//   console.log(data[0]);
// }
// const callFirebase  = firebase.database().ref('programación')
// .on('child_added' , snapshop =>{
//   const data = snapshop.val()
//   writeHorario(data)
//   // console.log(snapshop.val());

// } )


