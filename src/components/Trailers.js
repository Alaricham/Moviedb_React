import React, { Component } from "react";
import {Carousel} from "react-bootstrap";

class Trailers extends Component {

    render () {
      return (
        <div data-aos="bounceIn">
          <h2 className='comp-name'>
            <strong>Trailers</strong>
          </h2>
          <Carousel controls={true}>
          {this.props.trailers.map(item => 
          <Carousel.Item key={item.key}>
            <div className="wrapper">
            <div className="bs" >
          <iframe  title={item.key}  src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            </div>
            </Carousel.Item>
              )}
              </Carousel>
        </div>
      )
    }
  }

  export default Trailers;