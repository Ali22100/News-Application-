let showData = document.getElementById("showData");

let input = document.getElementById("inputData");

const getNews = () => {
  let API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a4a7395aeab74574bf865bd15e6312c9
`;
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.articles);

      data.articles.forEach((e, i) => {
        showData.innerHTML += `<div class="card" style="width: 18rem;">
            <img src=${e.urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${e.title}</h5>
            <p class="card-text">${e.description}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>  
            </div>
            </div>`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};