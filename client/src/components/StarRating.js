import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import React,  { Component} from 'react';

export default class FiveStarsRating extends Component {
    constructor(props) {
      super(props);
      this.state = { currRating: 0, hoverRating: 0};
    }

    reset(){
      this.setState({ currRating: 0, hoverRating: 0});
    }
    
    currentRating(){
      return this.state.currRating;
    }

    onHover(index) {
        this.setState({ hoverRating: index + 1 }); 
    }
    onMouseLeave() {
        this.setState({ hoverRating: 0 });
    }
  
    onClick(index) {
      this.setRating(index+1);
    }
  
    setRating(ratingValue) {
      this.setState({ currRating: ratingValue, hoverRating: 0  });
    }
  
    starColor(index) {
      return (this.state.currRating > index || this.state.hoverRating > index) ? 'gold' : 'gray';
    }

    render() {
      return [...Array(5).keys()].map((index) => (
        <span key={index} style={{ color: this.starColor(index), flexDirection: 'row' }}>
          <FontAwesomeIcon
            icon={faStar}
            style={{ height: '40px', cursor: 'pointer' }}
            onClick={() => this.onClick(index)}
            onMouseOver={() => this.onHover(index)}
            onMouseLeave={() => this.onMouseLeave()}
          />
        </span>
      ));
    }
  }