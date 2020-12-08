import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Trendline from '../../Trendline';

class MainPage extends Component {
  
  constructor() {
    super();
    this.state = {
      count: null
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ count: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/tuples_count');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {

    

    return(
      <>
      <Jumbotron>
        <h1>Accidents happen</h1>
        <p>
          but using data about accidents we can understand trends related to them. These trends can help grant insight into why accidents happen and may give hints as to how we may be able to prevent them.
        </p>
      </Jumbotron>
      <Container className="p-3 d-flex justify-content-center">
        <Trendline></Trendline>
      </Container>

      <Jumbotron>
        <Container className="p-3 d-flex justify-content-center">
          <Trendline></Trendline>
        </Container>
      </Jumbotron>
      <Container className="p-3 d-flex justify-content-center">
          <Trendline></Trendline>
        </Container>
      </>
    );


    if(this.state.count) {
      return (
        <div>
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">{this.state.count[0].TUPLECOUNT} Accidents</h1>
            </div>
            <div><Trendline></Trendline></div>
          </div>
        </div>
      );
    }

      return (
        <div>
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">{this.props.count} Accidents</h1>
            </div>
          </div>
          <div><Trendline></Trendline></div>
         
        </div>
      );
  }
}

export default MainPage;
