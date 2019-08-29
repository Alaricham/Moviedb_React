import React, { Component } from "react";
import Resizable from './Resizable';
import Trailers from './Trailers';
import Reviews from './Reviews';
import Media from './Media';
import TitleBlock from './TitleBlock';
import { Col, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

class Movie extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { height: this.resize(720, 1280) };
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("resize", () => this.setSize(720, 1280));
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", () => this.setSize(720, 1280));
  }

  resize = (height, width) => {
    return Math.round(window.innerWidth * (height / width));
  };

  setSize = (height, width) => {
    if (
      this.state.height !== Math.round(window.innerWidth * (height / width))
    ) {
      if (this._isMounted) {
      this.setState({
        height: Math.round(window.innerWidth * (height / width))
      });
    }
    }
  };

  renderMovie = () => {
    if(this.props.data ) {
      let results = this.props.data.reviews;
      let backdrops = this.props.data.images.backdrops;
      let data = this.props.data.video;
      let cast = this.props.data.cast.cast
      let backdrop_path = this.props.data.url.backdrop_path;
    return <React.Fragment>
      <div
      className="movie-header"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${backdrop_path}`,
          height: this.resize(720, 1280),
        }}
      >
      </div>
        <TitleBlock data={this.props.data}/>
      <div className="resize-wrapper">
      <Resizable data={cast} name={"Cast"} getGenre={this.getGenre}/>
      </div>
        <Row className="margin-rows" >
          <Col lg={6}>
          {data.length && <Trailers trailers={data} />}
          </Col>
          <Col lg={6}>
            {backdrops.length && <Media media={backdrops}/>}
          </Col>
          <Col style={{marginTop: '30px'}}>
            <hr className="hrline"/>
          </Col>
      </Row>
      <Row className="margin-rows">
        <Col>
        {results.length && <Reviews reviews={results}/>}
        </Col>
          </Row>
      </React.Fragment>
    }
  }

  render() {
    if(!this.props.data) {
      this.props.history.push('/')
      this.props.link()
    }
    return <React.Fragment>{this.renderMovie()}</React.Fragment>;
  }
}

export default withRouter(Movie);
