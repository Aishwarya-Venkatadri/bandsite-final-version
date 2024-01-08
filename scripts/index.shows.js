// "api_key": "554905f2-f3c0-487e-93f9-f44415167133"
// https://project-1-api.herokuapp.com/comments?api_key=554905f2-f3c0-487e-93f9-f44415167133

// Class defn
class BandSiteAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://project-1-api.herokuapp.com/comments?api_key=";
  }
  async getComments() {
    const comments = await axios.get(`${this.baseURL}${this.apiKey}`);
    return comments.data;
  }
  async postComments(newComments) {
    await axios.post(`${this.baseURL}${this.apiKey}`, newComments);
  }
}

// Target the form, add an event and call a function to prepare for the new input
const formElement = document.getElementById("comment-form");
let parentEL = document.querySelector(".comment-section");

const bandSite = new BandSiteAPI("554905f2-f3c0-487e-93f9-f44415167133");
// console.log(bandSite);

async function displayComments() {
  const commentResponse = await bandSite.getComments();
  // console.log(commentResponse);

  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  // <div class="comment-section__wrapper">
  //     <div class="comment-section__icon"></div>
  //     <div class="comment-section__container">
  //     <div class="comment-section__name-container">
  //       <div class="comment-section__username">Aishwarya</div>
  //       <div class="comment-section__date">19/12/1994</div>
  //     </div>
  //     <div class="comment-section__comment">What an amazing world to be in! I am in for a ride. etur veniam impedit nesciunt, rerum error! Expedita exercitationem nostrum eius dolore doloremque quasi nihil illum odio?</div>
  //    </div>
  //   </div>
  commentResponse.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  for (let i = 0; i < commentResponse.length; i++) {
    let wrapperContainer = document.createElement("div");
    wrapperContainer.classList.add("comment-section__wrapper"); //parent-container
    parentEL.appendChild(wrapperContainer);
    let userIcon = document.createElement("div");
    userIcon.classList.add("comment-section__icon");
    wrapperContainer.appendChild(userIcon);

    let superContainer = document.createElement("div"); //parent container for name-container, comment
    superContainer.classList.add("comment-section__container");

    let nameContainer = document.createElement("div"); //-- container for name and date only
    nameContainer.classList.add("comment-section__name-container");

    let userName = document.createElement("div");
    userName.classList.add("comment-section__username");
    userName.innerText = commentResponse[i].name;
    nameContainer.appendChild(userName);

    let dateChild = document.createElement("div");
    dateChild.classList.add("comment-section__date");
    dateChild.innerText = formatDate(commentResponse[i].timestamp);
    nameContainer.appendChild(dateChild);
    superContainer.appendChild(nameContainer);

    let commentChild = document.createElement("div");
    commentChild.classList.add("comment-section__comment");
    commentChild.innerText = commentResponse[i].comment;
    superContainer.appendChild(commentChild);
    wrapperContainer.appendChild(superContainer);
  }
}
displayComments();

formElement.addEventListener("submit", formHandler);

 async function formHandler(event) {
  event.preventDefault();

  let newComments = {
    name: event.target.name.value,
    comment: event.target.comment.value,
  };
  if (newComments.name !== "" && newComments.comment !== "") {
    await bandSite.postComments(newComments);
    parentEL.innerHTML = "";
    displayComments();
    formElement.reset();
  } else {
    alert("please enter all the details");
  }
}

