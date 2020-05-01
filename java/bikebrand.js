const db = firebase.firestore();
const bikes = db.collection("bikes");

const url = new URL(window.location.href);
const brand = url.searchParams.get("brand");
const id = url.searchParams.get("id"); 


const showBike = async () => {
  const svar = await bikes.where("brand", "==", brand).get();
  for(const mc of svar.docs){
    lagHTML(mc.id, mc.data());
  }
}

showBike(); // Funksjonskall, gjør at funksjonen visDyr kjøres når siden lastes

const lagHTML = (id, bikes) => {
  secBikes.innerHTML +=`
  <section id="secBikesGrid">
  <a href="singlebike.html?id=${id}"> <h3>${bikes.bike_name} ${bikes.year}</h3>
  <img src=${bikes.picture} alt="Picture of ${bikes.bike_name}">
  <a href="html/buy/type.html?type=${bikes.type}"><p>Type: ${bikes.type}</p>
  <a href="html/buy/bikebrand.html?brand=${bikes.brand}"><p>Brand: ${bikes.brand}</p> </a>
  <p>State: ${bikes.state}</p>
  <p>Year: ${bikes.year}</p>
  <p>Seller: ${bikes.seller}</p>
  <p>Price: ${bikes.price}kr</p>
  </a>
  </section>
`;
brandHeader.innerHTML =`
<h1>ALL OUR BIKES FROM ${bikes.brand}
`;}
