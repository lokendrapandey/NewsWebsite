// const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// const url = "https://newsapi.org/v2/everything?q=";
// const API_KEY = "23909437a0e8457fb683abacd7fe3637";
// const url = "https://newsapi.org/v2/everything?q=";



const API_KEY = "11ba8f698c1b41dfa1075fc9b789049e";
const url = "https://newsapi.org/v2/everything?q=";


 //original 
// const API_KEY = "79e678e8cc5e4baeb5ce1c4fbcd7bdca";
// const url ="https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  const seeMoreBtn = cardClone.querySelector("#see-more-btn");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsSource.innerHTML = `${article.source.name} · ${new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}`;

  const description = article.description;
  const truncatedDescription = description.split(' ').slice(0, 7).join(' '); // Get first 70 words
  newsDesc.innerHTML = truncatedDescription;

  if (description.length > truncatedDescription.length) {
    seeMoreBtn.style.display = 'block';
    seeMoreBtn.addEventListener("click", () => {
      if (seeMoreBtn.textContent === "See More") {
        newsDesc.innerHTML = description; 
        seeMoreBtn.textContent = "See Less";
      } else {
        newsDesc.innerHTML = truncatedDescription; 
        seeMoreBtn.textContent = "See More";
      }
    });
  } else {
    seeMoreBtn.style.display = 'none'; 
  }

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

  

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});















