const programa = document.getElementById("programas");
var programación = firebase.database().ref("programación");
programación.on("value", function(snapshot) {
  showDiaReservas(snapshot.val());
});
const showDiaReservas = snap => {
  console.log(snap);
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
          elem => typeof elem === "string" || elem.disponible
        );
        const arrayPubli = disponibles.map(
          elem =>
            elem.disponible === "false" || elem === "string"
              ? `<span class="badge badge-primary badge-pill">${
                  elem.marca
                }</span>`
              : ""
        );
        const stringOption = arrayPubli.join("");
        const time = element.time;
        const number = time.slice(0, 3);
        // console.log(number)
        const icon = parseInt(number);
        return ` <li class="list-group-item " data-dia="${item}" data-index="${index}" data-programa="${
          element.programa
        }"  
        class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
        <div class=" bd-highlight">
          <div class="mr-auto bd-highlight "> ${
            icon > 16
              ? `<i class="fas fa-star"></i>`
              : `<i class="far fa-star"></i>`
          }${element.programa}</div>
          <div class="bd-highlight">
            <p class="card-text">
              <small class="text-muted">${element.time}</small>
            </p>
          </div>
          <div class="p-2 bd-highlight">
            <p class="card-text">
        ${stringOption}
            </p>
          </div>
        </div>
      </li>`;
      });
      programa.innerHTML += `<div class="col-12 col-md-2 mt-2 my-0">
    <div class="row">  
    <div class="col-12 p-0 bg-dark text-white text-center  border-r">
    <h3 class=""> ${item}</h3>
    </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
      <ul class="list-group">${arrayTemplateProgramming.join("")} 
    </ul>
     </div>
     </div>
     </div>`;
    }, resolve(document.getElementsByClassName("intervals")));
  });
  // promesa.then(res => addEventSelect(res)

// )
;
};