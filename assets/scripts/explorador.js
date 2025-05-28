const API_KEY = '3ae2e7cc1449403defce459b5488b2be';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL_MOVIE = 'https://www.themoviedb.org/movie/'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function buscarFilmes(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`);
  const data = await response.json();
  console.log(data)

  if (query == "") {
    Swal.fire({
      icon: "error",
      title: "Insira um título!",
      text: "Você não inseriu nenhum título para a busca",
    });

    catalogoExplorar()
  }

  document.getElementById("explorar-filtros").innerHTML = ``
  data.results.forEach(element => {
    document.getElementById("explorar-filtros").innerHTML += `
    <div class="card custom-card mb-5" style="width: 18rem;">
      <a href="#">
        <img class="card-img-top" src="${IMAGE_BASE_URL + element.poster_path}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${element.title}</h5>
        </div>
      </a>
    </div>
    `
  });
}

async function catalogoExplorar() {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt`);
  const data = await response.json();
  console.log(data)

  document.getElementById("explorar-filtros").innerHTML = ``
  data.results.forEach(element => {
    document.getElementById("explorar-filtros").innerHTML += `
    <div class="card custom-card mb-5" style="width: 15rem;">
      <a href="${URL_MOVIE +  element.id}">
        <img class="card-img-top" src="${IMAGE_BASE_URL + element.poster_path}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${element.title}</h5>
        </div>
      </a>
    </div>
    `
  });

  document.getElementById("botoes").className = "row botoes justify-content-end"
  document.getElementById("botoes").innerHTML = `<button class="btn proximo" onclick="catalogoExplorarPagina2()" type="button">Próximo</button>`
}

async function catalogoExplorarPagina2() {
  
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=2&language=pt`);
  const data = await response.json()

  document.getElementById("explorar-filtros").innerHTML = ``
  data.results.forEach(element => {
    document.getElementById("explorar-filtros").innerHTML += `
    <div class="card custom-card mb-5" style="width: 15rem;">
      <a href="${URL_MOVIE +  element.id}">
        <img class="card-img-top" src="${IMAGE_BASE_URL + element.poster_path}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${element.title}</h5>
        </div>
      </a>
    </div>
    `
  });

  

  document.getElementById("botoes").className = "row botoes justify-content-start"
  document.getElementById("botoes").innerHTML = `<button class="btn anterior" onclick="catalogoExplorar()" type="button">Anterior</button>`
}

function atualizaAno() {
document.getElementById("ValorAno").textContent = document.getElementById("anoRange").value;
}

function enviarValor() {
  let input = document.getElementById("filtrar").value;
  buscarFilmes(input)
}

document.getElementById("filtrar").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarValor();
  }
});

window.onload(setTimeout(catalogoExplorarPagina2, 1000), setTimeout(catalogoExplorar, 1000), atualizaAno())