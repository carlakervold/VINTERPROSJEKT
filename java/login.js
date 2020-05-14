// Upload elements to Bike database
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById('btnLogout');
const hide_after_login = document.getElementById('hide_after_login');
const displayhide = document.getElementById('displayhide');
const buyBtn = document.getElementById('buyBtn');
const cartHeader = document.getElementById('cartHeader');
const divtotalPrice = document.getElementById('divtotalPrice');

const db = firebase.firestore();

const secCart = document.querySelector("#secCart");
const bikes = db.collection("bikes");
const bikesInCart = db.collection("bikesInCart");
const order = db.collection("bikeOrders");
// Log in

btnLogin.addEventListener("click", e => {
    //get email & pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));


});

//signup

btnSignUp.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

})

//logout knappen
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    setTimeout(function () {
        location.reload();
    }, 500);
})


firebase.auth().onAuthStateChanged(firebaseUser => {
    //user is logged in
    if (firebaseUser) {
        console.log(firebaseUser);
        console.log(firebaseUser.uid);
        btnLogout.classList.remove("hide");
        loginStatus.innerHTML = ``;

        hide_after_login.classList.add('hide');

        usergreie.innerHTML = `
<p> Currently logged in with ${firebaseUser.email}</p>`;

        loginStatus.innerHTML += `   
           <h1>Hello, ${firebaseUser.displayName}</h1>`;

        cartHeader.innerHTML = `
        <h1>Shoppingcart</h1>`;
       
        //gets all bikes which match with user id 

        const getBikesCart = async () => {

            const answer = await bikesInCart.orderBy("time", "desc").where("f_uid", "==", firebaseUser.uid).get();

            let totalPrice = 0;

            for await (stock of answer.docs) {
                const bikesInCartId = stock.id;
                const bikesId = stock.data().bikesId;
                const bikesAnswer = await bikes.doc(bikesId).get();
                totalPrice += bikesAnswer.data().price;
                console.log(bikesAnswer);
                lagHTML(bikesId, bikesAnswer.data());
            }
            divtotalPrice.innerHTML = `<p>Total Price: ${totalPrice}kr</p>`;

        }



 //complete order bikes buy btn
        buyBtn.innerHTML = `
            <button id="test">Place order</button>
        `;

        var orderBtn = document.querySelector('#test');
        orderBtn.addEventListener('click', e => {
            console.log('buy button is clicked');
            buyBikes();
        });



        const buyBikes = async () => {
            console.log('run')
            const answer = await bikesInCart.orderBy("time", "desc").where("f_uid", "==", firebaseUser.uid).get();
            for await(const stock of answer.docs){
                const bikesId = stock.data().bikesId;
        
                const orderadd ={
                    bikesId: bikesId,
                    f_uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                }
                await order.add(orderadd);
                await bikesInCart.doc(stock.id).delete();
        
                
            }
            secCart.innerHTML = ``;
            alert("You have now placed your order")
            setTimeout(function () {
                location.reload();
            }, 1000);
           


        }

        


        const lagHTML = (id, bikes) => {
            secCart.innerHTML += `
         <section id="secBikesGrid">
         <a href="../buy/singlebike.html?id=${id}"> <h3>${bikes.bike_name} ${bikes.year}</h3>
         <img src=${bikes.picture} alt="Picture of ${bikes.bike_name}">
         <a href="../buy/biketype.html?type=${bikes.type}"><p>Type: ${bikes.type}</p>
         <a href="../buy/bikebrand.html?brand=${bikes.brand}"><p>Brand: ${bikes.brand}</p> </a>
         <p>State: ${bikes.state}</p>
         <p>Price: ${bikes.price}kr</p>
         </a>
         </section>
  `;    

  
        }
        displayhide.classList.remove('hide');

        getBikesCart();


        `  
`;
        //user is not logged in
    } else {
        console.log("not logged in")
        btnLogout.classList.add("hide");
        displayhide.classList.add("hide");
    }
})
// change displayname
var inpDisplay = document.getElementById('inpDisplay')
var setDisplayNameBtn = document.getElementById("setDisplayNameBtn");


setDisplayNameBtn.addEventListener('click', e => {
    var firebaseUser = firebase.auth().currentUser;
    if (firebaseUser) {
        if (inpDisplay.value == '') {
            console.log("enter a displayname");
        } else {
            firebaseUser.updateProfile({
                displayName: inpDisplay.value,
            }).then(function () {
                console.log("Updated your displayname");
                alert("Display name updated, wait for page to refresh")
                inpDisplay.value = ''
            })
        };

        setTimeout(function () {
            location.reload();
        }, 1000);
    }
})

