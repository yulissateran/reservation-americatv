const btnModal = document.getElementById("btnModal");
const itemsSelects = [];
const programa = document.getElementById("programas");
btnModal.addEventListener('click',()=>{
  const arrayItemsReservados = itemsSelects.map((elem)=>
`<li class="list-group-item">
  <div class="d-flex bd-highlight m-1">
    <div class="p-2 flex-fill bd-highlight">
      <small class="text-muted">Programa: </small><br>${elem.programa}
    </div>
    <div class="p-2 flex-fill bd-highlight m-1">
      <small class="text-muted">Fecha: </small><br>${elem.día}
    </div>
    <div class="p-2 flex-fill bd-highlight m-1">
      <small class="text-muted">Hora: </small><br>${elem.name}
    </div>
    <div class="p-2 flex-fill bd-highlight m-1">
      <small class="text-muted">Monto: </small><br>${elem.recarga}
    </div>
  </div>
</li>`)
const templateReservas= arrayItemsReservados.join('');
document.getElementById('modalBody').innerHTML ='';
  document.getElementById('modalBody').innerHTML += `<ul class="list-group">${templateReservas}
</ul>`;
})
const infoUser = {
  name: "Marcos Rojas",
  nameEmpresa: "Circus",
  producto: "Coca Cola"
};

var programación = firebase.database().ref("programación");
programación.on("value", function(snapshot) {
  showDia(snapshot.val());
});
addInterval = () => {
  //   let ruta= '';
  const interval = {
    name: event.target.value,
    monto: event.currentTarget.getAttribute("data-monto"),
    recarga: event.currentTarget.getAttribute("data-recarga"),
    programa: event.currentTarget.getAttribute("data-programa"),
    día: event.currentTarget.getAttribute("data-día")
  };
  //  firebase.database().ref("programación/"+ interval.día +'/programming').on('value', (snapshot) => {
  //    const _snapshot= snapshot.val()
  //    console.log(_snapshot)
  //    _snapshot.forEach((element, i)=>{element.publicidad.forEach((elem,ind)=>{elem.name === interval.name? ruta = `${i}/publicidad/${ind}` : ruta})});
  //})
  // firebase.database().ref("programación/"+ interval.día +'/programming/' + ruta).update({disponible: 'false', marca: infoUser.producto})
  // console.log('ruta',ruta)
  itemsSelects.push(interval);
  console.log("items", itemsSelects);
};

addEventSelect = elements => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("change", addInterval, false);
  }
};
const showDia = snap => {
  const promesa = new Promise((resolve, reject) => {
    const dias = [
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
      "domingo"
    ];
    dias.forEach(item => {
      const programming = snap[item].programming;
      const arrayTemplateProgramming = programming.map((element, index) => {
        const sele = element.publicidad;
        const disponibles = sele.filter(
          elem => typeof elem === "string" || elem.disponible !== "false"
        );
        const arrayPubli = disponibles.map(
          elem =>
            `<option value="${elem.name || elem}">${elem.name || elem}</option>`
        );
        const stringOption = arrayPubli.join("");
        const select = `<select data-programa="${
          element.programa
        }" data-día="${item}" data-monto="${
          element.monto
        }" data-recarga="${element.recarga || 00}" class="intervals">     
        <option value="" disabled selected>Seleccione</option>
        ${stringOption}</select>`;
        return ` <li class="list-group-item " data-dia="${item}" data-index="${index}" data-programa="${
          element.programa
        }"  
        class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
        <div class=" bd-highlight ">
          <div class="mr-auto bd-highlight ">${element.programa}</div>
          <div class="bd-highlight">
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
      </li>`;
      });
      programa.innerHTML += `
    <div class="col-12 col-md-2 mt-2 my-0">
      <div class="row">  
        <div class="col-12 p-0 bg-dark text-white text-center  border-r">
          <h3 class=""> ${item}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 p-0">
          <ul class="list-group">${arrayTemplateProgramming.join("")}</ul>
        </div>
     </div>
    </div>`;
    }, resolve(document.getElementsByClassName("intervals")));
  });
  promesa.then(res => addEventSelect(res));
};

