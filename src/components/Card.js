import React, { Component } from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Card extends Component {
    constructor(props) {
      super(props);
      this.id = React.createRef();
    }

    render() {
      let { movie, index, time=50 } = this.props.data;
      return (
        <div
        data-aos="resizable"
        key={Date.now()*Math.random()}
          ref={this.id}
          data-id={movie.id ? movie.id : index }
          className="img-set"
          style={{
            display: "inline-block",
            width: "200px",
            position: "relative",
            top: "30px"
          }}
          onClick={event => {
            this.props.history.push(
              "/movie/" + this.id.current.getAttribute("data-id")
            );
            this.props.getAll(this.id.current.getAttribute("data-id"));
          }}
        >
          {movie.poster_path && <FontAwesomeIcon
            icon={faStar}
            style={{
              color: "white",
              position: "absolute",
              top: "10px",
              right: "23px",
              width: "50px",
              height: "40px"
            }}
          />}
          <p
            style={{
              position: "absolute",
              fontWeight: "bold",
              fontSize: "14px",
              top: "22px",
              right: "38px"
            }}
          >
            {movie.vote_average && movie.vote_average.toFixed(1)}
          </p>
  
          <img
          height={!movie.poster_path && !movie.profile_path ? 231 : null}
          width={!movie.poster_path && !movie.profile_path ? 154 : null}
            src={!movie.poster_path && !movie.profile_path ? process.env.PUBLIC_URL + "/profile.png" :"http://image.tmdb.org/t/p/w154/" + (movie.poster_path || movie.profile_path)}
            alt=""
            style={{
              margin: "auto",
              display: "flex",
              borderRadius: "10px"
            }}
          />
          <h5 style={{ display: "block", marginTop: "10px" }}>{movie.title || movie.name}</h5>
          <h6 style={{ display: "block" }}>
            {movie.genre_ids ? this.props.getGenre(movie.genre_ids[0]) : movie.character}
            {movie.genre_ids && movie.genre_ids[1]
              ? " / " + this.props.getGenre(movie.genre_ids[1])
              : null}
          </h6>
        </div>
      );
    }
  }

  export default Card;