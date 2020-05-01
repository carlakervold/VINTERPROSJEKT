
// Upload elements to Bike database

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");

// Log in

btnLogin.addEventListener("click", e => {
    //get email & pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth;

    //sign in
   const promise = auth.signInWithEmailAndPassword(email, pass);
   promise.catch(e => console.log(e.message));


})




