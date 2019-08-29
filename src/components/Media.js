import React, { Component } from "react";
import {Carousel} from "react-bootstrap";

class Media extends Component {
    render () {
      return (
        <div data-aos="bounceIn">
          <h2 className='comp-name'>
            <strong>Media</strong>
          </h2>
          <Carousel>
            {this.props.media.map(item => 
              <Carousel.Item key={item.file_path}>
              <img
                style={{borderRadius: '20px'}}
                className="d-block w-100"
                src={`http://image.tmdb.org/t/p/w1280/${
                  item.file_path
                }`}
                alt="First slide"
              />
            </Carousel.Item>
              )}
              </Carousel>
        </div>
      )
    }
  }

  export default Media;