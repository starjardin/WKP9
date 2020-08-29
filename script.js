//Plans
/*
let's fetch the data:
//store the url that I am going to use //endPoint
//create a function that is going to feth the data//asyncronous function
//create a function that generate the html
//sort the film rt_score from the biggest to the smallest
//Add the html to the dom
*/

//variables
const endPoint = "https://ghibliapi.herokuapp.com/films";
const container = document.querySelector('.container');

//async function, this fectche the data;
const fetchFilms = async () => {
  const filmUrl = await fetch(`${endPoint}`)
  const data = await filmUrl.json();
  return data;
};

//This is the films collections
const fetchFilmObjects = async () => {
  const films = await fetchFilms();
  displayFilmLists(films)
}

// html generator
const displayFilmLists = (films) => {
  //Sort the films form the biggest to the smallest
  const filmsSorted = films.sort( (a, b) => {
    return b.rt_score - a.rt_score;
  });
  //map through the filtered lisyt to create the html
  const html = filmsSorted.map(film => {
    return `
    <div class = "film">
      <article class="film_article">
        <header class="main_header">
          <h2 class="movie-title">
            Title: ${film.title}
          </h2>
          <small class="release_date">Date release: ${film.release_date}</small>
        </header>

        <main>
          <p>Description:</p>
          <p class="film-description">
            ${film.description}
          </p>
        </main>

        <footer>
          <p class="director">
            Dir: ${film.director}
          </p>
          <p class="producer">
            Pro: ${film.producer}
          </p>
          <button 
            type="button" 
            id=${film.id}
            class="delete"
          >Delete</button>
        </footer>
      </article>
      <aside class="aside">
        <p class="rate_score">
          score rate: ${film.rt_score}
        </p>
      </aside>
    </div>`
  });
  //add the html to the dom
  container.innerHTML = html.join("");
};
fetchFilmObjects();