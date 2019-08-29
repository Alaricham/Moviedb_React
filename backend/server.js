const express = require('express'),
    app = express(),
    axios = require('axios'),
    path = require('path'),
    cors = require('cors');
    
let apiKey = process.env.KEY;
let headUrl = 'https://api.themoviedb.org/3/movie';

let main = {
    now_playing: `${headUrl}/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    upcoming: `${headUrl}/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    top_rated: `${headUrl}/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    popular: `${headUrl}/popular?api_key=${apiKey}&language=en-US&page=1`,
    genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  }

let getMovieLinks = (id) => ({
    url:`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    video:`${headUrl}/${id}/videos?api_key=${apiKey}&language=en-US`,
    cast:`${headUrl}/${id}/credits?api_key=${apiKey}`,
    images:`${headUrl}/${id}/images?api_key=${apiKey}`,
    reviews:`${headUrl}/${id}/reviews?api_key=${apiKey}&language=en-US`
    })

  let getSearch = (searchTerm) => 
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
    .then(results => results.data.results
    );

  let getAll = (id, links) => {
    let promises = []
    for(let key in links) {
        let set = new Promise((resolve, reject) => {
            axios.get(links[key]).then(result => {
                if(result.data.results) {
                    set = result.data.results
                } else if(result.data.title){
                    set = result.data
                } else if(result.data.backdrops) {
                    set = result.data
                } else if(result.data.cast) {
                    set = result.data
                } else {
                    set = result.data.genres
                }
                resolve({[key]:set})})
        })
        promises.push(set)
    }

    return Promise.all(promises).then(results =>results).catch(err => console.log(err));
  };

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(cors())

app.get('/main', (req, res) => {
    new Promise((resolve, reject) => resolve(getAll(null, main)))
    .then(result => {
        let data ={};
        result.forEach(item =>{
            data={...item, ...data}});
        res.send(data)
    })
});

app.get('/search', (req, res) => {
    let searchTerm = req.query.search
    getSearch(searchTerm).then(result => {
        res.send(result)})
});

app.get('/movie', (req, res) => {
    let id = req.query.id;
    let movieLinks = getMovieLinks(id);
    new Promise((resolve, reject) => resolve(getAll(null, movieLinks)))
    .then(result => {
        let data ={};
        result.forEach(item =>{
            data={...item, ...data}});
        res.send(data)
    }) 
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening...')
})
