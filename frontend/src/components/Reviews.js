import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Reviews extends Component {

    render () {
      return (
        <div  >
          <h2 className='comp-name' data-aos="fadeInUp"><strong>Reviews</strong></h2>
          <Container>
            {this.props.reviews.map(review => 
            <div className="reviews-block" data-aos="fadeInUp" key={Date.now()*Math.random()}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
              <hr className="hrline"/>
            </div>)}
          </Container>
        </div>
      )
    }
  }

  export default Reviews;