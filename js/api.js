//getting dynamic search string from search bar
const loadSearchValue = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    searchField.value = '';
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data));
}
//Arrow function with error control
const displaySearchResult = mobileList => {
    if (mobileList.length === 0) {
        console.log('no result found');
    }
    else {
        const maxDisplay = mobileList.slice(0, 20);
        maxDisplay.forEach(displayMobile => {
            console.log(displayMobile);

        })
    }
}
