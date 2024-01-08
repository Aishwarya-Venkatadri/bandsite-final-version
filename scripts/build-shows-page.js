{/* <div class="shows__details">
<ul class="shows__info">
    <li class="shows__info-head">Date</li>
    <li class="shows__listitems">Mon Sep 06 2021</li>
    <li class="shows__info-head">Venue</li>
    <li class="shows__listitems">Ronald Lane</li>
    <li class="shows__info-head">Location</li>
    <li class="shows__listitems">San Francisco, CA</li>
    <li class="shows__btn shows--btnmod"><a href="#">BUY TICKETS</a></li>
</ul>
</div> */}

// shows=[
//     {
//         date: 'Mon sep 06 2021',
//         venue: 'Ronald Lane',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     },
//     {
//         date: 'Tue Sep 21 2021',
//         venue: 'Pier 3 East',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     },
//     {
//         date: 'Fri Oct 15 2021',
//         venue: 'View Lounge',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     },
//     {
//         date: 'Sat Nov 06 2021',
//         venue: 'Hyatt Agency',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     },
//     {
//         date: 'Fri Nov 26 2021',
//         venue: 'Moscow Center',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     },
//     {
//         date: 'Wed Dec 19 2021',
//         venue: 'Press Club',
//         location: 'San Francisco, CA',
//         purchase: 'BUY TICKETS'
//     }];
// let ancestorEl = document.querySelector('.shows__details');
// for(let i=0; i<shows.length; i++){
// let parentEl = document.createElement('ul');
// parentEl.classList.add('shows__info');
// let dateEl = document.createElement('li');
// dateEl.classList.add('shows__info-head');
// dateEl.classList.add('shows__listitems-mod')
// dateEl.innerText = 'DATE';
// // console.log(dateEl);
// parentEl.appendChild(dateEl);
// let dateChild = document.createElement('li');
// dateChild.classList.add('shows__listitems');

// dateChild.innerText = shows[i].date;
// // console.log(dateChild);
// parentEl.appendChild(dateChild);
// let venueEl = document.createElement('li');
// venueEl.classList.add('shows__info-head');
// venueEl.classList.add('shows__listitems-mod')
// venueEl.innerText = 'VENUE';
// parentEl.appendChild(venueEl);
// let venueChild = document.createElement('li');
// venueChild.classList.add('shows__listitems');
// venueChild.innerText= shows[i].venue;
// // console.log(venueChild);
// parentEl.appendChild(venueChild);
// ancestorEl.appendChild(parentEl);

// let locEl = document.createElement('li');
// locEl.classList.add('shows__info-head');
// locEl.classList.add('shows__listitems-mod')
// locEl.innerText = 'LOCATION';
// parentEl.appendChild(locEl);

// let locChild= document.createElement('li');
// locChild.classList.add('shows__listitems');
// locChild.innerText = shows[i].location;
// parentEl.appendChild(locChild);

// let buyOption = document.createElement('li');
// buyOption.classList.add('shows__btn');
// buyOption.classList.add('shows--btnmod');
// let buyLink = document.createElement('a');
// buyLink.setAttribute('href', '#');
// buyLink.innerText = shows[i].purchase;
// buyOption.appendChild(buyLink);
// parentEl.appendChild(buyOption);
// }
class BandSiteAPI {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseURL = "https://project-1-api.herokuapp.com/showdates?api_key=";
    }
    async getShows() {
      const showsResponse = await axios.get(`${this.baseURL}${this.apiKey}`);
     return showsResponse;
    }
  }

  const bandSite = new BandSiteAPI('554905f2-f3c0-487e-93f9-f44415167133');
  bandSite.getShows();
  let ancestorEl = document.querySelector('.shows__details');
async function dsiplayShows(){

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

    const shows = await bandSite.getShows();
    const showsArray = shows.data;
    console.log(showsArray);
    for(let i=0;i<showsArray.length; i++){
        let parentEl = document.createElement('ul');
        parentEl.classList.add('shows__info');
        let dateEl = document.createElement('li');
        dateEl.classList.add('shows__info-head');
        dateEl.classList.add('shows__listitems-mod')
        dateEl.innerText = 'DATE';
        // console.log(dateEl);
        parentEl.appendChild(dateEl);
        let dateChild = document.createElement('li');
        dateChild.classList.add('shows__listitems');
        
        dateChild.innerText = formatDate(showsArray[i].date);
        // console.log(dateChild);
        parentEl.appendChild(dateChild);
        let venueEl = document.createElement('li');
        venueEl.classList.add('shows__info-head');
        venueEl.classList.add('shows__listitems-mod')
        venueEl.innerText = 'VENUE';
        parentEl.appendChild(venueEl);
        let venueChild = document.createElement('li');
        venueChild.classList.add('shows__listitems');
        venueChild.innerText= showsArray[i].place;
        // console.log(venueChild);
        parentEl.appendChild(venueChild);
        ancestorEl.appendChild(parentEl);
        
        let locEl = document.createElement('li');
        locEl.classList.add('shows__info-head');
        locEl.classList.add('shows__listitems-mod')
        locEl.innerText = 'LOCATION';
        parentEl.appendChild(locEl);
        
        let locChild= document.createElement('li');
        locChild.classList.add('shows__listitems');
        locChild.innerText = showsArray[i].location;
        parentEl.appendChild(locChild);
        
        let buyOption = document.createElement('li');
        buyOption.classList.add('shows__btn');
        buyOption.classList.add('shows--btnmod');
        let buyLink = document.createElement('a');
        buyLink.setAttribute('href', '#');
        buyLink.innerText = 'BUY TICKETS';
        buyOption.appendChild(buyLink);
        parentEl.appendChild(buyOption);
    }
}
dsiplayShows();
