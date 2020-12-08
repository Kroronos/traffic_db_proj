import React, { Component } from 'react';
import { Geochart } from '../../Geochart';
import Trendline from '../../Trendline';


import { Tab, Tabs } from 'react-bootstrap';

class ExplorationPage extends Component {
  
    render() {
        return (
          <div>
            <Tabs defaultActiveKey="trendline" id="uncontrolled-tab-example">
              <Tab eventKey="trendline" title="Trendline">
                <Geochart></Geochart>
              </Tab>
              <Tab eventKey="geochart" title="Geochart">
                <Geochart></Geochart>
              </Tab>
            </Tabs>              
          </div>
        );
      }
}

export default ExplorationPage;
