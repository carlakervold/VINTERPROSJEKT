
const db = firebase.firestore();
const bikes = db.collection("bikes");
const auth = firebase.auth();

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const shoppingCart = db.collection("bikesInCart")

const showBike = async (id) => {
  const svar = await bikes.doc(id).get();
  lagHTML(svar.data());
}


showBike(id); // Funksjonskall, gjør at funksjonen visDyr kjøres når siden lastes
const lagHTML = (bikes) => {
  secbikes.innerHTML +=`
  <div id="bikegrid">
    <p>Price: ${bikes.price}NOK</p>
    <p>Kilometers: ${bikes.km}km</p>
    <p>Platenumber: ${bikes.plate}</p>
    <p>Cubiccentimeters: ${bikes.cc}cc</p>
    <p>Horsepower: ${bikes.hp}hp</p>
    <p>Acceleration 0-100 km/t: ${bikes.acceleration}s</p>
<a href="bikebrand.html?brand=${bikes.brand}"><p>Brand: ${bikes.brand}</p> </a>
    <p>Year: ${bikes.year}</p>
  <a href="biketype.html?type=${bikes.type}"><p>Type: ${bikes.type}</p></a>
  <p>State: ${bikes.state}</p>
  <p>Seller: ${bikes.seller}</p>
  </div>

    `;
    //pictures in slideshow
    picture1.innerHTML +=`
    <img src="${bikes.picture}" style="width:100%">
          <div class="text">${bikes.bike_name}</div>`;

          picture2.innerHTML +=`
          <img src="${bikes.picture2}" style="width:100%">
                <div class="text">${bikes.bike_name}</div>`;

                picture3.innerHTML +=`
                <img src="${bikes.picture3}" style="width:100%">
                      <div class="text">${bikes.bike_name}</div>`;

                      bikedescription.innerHTML +=`
                      <p id="desc_text"> ${bikes.info} </p>

                      `;

                      bannertext.innerHTML +=`
                      <h3 id="bikename">${bikes.bike_name} ${bikes.year}</h3>`;




}


//slideshow javascript
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
//sjekke om brukeren er logget inn
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    buyBtn.innerHTML =`
    <button onclick="addToCart('${id}')">Order</button>`;

  } else {
    // No user is signed in.
    alert("You must be signed in to order bikes");
    buyBtn.innerHTML =`
    <a href="../login/login.html"> <button> Order</button> </a>`;
  }
});



function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
//add to shoppingcart function linked to button
const addToCart = async (id) => {
  var firebaseUser = firebase.auth().currentUser;
  console.log(firebaseUser.displayName);
  if (firebaseUser.displayName == null){
    alert("You must create a username");

  }
    else await shoppingCart.add({
        bikesId: id,
        f_uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        time: firebase.firestore.FieldValue.serverTimestamp(),

        
    }).then(alert("Bike was added to shoppingcart"));

    
}
