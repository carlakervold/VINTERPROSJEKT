const inpName = document.querySelector("#inpName");
const inpBrand = document.querySelector("#inpBrand");
const inpYear = document.querySelector("#inpYear");
const inpPicture = document.querySelector("#inpPicture");
const inpPicture2 = document.querySelector("#inpPicture2");
const inpPicture3 = document.querySelector("#inpPicture3");
const inpKm = document.querySelector("#inpKm");
const inpPrice = document.querySelector("#inpPrice");
const inpPlate = document.querySelector("#inpPlate");
const inpCC = document.querySelector("#inpCC");
const inpInfo = document.querySelector("#inpInfo");
const inpState = document.querySelector("#inpState");
const inpType = document.querySelector("#inpType");
const inpSeller = document.querySelector("#inpSeller");
const form = document.querySelector("form");


const db = firebase.firestore();
const bike_add = db.collection("bikes");


function sendBike(event) {
  event.preventDefault();
  const addBike = {
    bike_name: inpName.value,
    brand: inpBrand.value,
    year: Number(inpYear.value),
    picture: inpPicture.value,
    picture2: inpPicture2.value,
    picture3: inpPicture3.value,
    km: Number(inpKm.value),
    price: Number(inpPrice.value),
    plate: inpPlate.value,
    cc: Number(inpCC.value),
    info: inpInfo.value,
    acceleration: Number(inpHP.value),
    type: inpType.value,
    state: inpState.value,
    seller: inpSeller.value,
    hp: Number(inpHP.value),
  }
  bike_add.add(addBike).then(form.reset());
}
