const registerform = document.querySelector(".register");
const buttonRegisterForm = document.querySelector('.buttonRegisterForm');
const loginform = document.querySelector('.login');
buttonRegisterForm.addEventListener('click', () => {
    registerform.style.display = 'block';
    loginform.style.display = 'none';
})
// register
// const userName = document.getElementById('.userName');
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const buttonRegister = document.getElementById("registers");

// login 
const userEmailLogin = document.getElementById("userEmailLogin");
const userPasswordLogin = document.getElementById("userPasswordLogin");

const buttonLogin = document.querySelector('.buttonLogin');
const  buttonReturn = document.getElementById('return');
const userAgencia = document.getElementById("userAgencia");

buttonReturn.addEventListener('click' , () => {
    registerform.style.display = 'none';
    loginform.style.display = 'block';
})
buttonLogin.addEventListener('click', () => {
    const emailValue = userEmailLogin.value;
    const passwordValue = userPasswordLogin.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            window.location = 'product.html'
        })
        .catch((error) => {
            console.log("error de firebase > Codigo > " + error.code);
            console.log("error de firebase > Mensaje >" + error.message)
        });
})
const post = document.getElementById("list")
const  añadir = document.getElementById("add")
const arrProducts =[];


añadir.addEventListener('click',()=>{

    var text = document.getElementById("idea").value;
    arrProducts.push(text)
    // console.log(arrProducts);
  const list = document.createElement('li')
  
  list.innerHTML=text
  post.appendChild(list)

})

buttonRegister.addEventListener('click', ()=> {
registerfirebase(userEmail.value , userPassword.value , userAgencia.value , arrProducts ) 

    // console.log(post.value); 
})

const registerfirebase = (email , password , agencia , product) => {
    console.log(agencia);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      createUserInBd(result, agencia,product);
    })
} 

const createUserInBd = (objectUser, name , productos) => {
    // if (!objectUser.user.displayName) {
      firebase.database().ref('user/' + objectUser.user.uid).set({
        userId: objectUser.user.uid,
        userName: name,
        userEmail: objectUser.user.email,
        productos : productos
        // isNewUser: objectUser.additionalUserInfo.isNewUser,
        // providerId: objectUser.additionalUserInfo.providerId,
        // emailVerified: false
      })
    // } else {
    //   firebase.database().ref('users/' + objectUser.user.uid).set({
    //     userId: objectUser.user.uid,
    //     userName: objectUser.user.displayName,
    //     userEmail: objectUser.user.email,
    //     isNewUser: objectUser.additionalUserInfo.isNewUser,
    //     userPhotoUrl: objectUser.user.photoURL,
    //     providerId: objectUser.additionalUserInfo.providerId,
    //     emailVerified: false
    //   })
    .then(() => {
window.location = 'product.html'
        // (firebase.database().ref('/user/' + objectUser.user.uid).once('value', (snapshot) => {
        //   const displayName = snapshot.val().userName;
        // //   if (displayName) {
        // //     // window.directionalUrl('../src/view/wall.html');
        // //   }
        // })
        // )

              

      });

    }

    // createUserInd()
    // return objectUser;
// window.onload = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {

//             // userName.innerHTML = `${user.displayName}`;
//             // userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
//             // if (userName.innerHTML == 'null') {
//             //     userName.innerHTML = `${user.email}`;
//             //     userImage.innerHTML = `<img src="https://cdn.icon-icons.com/icons2/1540/PNG/128/cinterior150_107120.png" alt="user" class="profile-photo" />`;                ;
//             // }
//             writeUserDataFirebase(user.uid, user.displayName, user.email, user.photoURL);
//             //  writeNewPost(user.uid ,user.displayName , user.photoURL , post.value);

//             // callFirebaseAllPosts(user.uid)
//         }
//         else {
//             console.log('no esta logueado');
//         }
//         console.log("User > " + JSON.stringify(user));
//     });
// }
// const writeUserDataFirebase = (userId, name, email, imageUrl) => {
//     firebase.database().ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
        
//     });
// }

// buttonRegister.addEventListener('click', () => {

//     const userEmailvalue = userEmail.value;
//     const userPasswordvalue = userPassword.value;
//     const userPasswordVerificationvalue = userPasswordVerification.value;
//     // // console.log(userNameValue)
//     // const userLastnameValue = userLastname.value; 
//     if (userPasswordvalue.length >= 6) {
//       if (userPasswordvalue == userPasswordVerificationvalue) {
//         firebase.auth().createUserWithEmailAndPassword(userEmailvalue, userPasswordvalue)
//           .then(() => {
//             console.log("usuario creado");
//             window.location = 'inicio.html';
//           })
//           .catch((error) => {
//             console.log("error de firebase > Codigo > " + error.code);
//             console.log("error de firebase > Mensaje >" + error.message)
//           });
//       }
//     }
//     else {
//      
//     }
//   })