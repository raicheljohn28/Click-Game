import React, { Component } from 'react';
import './App.css';
import cats from './cats.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import CatCard from './components/CatCard'

class App extends Component {
  state = {
    message: "Click an image to begin!!",
    topScore: 0,
    currentScore: 0,
    cats: cats,
    unselectedCats: cats
  }

  componentDidMount() {

  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

selectCat = breed => {
  const findCat = this.state.unselectedCats.find(item => item.breed === breed);

  if(findCat === undefined) {
      // failure to select a new dog
      this.setState({ 
          message: "You guessed incorrectly!",
          topScore: (this.state.currentScore > this.state.topScore) ? this.state.currentScore : this.state.topScore,
          currentScore: 0,
          cats: cats,
          unselectedCats: cats
      });
  }

  else {
    // success to select a new dog
    const newCats = this.state.unselectedCats.filter(item => item.breed !== breed);
    
    this.setState({ 
        message: "You guessed correctly!",
        currentScore: this.state.currentScore + 1,
        cats: cats,
        unselectedCats: newCats
    });
}

this.shuffleArray(cats);
};

  render() {
    return (
      <Wrapper>
      <Navpills
      message={this.state.message}
      currentScore={this.state.currentScore}
      topScore={this.state.topScore}
      />
      <Title />
      {
        this.state.cats.map(cat => (
          <CatCard
          breed={cat.breed}
          image={cat.image}
          selectCat={this.selectCat}
          currentScore={this.state.currentScore}
          />

        ))
      }
      </Wrapper>
    );
  }
}

export default App;
