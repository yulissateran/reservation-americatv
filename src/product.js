const info  = document.getElementById("info");
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
    callFirebaseAllPosts(user.uid)
    // console.log(user.uid)
       }
     });
}
const writeFirebas = (data) =>{
  info.innerHTML += `
  <h1>${data.userName}</h1>
  <div class="custom-control custom-radio">
  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
  <label class="custom-control-label" for="customRadio1">${data.productos[0]}</label>
</div>
<div class="custom-control custom-radio">
  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
  <label class="custom-control-label" for="customRadio2">${data.productos[1]}</label>
</div>
<div class="custom-control custom-radio">
  <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
  <label class="custom-control-label" for="customRadio3">${data.productos[2]}</label>
</div>
<button>Continuar</button>
 
`
}
const callFirebaseAllPosts = (uid) => {
  let refPost = (firebase.database().ref().child('user'));
refPost.on('value' , (snap) => {
  writeFirebas(snap.val()[uid])
  })
}
