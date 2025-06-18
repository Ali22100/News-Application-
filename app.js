    const showData = document.getElementById("showData");
    const input = document.getElementById("inputData");
    const API_KEY = "a4a7395aeab74574bf865bd15e6312c9"; // Tumhari key

    const getNews = () => {
      showData.innerHTML = `<div class="text-center text-muted">Fetching latest news...</div>`;

      const query = input.value.trim();
      const API_URL = query
        ? `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&token=${API_KEY}`
        : `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${API_KEY}`;

      fetch(API_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          if (!data.articles || data.articles.length === 0) {
            showData.innerHTML = `<div class="text-center text-warning">No news found.</div>`;
            return;
          }

          showData.innerHTML = "";

          data.articles.forEach((e) => {
            if (!e.urlToImage || !e.description) return;

            showData.innerHTML += `
              <div class="col-md-4 col-sm-6">
                <div class="card news-card h-100">
                  <img src="${e.image}" class="card-img-top" alt="News image">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${e.title}</h5>
                    <p class="card-text">${e.description.slice(0, 100)}...</p>
                    <a href="${e.url}" target="_blank" class="btn btn-outline-primary mt-auto">Read More</a>
                  </div>
                </div>
              </div>`;
          });
        })
        .catch((err) => {
          console.error(err);
          showData.innerHTML = `<div class="text-danger text-center">Error: ${err.message}</div>`;
        });
    };

    window.onload = getNews;
