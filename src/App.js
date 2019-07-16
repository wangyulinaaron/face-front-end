import React from 'react';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

const params={
      "particles": {
          "number": {
              "value": 150
          },
      "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }

const app = new Clarifai.App({
 apiKey: '7d843087422d48f6ae43e35efad8dc52'
});

const initialState = {
      input: '',
      imageUrl:'',
      box: {},
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
}

class App extends React.Component {
  constructor() {
    super();
    this.state=initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState ({
      input: event.target.value
    })
  }

  onButtonChange = () => {
    this.setState ({
      imageUrl: this.state.input
    })
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('https://safe-plains-37176.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
      if(route === 'signout'){
        this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={params} />
        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={ this.state.isSignedIn } />
        <Logo />
        { this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={ this.onRouteChange }/>
          : ( this.state.route === 'home'
              ? <div>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonChange={this.onButtonChange} />
                  <ImageDisplay imageUrl={ this.state.imageUrl } box={this.state.box}/>
                </div>
              : <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>  
            )                   
        }
      </div>
    );
  }
}

export default App;
