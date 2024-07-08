document.addEventListener('DOMContentLoaded', function() {
    // const imdbLogo = document.querySelector('.img');
    // imdbLogo.addEventListener('click', function() {
    //     window.location.href = 'https://en.wikipedia.org/wiki/IMDb'; // Redirect to IMDb Wikipedia page
    // });

    const API_KEY = 'api_key=953b816f9380321d183fee98f692c7d6';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
    const BASE_URL = 'https://api.themoviedb.org/3/';
    const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
    const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY;

    const submitBtn = document.querySelector('#form-submit');
    const input = document.querySelector(".search_text");

    submitBtn.addEventListener("submit", function(e) {
        e.preventDefault();
        const search = input.value;

        if (search) {
            const url = SEARCH_URL + '&query=' + search;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    addMoviesToContainer(data);
                });
        } else {
            fetch(API_URL)
                .then(res => res.json())
                .then(jsonData => {
                    addMoviesToContainer(jsonData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });

    fetch(API_URL)
        .then(res => res.json())
        .then(jsonData => {
            addMoviesToContainer(jsonData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function addMoviesToContainer(data) {
        const container = document.getElementById("moviesContainer");
        container.innerHTML = '';
        data.results.forEach(movie => {
            const { id, title, poster_path, vote_average } = movie;
            const movie_container = document.createElement("div");
            movie_container.classList.add('movie_container');

            // Create a link to the movie's page on TMDb
            const movieLink = document.createElement("a");
            movieLink.href = `https://www.themoviedb.org/movie/${id}`;
            movieLink.target = "_blank"; // Open link in a new tab
            movieLink.rel = "noopener noreferrer";

            // Create movie content
            movieLink.innerHTML = `
                <div class="img-section">
                    <img src="${IMG_URL+poster_path}" alt="${title}">
                </div>
                <div class="content-section">
                    <div class="title-bar">
                        <h3>${title}</h3>
                    </div>
                    <div class="rating-bar">
                        <span><i>Rating</i> - ${vote_average}</span>
                    </div>
                </div>
            `;
            
            // Append the link containing movie information to the container
            movie_container.appendChild(movieLink);
            container.appendChild(movie_container);
            console.log(movie)
            console.log(vote_average);
        });
    }
});
