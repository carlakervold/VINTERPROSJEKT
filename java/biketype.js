const db = firebase.firestore();
const bikes = db.collection("bikes");

const url = new URL(window.location.href);
const type = url.searchParams.get("type");
const id = url.searchParams.get("id"); 

const selSort = document.querySelector("#selSort");

const sortBikes = async () => {
  secBikes.innerHTML = ``; // deletes currently shown bikes
  const answer = await bikes.orderBy("price", selSort.value).where("type", "==", type).get();
  for(const bikes of answer.docs){
      lagHTML(bikes.id, bikes.data());
  }
}

const showBike = async () => {
  const svar = await bikes.where("type", "==", type).get();
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
  <a href="biketype.html?type=${bikes.type}"><p>Type: ${bikes.type}</p>
  <a href="bikebrand.html?brand=${bikes.brand}"><p>Brand: ${bikes.brand}</p> </a>
  <p>State: ${bikes.state}</p>
  <p>Year: ${bikes.year}</p>
  <p>Seller: ${bikes.seller}</p>
  <p>Price: ${bikes.price}kr</p>
  </a>
  </section>
`;
brandHeader.innerHTML =`
<h1>ALL ${bikes.type} MOTORCYCLES</h1>
`;}
