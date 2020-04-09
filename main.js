function createP(content) {
  const p = document.createElement("p");
  p.innerHTML = content;
  return p;
}

function createImg(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style = "max-width: 100%";
  return img;
}

function createLink(name, href) {
  const a = document.createElement("a");
  a.href = href;
  a.innerText = name;
  return a;
}

function createBtnLink(name, href) {
  const link = createLink(name, href);
  link.classList.add("btn", "btn-sm", "btn-info");
  link.target = "_blank";
  return link;
}

function renderGenre(id) {
  const span = document.createElement("span");
  span.classList.add("badge", "badge-primary");
  span.innerText = numToGenre(id);

  return span;
}

function renderMovie(movie) {
  const filme = document.createElement("div");
  filme.id = movie.id;
  filme.className = "movie_container";

  const title = document.createElement("h1");
  title.innerText = movie.title;

  filme.classList.add("movie-container");
  filme.append(title);
  filme.append(createP(`<b>${movie.release_date}</b>`));
  filme.append(
    createImg(
      `https://image.tmdb.org/t/p/w500/${movie.backdrop_path ||
        movie.poster_path}`
    )
  );
  filme.append(createP(`Título original: ${movie.original_title}`));
  filme.append(
    createP(
      `<b>Gênero:</b> ${movie.genre_ids
        .map(numToGenre)
        .map(e => `<em>${e}</em>`)
        .join(", ")}`
    )
  );
  filme.append(createP(movie.overview));
  filme.append(
    createP(
      `<em>Nota</em>: <span class="badge badge-primary nota">${movie.vote_average}</span>`
    )
  );
  const detailBtn = createBtnLink(
    "Mais Detalhes",
    `https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`
  );
  detailBtn.classList.add("detail_btn");
  filme.append(detailBtn);
  return filme;
}

const onSearch = e => {
  try {
    e.preventDefault();
  } catch {}
  const NOTA = $("#rate")[0].value;
  const START_DATE = $("#start_date")[0].value;
  const END_DATE = $("#end_date")[0].value;
  const LANGUAGE = $("#country")
    .find(":selected")
    .attr("value");

  console.log(LANGUAGE);

  getMovies({ NOTA, START_DATE, END_DATE, LANGUAGE }).then(res => {
    const filmes_list = document.getElementById("filmes_list");
    $(filmes_list).empty();
    res.results.forEach(movie => {
      filmes_list.append(renderMovie(movie));
      filmes_list.append(document.createElement("hr"));
    });
  });
};

document.getElementById("search_options").addEventListener("submit", onSearch);

getGenres().then(res => {
  window.genres = res.genres;
  onSearch({});
});

function numToGenre(num) {
  return window.genres.filter(gen => gen.id == num)[0].name;
}
