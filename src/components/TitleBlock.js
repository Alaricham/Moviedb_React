import React, { Component } from "react";
import { Col, Row} from "react-bootstrap";

class TitleBlock extends Component {
    state = {
      progress: 0
    }
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
      block.push(<p key={key}>{key}<br/>{crewInfo[key]}</p>)
    }
    return block
  }
  
  render() {
      let movie = this.props.data[0];
      const radius = 40, dashArr = Math.PI * radius * 2;
      return (
      <div id="movie-block" data-aos="set" data-aos-anchor-placement="top-center" >
        <Row >
          <Col lg={3}>
        <img
        className='poster posterblock'
              src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}
              alt=""
              />
              <div className='rating'>
              <svg className="svg-circles" width="110" height="110" >
              <circle cx="55" cy="55" r={52} strokeWidth="12" stroke="#2d364" fill="#2d364e" />
                      <circle cx="55" cy="55" r={radius} strokeWidth="12" stroke="#6a43e630" fill="none" />
                      <circle cx="55" cy="55" r={radius} strokeWidth="12" stroke="#6a43e6" strokeLinecap= "round" fill="none" transform="rotate(270, 55, 55)"
                          strokeDasharray={dashArr} strokeDashoffset={movie.vote_average*10} />
                  </svg>
                  <span id="text">{movie.vote_average*10}</span>
              </div>
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

    export default TitleBlock;