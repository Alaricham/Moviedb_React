import React, { Component } from "react";
import Resizable from './Resizable';
import { Col, Row, Carousel, Container } from "react-bootstrap";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { height: this.resize(720, 1280) };
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.setSize(720, 1280));
  }

  componentWillUnmountc() {
    window.addEventListener("resize", null);
  }

  resize = (height, width) => {
    return Math.round(window.innerWidth * (height / width));
  };

  setSize = (height, width) => {
    if (
      this.state.height !== Math.round(window.innerWidth * (height / width))
    ) {
      this.setState({
        height: Math.round(window.innerWidth * (height / width))
      });
    }
  };
  render() {
    return (<React.Fragment>
      <div
        style={{
          opacity: 0.5,
          backgroundPositionY:'50px',
          backgroundSize: "cover",
          backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${
            this.props.data[0].backdrop_path
          }`,
          backgroundRepeat: 'no-repeat',
          maxWidth: "100vw",
          height: this.resize(720, 1280),
          maxHeight: '100vh'
        }}
      >
      </div>
        <TitleBlock data={this.props.data}/>
      <div className="resize-wrapper">
      <Resizable data={this.props.data[2].cast} name={"Cast"} getGenre={this.getGenre}/>
      </div>
        <Row style={{margin: '2% 4%'}}>
          <Col lg={6}>
          {this.props.data[1].length && <Trailers trailers={this.props.data[1]} />}
          </Col>
          <Col lg={6}>
            {this.props.data[3].backdrops.length && <Media media={this.props.data[3].backdrops}/>}
          </Col>
          <Col style={{marginTop: '30px'}}>
      <hr className="hrline"/>
          
          </Col>
      </Row>
      <Row style={{margin: '2% 4%'}}>
        <Col>
        
        {this.props.data[4].results.length && <Reviews reviews={this.props.data[4].results}/>}
        </Col>
          </Row>
      </React.Fragment>
    );
  }
}

class TitleBlock extends Component {
  getCrew = ()=> {
    let crewInfo = {},
    block = [],
    crew = this.props.data[2].crew;

    crew.forEach(unit => {
      if(unit.job==='Director' ) { 
        crewInfo[unit.job] = crewInfo[unit.job] ? [...crewInfo[unit.job], ', ' + unit.name] : [unit.name]
      } 
      if(unit.job === 'Producer' ) { 
        crewInfo[unit.job] = crewInfo[unit.job] ? [...crewInfo[unit.job], ', ' + unit.name]: [unit.name]
      } 
      if(unit.job === 'Original Music Composer' || unit.job === 'Music' ) { 
        crewInfo[unit.job] = crewInfo[unit.job] ? [...crewInfo[unit.job], ', ' + unit.name]: [unit.name]
      } 
      if(unit.job === 'Director of Photography') { 
        crewInfo[unit.job] = crewInfo[unit.job] ? [...crewInfo[unit.job], ', ' + unit.name]: [unit.name] 
      } 
      if(unit.job === 'Writing' || unit.job === 'Screenplay' || unit.job === 'Writer' ) {
        crewInfo[unit.job] = crewInfo[unit.job] ? [...crewInfo[unit.job], ', ' + unit.name]: [unit.name]
      }

  }); 
  for (let key in crewInfo) {
    block.push(<p>{key}<br/>{crewInfo[key]}</p>)
  }
  return block
}

render() {
    let movie = this.props.data[0];
    return (
    <div className="movie-block">
      <Row>
        <Col lg={3}>
      <img
      className='poster posterblock'
            src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}
            alt=""
            style={{
              margin: "auto",
              display: "flex",
              borderRadius: "10px"
            }}/>
            
        </Col>
        <Col lg={9}>
      <h1>{movie.title}</h1>
      <p>{movie.genres[0].name}</p>
      <p>{movie.overview}</p>   
      <Row>
        <Col>
        {(this.getCrew()).slice(0, 3)}
        </Col>
        <Col>
        {(this.getCrew()).slice(3)}
        </Col>
      </Row>
        </Col>
      </Row>
      <hr className='hrline'/>
    </div>)
  }
  }

  class Reviews extends Component {

    render () {
      return (
        <div>
          <h2 className='comp-name'><strong>Reviews</strong></h2>
          <Container>
            {this.props.reviews.map(review => 
            <div className="reviews-block" key={Date.now()*Math.random()}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
              <hr className="hrline"/>
            </div>)}
          </Container>
        </div>
      )
    }
  }

  class Trailers extends Component {

    render () {
      return (
        <div>
          <h2 className='comp-name'>
            <strong>Trailers</strong>
          </h2>
          <Carousel controls={true}>
          {this.props.trailers.map(item => 
          <Carousel.Item>
            <div className="wrapper">
            <div className="bs" >
          <iframe  src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            </div>
            </Carousel.Item>
              )}
              </Carousel>
        </div>
      )
    }
  }

  class Media extends Component {
    render () {
      return (
        <div>
          <h2 className='comp-name'>
            <strong>Media</strong>
          </h2>
          <Carousel>
            {this.props.media.map(item => 
              <Carousel.Item>
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





export default Movie;
