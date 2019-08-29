import React, { Component } from "react";
import Slider from "react-slick";
import Card from "./Card";
import Icon from "./Icons";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

class Resizable extends Component {
  _isMounted = false;
    state = {
      display: true,
      width: "100%"
    };
  
    componentDidMount() {
      this._isMounted = true;
      window.addEventListener("resize", () => this.checkWidth());
    }
  
    componentWillUnmount() {
      this._isMounted = false;
      window.removeEventListener("resize", () => this.checkWidth());
    }
  
    checkWidth = () => {
      let media;
      if (window.innerWidth >= 1170) {
        media = 5;
      } else if (window.innerWidth <= 1170 && window.innerWidth >= 720) {
        media = 3;
      } else {
        media = 1;
      }
      if (this._isMounted) {
      this.setState({ media });
      }
      return window.innerWidth;
    };
    render() {
      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <Icon icon={faAngleLeft} classes={"arr-left"} anim='left' />,
        nextArrow: <Icon icon={faAngleRight} classes={"arr-right"} anim='right' offset={true} />
      };
      return (
        <div className='resizable-class'>
          <h2 data-aos="resizable">
            <strong>{this.props.name}</strong>
          </h2>
          <div
            style={{
              width: this.state.width + "px",
              display: this.state.display ? "block" : "none",
              marginTop: "30px"
            }}
          >
            <Slider {...settings}>
              {this.props.data.map((movie, index) => (
                <Card
                key={Date.now()*Math.random()}
                  {...this.props}
                  data={{ movie, index }}
                  getGenre={this.props.getGenre}
                  getAll={this.props.getAll}
                />
              ))}
            </Slider>
          </div>
          <hr className="hrline"/>
        </div>
      );
    }
  }

  export default Resizable;