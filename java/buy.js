const secNewBikes = document.querySelector("#secNewBikes");

const db = firebase.firestore();
const bikes = db.collection("bikes");
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

const loadBikes = async () => {
    secNewBikes.innerHTML = ``; // Sletter innholdet i secDyr.
    const answer = await bikes.get();
    for(const bikes of answer.docs){
        lagHTML(bikes.id, bikes.data());
    }
}

loadBikes(); // Funksjonskall, gjør at funksjonen hentAlleDyr kjøres når siden lastes

const lagHTML = (id, bikes) => {
    secNewBikes.innerHTML += `

        <div id=secNewBikesGrid>
            <a href="html/buy/singlebike.html?id=${id}">
            <h3>${bikes.bike_name} ${bikes.year}</h3>
            <img src=${bikes.picture} alt="Picture of ${bikes.bike_name}">
            <a href="html/buy/biketype.html?type=${bikes.type}"><p>Type: ${bikes.type}</p> </a>
            <a href="html/buy/bikebrand.html?brand=${bikes.brand}"><p>Brand: ${bikes.brand}</p> </a>
            <p>State: ${bikes.state}</p>
            <p>Year: ${bikes.year}</p>
            <p>Seller: ${bikes.seller}</p>
            <p>Price: ${bikes.price}kr</p>
              </a>        
        </div>

    `;
}


const loadUsed = async () => {
    secNewBikes.innerHTML = ``; // Sletter innholdet i secDyr.
    typeDesc.innerHTML = ``;
    const answer = await bikes.where("state", "==", "Used").get();
    for(const bikes of answer.docs){
        lagHTML(bikes.id, bikes.data());
    }

    typeDesc.innerHTML = `ALL USED BIKES`;
}
const loadNew = async () => {
    secNewBikes.innerHTML = ``; // Sletter innholdet i secDyr.
    typeDesc.innerHTML = ``;
    const answer = await bikes.where("state", "==", "New").get();
    for(const bikes of answer.docs){
        lagHTML(bikes.id, bikes.data());
    }

    typeDesc.innerHTML = `ALL NEW BIKES`;
}

const selSort = document.querySelector("#selSort");

const sortBikes = async () => {
    secNewBikes.innerHTML = ``; // Sletter innholdet i secDyr.
    const answer = await bikes.orderBy("price", selSort.value).get();
    for(const bikes of answer.docs){
        lagHTML(bikes.id, bikes.data());
    }
}