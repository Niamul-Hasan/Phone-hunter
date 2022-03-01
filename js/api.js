const loadSearchValue = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = mobileList => {
    if (mobileList.length === 0) {
        console.log('no result found');
    }
    else {
        const maxDisplay = mobileList.slice(0, 20);
        console.log(maxDisplay);
    }
}
