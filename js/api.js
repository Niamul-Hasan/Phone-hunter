//getting dynamic search string from search bar
const loadSearchValue = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldText = searchField.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
  searchField.value = ''; //clearing search field
  fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResult(data.data));
}
//Arrow function to display card with error control
const displaySearchResult = mobileList => {
  //if no match found then display only no result message
  if (mobileList.length === 0) {
    document.getElementById('noResult-message').style.display = 'block';
    document.getElementById('mobile-display').innerHTML = '';
    document.getElementById('display-details').innerHTML = '';
  }
  //if any match found then message will be removed and card section will show result
  else {
    document.getElementById('noResult-message').style.display = 'none';
    //maximum 20 result will be shown by card section
    const maxDisplay = mobileList.slice(0, 20);
    const mobileDisplayContainer = document.getElementById('mobile-display');
    mobileDisplayContainer.textContent = '';
    maxDisplay.forEach(displayMobile => {
      const displayDiv = document.createElement('div');
      displayDiv.innerHTML = `
           <div class="col">
           <div class="card h-100">
             <img src="${displayMobile.image}" class="card-img-top w-50 mx-auto pt-4" alt="...">
             <div class="card-body">
               <h3 class="card-title">${displayMobile.phone_name}</h3>
               <h5> Brand : ${displayMobile.brand} </h5>
               <button onclick="displayDetails('${displayMobile.slug}')" id="details" class="btn details">Details</button>
             </div>
           </div>
         </div>
           `
      mobileDisplayContainer.appendChild(displayDiv);  //showing the search result
    })
  }
}
// arrow function to display details by mobile id
const displayDetails = (mobileId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => loadDetailsFromApi(data.data))

}
//loading mobile details by id
const loadDetailsFromApi = (details) => {

  const detailsContainer = document.getElementById('display-details');
  detailsContainer.textContent = '';
  document.getElementById('display-details').style.display = 'block';
  const div = document.createElement('div');
  div.innerHTML = `<div class="">
    <h2>Mobile Details</h2>
    <img src="${details.image}" class="card-img-top w-25 mx-auto pt-4" alt="...">
    <div class="card-body">
      <h3 class="card-title">${details.name}</h3>
      <h5>${details.releaseDate}</h5>
      <h5> Brand : ${details.brand} </h5>
      <h5> MainFeatures : </h5>
      <ul>
      <li><h6>chipSet:</h6> ${details.mainFeatures.chipSet}</li>
      <li><h6>displaySize:</h6>  ${details.mainFeatures.displaySize}</li>
      <li><h6>memory:</h6> ${details.mainFeatures.memory}</li>
      </ul>
      <h5> Others : </h5>
      <ul>
      <li><h6>Bluetooth</h6>${details.others.Bluetooth}</li>
      <li><h6>GPS</h6>${details.others.GPS}</li>
      <li><h6>WLAN</h6>${details.others.WLAN}</li>
      </ul>

      <button onclick="removeDetails()" id="remove" class="btn details bg-danger text-white">Cancel</button>
    </div>
  </div>`
  detailsContainer.appendChild(div);  //showing the details
}

//if needed, details card can be canceled
const removeDetails = () => {
  document.getElementById('display-details').style.display = 'none';
}