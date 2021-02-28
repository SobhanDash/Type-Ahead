const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities= [];

//fetches the data and converts it
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data)) 

//return an array of matches
function findMatches(wordsToMatch, cities){
    return cities.filter(place => {
        //we need to see if the city or state matches the wordsToMatch
        const regex = new RegExp(wordsToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    });
}

//fuction thart returns commas for numbers
function numWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//called whenever the user enters in the search tab
function displayMatches(){
    //calls the findMatches function
    const matchArray = findMatches(this.value, cities);
    //returns the string with city, state and population
    //map itsel returns an array so the .join('') converts it into a string
    const html = matchArray.map(place => {
        //for highlighting the name
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class='name'>${cityName}, ${stateName}</span>
            <span class='population'>${numWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    //displays the match on the screen
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)