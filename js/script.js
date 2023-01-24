const gifs = document.getElementById('gifs');
const API_KEY = 'qs8QhKvAKq1iNjLSUSiDDxm0R4lfLCUa';
const inputSearch = document.getElementById('search');
const buscador = document.getElementById('buscador');
const contentRandom = document.getElementById('contentrandom');
let btnRand = document.getElementById('random');

inputSearch.onkeyup = async (event) =>{
        if(event.keyCode !== 13) return;
        const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${inputSearch.value}`);
        const data = await response.json();
        console.log(data);
        if (data.data.length !== 0) {
          let content = ``;
        data.data.map((gif) => {
            content +=`
            <div class="col-4 card-img-top img-thumbnail shadow-sm mt-1 bg-body rounded" style="width: 18rem;"">
          <img src="${gif.images.original.url}" class="card-img-top" width=150; height=150; alt="${gif.title}">
          <div class="card-body text-center">
            <a href="${gif.url}" class="btn btn-primary d-block">Visitar sitio</a>
          </div>
        </div>`
        });
        gifs.innerHTML = content;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron resultados para: ' + inputSearch.value,
          })
        }
};

let randomContent = () => {
  gifs.innerHTML = "";
  getRand();
}
 btnRand = addEventListener('click', randomContent);

async function getRand() {
  let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
  const data = await response.json();
  let content = ``;
  content =`<img src="${data.data.images.original.url}" class="mb-3 ms-1 img-thumnail" alt="${data.title}"  width="400" height="400"></img>`;
  contentRandom.innerHTML = content;
 }


//