let LANGUAGE = "zh";
let PAGE = "1";
let NOTA = "7.0";
let START_DATE = "2018";
let END_DATE = "2019";

const defaultConfig = {
  LANGUAGE,
  NOTA,
  PAGE,
  START_DATE,
  END_DATE
};

function onResponse(response) {
  console.log(JSON.stringify(response, null, 4));
  return response;
}

function getMovies(conf = defaultConfig) {
  const config = {
    ...defaultConfig,
    ...conf
  };

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=dba81583a54edf2ec798b59bc39cc8d9` +
      `&with_original_language=${config.LANGUAGE || "zh"}&page=${
        config.PAGE
      }&sort_by=vote_count.desc&vote_average.gte=${config.NOTA}` +
      `&primary_release_date.gte=${config.START_DATE}&primary_release_date.lte=${config.END_DATE}`,
    {
      method: "GET"
    }
  )
    .then(res => res.json())
    .then(onResponse);
}

function getGenres() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=dba81583a54edf2ec798b59bc39cc8d9&language=pt-BR`,
    { method: "GET" }
  ).then(res => res.json());
}
