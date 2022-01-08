import { API_KEY, BASE_URL, IMG_URL, language } from './api.js';

// Defini uma função pra gerar um número aleatóro
// para buscarmos um filme de forma aleatória
const Utils = {
  getRandomNumber() {
    return Math.floor(Math.random() * 80000);
  },
};

//Defini funções para trabalhar a API
const tmdb = {
  // essa função monta o Request
  doGet(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
  },

  // essa função requesta a URI
  getMovie() {
    let result = API.doGet(
      `https://api.themoviedb.org/3/movie/${Utils.getRandomNumber()}?api_key=${API_KEY}&language=pt-BR`
    );
    let movie = JSON.parse(result);
    if (movie.status_code === 34) {
      console.log("Oh no!! Couldn't find that");
    } else {
      console.log(movie);
      return movie;
    }
  },
};

// Proximos passos:
//
// Acessar o DOM
// fazer com que ele mostre as informações da api
// fazer ele mudar de acordo com o pressionar do botão
// Fazer um novo request sempre que apertar o botão
