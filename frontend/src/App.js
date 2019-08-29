import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import NaviBar from "./components/NavigationBar";
import Movie from "./components/Movie";
import Footer from './components/Footer';
import Header from './components/Header';
import Searches from './components/Searches';
import Resizable from './components/Resizable';
import Spinner from './components/Spinner';
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "./App.css";
import { Switch, Route } from "react-router";
import {withRouter} from 'react-router-dom';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css'; 
import '../node_modules/animate.css'
AOS.init({
  useClassNames: true,
  initClassName: false,
  animatedClassName: 'animated',
  once: true,
  
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
    axios.get(`http://localhost:${REACT_APP_PORT}/main`).then(results => {
      let data = results.data
      let hashMap = {};
          data['genres'].forEach(genre => {
          hashMap[genre.id] = genre.name;
        });
      this.setState({
        now_playing: [...data['now_playing']],
        popular: [...data['popular']],
        top_rated: [...data['top_rated']],
        upcoming: [...data['upcoming']],
        genres: hashMap,
        ready: true
      });
    })
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

  search = (event, name) => {
    if (event.target.type === "button" || event.key === "Enter") {
      this.getSearch("search", name);
    }
  };

  // getInfo = (type, link, length = "max") => {
  //       for (let i = 0; i < results.data.results.length - 1; i++) {
  //         if (
  //           results.data.results[i].backdrop_path !== null ||
  //           results.data.results[i].poster_path !== null
  //         ) {
  //           data.push(results.data.results[i]);
  //         }
  //       }
  // };

  getGenre = id => {
    return this.state.genres[id];
  };

  getAll = id => {
    this.setState({ready: false})
    axios.get(`http://localhost:${REACT_APP_PORT}/movie?id=${id}`).then(results => {
      let data = results.data;
      this.setState({ movie: data, ready: true });
    });
  }

  getSearch = (type, name) => {
    this.setState({ready: false})
    axios.get(`http://localhost:${REACT_APP_PORT}/search?search=${name}`).then(results => {
      let data = results.data;
      this.setState({ [type]: data, ready: true });
    });
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
                  link={()=> this.setState({ready: false})}
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
            {this.state.ready && <Movie data={this.state.movie} link={()=> this.setState({ready: false})} />}
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
