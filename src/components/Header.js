import React, { Component } from "react";
import { Carousel} from "react-bootstrap";
class Header extends Component {
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
    setCarousel = () => {
      let map = this.props.data.map((item, index) => (
        <Carousel.Item key={Date.now() + index} >
          <div
          className="header-img"
          data-id={item.id} onClick={event => {
            let target = event.target.getAttribute("data-id");
            this.props.history.push("/movie/" + target);
            this.props.getAll(target);
          }}
            style={{
              backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${item.backdrop_path}`,
              height: this.resize(720, 1280)
            }}
          />
          <Carousel.Caption className="car-caption">
            <h1 style={{ display: "inline-block" }}>
              <strong>{item.title}</strong>
              <hr className='hrline'/>
            </h1>
            <p>Rating: {item.vote_average}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ));
      return map;
    };
  
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
  
    render() {
      return (
        <div style={{ height: this.state.height, maxHeight: '100vh' }}>
          <Carousel indicators={false} controls={false}>{this.setCarousel()}</Carousel>
        </div>
      );
    }
  }

export default Header;