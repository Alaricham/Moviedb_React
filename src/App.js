import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import NaviBar from "./components/NavigationBar";
import Movie from "./components/Movie";
import Footer from './components/Footer';
import Header from './components/Header';
import Searches from './components/Searches';
import Resizable from './components/Resizable';
import Spinner from './components/Spinner';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import { Switch, Route } from "react-router";
import {withRouter} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import 'animate.css'
AOS.init({
  useClassNames: true,
  initClassName: false,
  animatedClassName: 'animated',
  once: true,
  
});

let links =  {
  now_playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_KEY}&language=en-US&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${REACT_APP_KEY}&language=en-US&page=1`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${REACT_APP_KEY}&language=en-US&page=1`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_KEY}&language=en-US&page=1`,
  genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${REACT_APP_KEY}&language=en-US`
};

let getmovieLinks = id => ({
  url: `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_KEY}&append_to_response=videos`,
  video: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${REACT_APP_KEY}&language=en-US`,
  cast: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${REACT_APP_KEY}`,
  images: `https://api.themoviedb.org/3/movie/${id}/images?api_key=${REACT_APP_KEY}`,
  reviews: `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${REACT_APP_KEY}&language=en-US`
});


class App extends Component {
  constructor(props) {
    super(props);
    this.loadScreen = React.createRef()
    this.state = {
      ready: false,
      fade: false,
      search: [],
      now_playing: [],
      popular: [],
      top_rated: [],
      upcoming: [],
      genres: [],
    };
  }

  componentDidMount() {
    this.setState({ready: false})
    this.getInfo("now_playing", links.now_playing);
    this.getInfo("popular", links.popular);
    this.getInfo("top_rated", links.top_rated);
    this.getInfo("upcoming", links.upcoming);
    this.getInfo("genres", links.genres);
    window.addEventListener('DOMContentLoaded', this.setState({ready: true}))
  }

  componentDidUpdate (prevProps) {
    let {pathname} =  this.props.location
    if(prevProps.location.pathname !== pathname && pathname !== '/') {
      setTimeout(this.setState({fade: false}), 1000)
    }
  }

   componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.setState({ready: true}))
  }

  getAll = id => {
      this.setState({ready: false});
      let movie = getmovieLinks(id);

      let promise1 = new Promise((resolve, reject) => {
        axios.get(movie.url).then(result => resolve(result.data));
      }),
      promise2 = new Promise((resolve, reject) => {
        axios.get(movie.video).then(result => resolve(result.data.results));
      }),
      promise3 = new Promise((resolve, reject) => {
        axios.get(movie.cast).then(result => resolve(result.data));
      }),
      promise4 = new Promise((resolve, reject) => {
        axios.get(movie.images).then(result => resolve(result.data));
      }),
      promise5 = new Promise((resolve, reject) => {
        axios.get(movie.reviews).then(result => resolve(result.data));
      });

    Promise.all([promise1, promise2, promise3, promise4, promise5])
      .then(results => {
        this.setState({ movie: results, ready: true });
      })
      .catch(err => console.log(err));
  };

  getSearch = (type, link) => {
    this.setState({ready: false})
    axios.get(link).then(results => {
      let data = results.data.results;
      this.setState({ [type]: data, ready: true });
    });
  };

  getInfo = (type, link, length = "max") => {
    this.setState({ready: false})
    axios.get(link).then(results => {
      let data = [];
      if (Object.keys(results.data)[0] === "genres") {
        let hashMap = {};
        results.data.genres.forEach(genre => {
          hashMap[genre.id] = genre.name;
        });
        return this.setState({ genres: hashMap });
      } else {
        for (let i = 0; i < results.data.results.length - 1; i++) {
          if (
            results.data.results[i].backdrop_path !== null ||
            results.data.results[i].poster_path !== null
          ) {
            data.push(results.data.results[i]);
          }
        }
        this.setState({ [type]: data, ready: true });
      }
    });
  };


  search = (event, name) => {
    if (event.target.type === "button" || event.key === "Enter") {
      let link = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
      this.getSearch("search", link);
    }
  };

  getGenre = id => {
    return this.state.genres[id];
  };

  render() {
    return (
      <div className="App">
      <div ref={this.loadScreen} 
      onTransitionEnd={()=> {if(this.state.ready) {this.setState({fade: true})}}} 
      style={{display: this.state.fade ? 'none': 'block'}} 
      className={this.state.ready ? "load load-bg" :"unload load-bg"} 
      >
        <Spinner />
        </div>
        <Switch>
          <Route
            path="/search/:movie"
            render={props => (
              <React.Fragment>
                <NaviBar search={this.search} {...props} />
                <Searches
                  data={this.state.search}
                  getGenre={this.getGenre}
                  getAll={this.getAll}
                  {...props}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/movie/:id"
            render={props => 
              <React.Fragment>
            <NaviBar search={this.search} {...props}  /> 
            {this.state.ready && <Movie data={this.state.movie} />}
            </React.Fragment> }
          />
          <Route
            path="/"
            exact
            render={props => (
              <React.Fragment>
                <NaviBar search={this.search} {...props} />
                <Header data={this.state.now_playing} indicators={false} getAll={this.getAll} history={this.props.history}/>
                <Resizable
                  data={this.state.upcoming}
                  name={"Upcoming"}
                  getGenre={this.getGenre}
                  getAll={this.getAll}
                  {...props}
                />
                <Resizable
                  data={this.state.top_rated}
                  name={"Top Rated"}
                  getGenre={this.getGenre}
                  getAll={this.getAll}
                  {...props}
                />
                <Resizable
                  data={this.state.popular}
                  name={"Popular"}
                  getGenre={this.getGenre}
                  getAll={this.getAll}
                  {...props}
                />
                <Resizable
                  data={this.state.now_playing}
                  name="Now Playing"
                  getGenre={this.getGenre}
                  getAll={this.getAll}
                  {...props}
                />
              </React.Fragment>
            )}
          />
      </Switch>
          <Footer />
        </div>
    );
  }
}

export default withRouter(App);
