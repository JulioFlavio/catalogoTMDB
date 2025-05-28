const API_KEY = '3ae2e7cc1449403defce459b5488b2be';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_MOVIE = 'https://www.themoviedb.org/movie/'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function carrosselDetalhes() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    // console.log(data.results); // Lista de filmes populares
    // console.log(data)
    
    
    document.getElementById("tela").innerHTML = `
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>


      <div class="carousel-inner">
        <div class="carousel-item active">
          <a href="${URL_MOVIE + data.results[5].id}">
            <img class="d-block w-100" src="${IMAGE_BASE_URL + data.results[5].backdrop_path}" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>${data.results[5].title}</h5>
            </div>
          </a>
        </div>

        <div class="carousel-item">
          <a href="${URL_MOVIE + data.results[6].id}">
            <img class="d-block w-100" src="${IMAGE_BASE_URL + data.results[6].backdrop_path}" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>${data.results[6].title}<h5>
            </div>
          </a>
        </div>

        <div class="carousel-item">
          <a href="${URL_MOVIE + data.results[7].id}">
          <img class="d-block w-100 h-100" src="${IMAGE_BASE_URL + data.results[7].backdrop_path}" alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>${data.results[7].title}<h5>
            </div>
          </a>
        </div>
      </div>


      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próximo</span>
      </button>
    </div>
    `

    
}


async function cardsPopulares() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
  // "&page=1" <- para pegar a página do catálogo
    const data = await response.json(); 

    document.getElementById("populares").innerHTML = ``
  data.results.forEach(element => {
    if (element.overview == "") {
      document.getElementById("populares").innerHTML += `
    <div class="card custom-card mb-5" style="width: 18rem;">
      <a href="${URL_MOVIE + element.id}">
        <img class="card-img-top" src="${IMAGE_BASE_URL + element.poster_path}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${element.title}</h5>
        </div>
      </a>
    </div>
    `
    } else {
      document.getElementById("populares").innerHTML += `
    <div class="card custom-card mb-5" style="width: 18rem;">
      <a href="${URL_MOVIE + element.id}">
        <img class="card-img-top" src="${IMAGE_BASE_URL + element.poster_path}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${element.title}</h5>
        </div>
      </a>
    </div>
    `
    }
  });
}



window.onload(setTimeout(carrosselDetalhes, 1000), setTimeout(cardsPopulares, 1000));