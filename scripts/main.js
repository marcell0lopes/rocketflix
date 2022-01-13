import { API_KEY, BASE_URL, IMG_URL, language } from '../api.js';

// Defini uma função pra gerar um número aleatóro
// para buscarmos um filme de forma aleatória
const Utils = {
  getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  },
};

//Defini funções para trabalhar a API
const Movie = {
  // essa função monta o Request
  doGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
  },

  // essa função requesta a URI
  getMovie() {
    const notFound = {
      poster_path: null,
      title: 'Tente novamente!',
      vote_average: 0,
      original_title: 'Não conseguimos achar um filme :(',
      overview: '',
    };

    let result = Movie.doGet(
      `https://api.themoviedb.org/3/movie/${Utils.getRandomNumber(
        1000
      )}?api_key=${API_KEY}&language=en-US`
    );

    let movie = JSON.parse(result);

    if (movie.status_code === 34) {
      return notFound;
    } else {
      return movie;
    }
  },
};

const DOM = {
  movieContainer: document.getElementById('movie'),
  randomMovie: Movie.getMovie(),

  addMovie(movie) {
    const div = document.createElement('div');
    div.innerHTML = DOM.innerHTMLMovies(movie);
    DOM.movieContainer.appendChild(div);
  },

  clearMovie() {
    DOM.movieContainer.innerHTML = '';
  },

  innerHTMLMovies(movie) {
    const html = `
     <img class="movie_image" src="${
       movie.poster_path
         ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
         : '/assets/not-found.png'
     }"
     alt="movie image" />                   
     <div class="content">
       <div class="movie-title">
         <h2 id="title">${movie.title}</h2>    
         <small>${movie.original_title}</small>     
         <span id="movie-votes" class="${
           movie.vote_average >= 7 ? 'good' : 'bad'
         }">${movie.vote_average.toFixed(1)}</span>         
       </div>
       <p id="description">
       ${movie.overview}
       </p></div>`;
    return html;
  },
};

const App = {
  init() {
    console.log(DOM.randomMovie);
    console.log(DOM.innerHTMLMovies(DOM.randomMovie));
    DOM.addMovie(DOM.randomMovie);
  },
};

shuffleMovieButton.addEventListener(
  'click',
  () => {
    DOM.clearMovie();
    DOM.addMovie(Movie.getMovie());
  },
  false
);
