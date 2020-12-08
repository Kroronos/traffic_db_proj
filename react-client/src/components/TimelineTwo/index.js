import Chart from "react-google-charts";
import Search from 'react-search'
import React, { Component, PropTypes } from 'react'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class TimelineTwo extends Component {
    constructor() {
        super();
        this.state = {
            dataLoadingStatus: 'loading',
            chartData: null,
            chartDataTwo: null,
            chartDataThree: null,
        };
    }



    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ dataLoadingStatus: 'ready', chartData: (res.express.map((item) => ['First Most', item.CITY, new Date(item.STARTYEAR, 1, 1), new Date(item.STARTYEAR+1, 0, 0)]))
          , chartDataTwo: (res.express.map((item) =>  ['Second Most', item.CITY2, new Date(item.STARTYEAR, 1, 1), new Date(item.STARTYEAR+1, 0, 0)]))
          , chartDataThree: (res.express.map((item) =>  ['Third Most', item.CITY3, new Date(item.STARTYEAR, 1, 1), new Date(item.STARTYEAR+1, 0, 0)]))
        }))
          .catch(err => console.log(err));
    }
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/rankCities');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }

        console.log("Timeline2 res " + body);
        return body;
    };
    render() {
        if(this.state.chartData && this.state.chartData.length > 0 && this.state.dataLoadingStatus === 'ready') {
            console.log("THREE " + this.state.chartDataThree);
            var chartData = [[{type: 'string', id: 'Placement'}, {type: 'string', id: 'Time'}, {type: 'date', id: 'Start'}, {type: 'date', id: 'End'}]];
            for(var index = 0; index < this.state.chartData.length; index++) {
                chartData = chartData.concat([this.state.chartData[index]]);
            }
            if(this.state.chartDataTwo && this.state.chartDataTwo.length > 0) {
                for(var i = 0; i < this.state.chartDataTwo.length; i++) {
                    if(this.state.chartDataTwo[i][1] !== "No Data") {
                        chartData = chartData.concat([this.state.chartDataTwo[i]]);
                    }
                }

            }

            if(this.state.chartDataThree && this.state.chartDataThree.length > 0) {
                for(var j = 0; j < this.state.chartDataThree.length; j++) {
                    chartData = chartData.concat([this.state.chartDataThree[j]]);
                }

            }

            console.log(this.state.chartData);
            console.log(chartData);
            

            return(
                <>
                <Container className="p-3 justify-content-center">
            <Row className="p-3 justify-content-center"><h3>Top Three Cities With The Most Accidents Per Year</h3></Row>
                <Row className="justify-content-md-center"> 
                <Chart
                backgroundColor='#808080'
                chartType="Timeline"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    width: 1000,
                    height: 300,
                    title: 'Top Three Cities With The Most Accidents Per Year',
                    'chartArea': {
                        'backgroundColor': {
                            'fill': '#F4F4F4',
                            'opacity': 100
                         },       
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
                />
                </Row>
               

              
                </Container>
                </>
                
            );
        }
        return (
            <>
            <Chart
            width={'500px'}
            height={'300px'}
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={[['Date', 'Accidents'], [new Date(2019, 1), 100], [new Date(2019, 2), 200], [new Date(2019, 3), 300], [new Date(2019, 4), 600],
             [new Date(2019, 5), 1200], [new Date(2019, 6), 600], [new Date(2019, 7), 300], 
             [new Date(2019, 8), 1200], [new Date(2019, 9), 200], [new Date(2019, 10), 100],
             [new Date(2019, 11), 500], [new Date(2019, 12), 750]]}
            options={{
                title: 'Number of Accidents During 2019',
                crosshair: { trigger: 'both', orientation: 'both' },
                trendlines: {
                0: {
                    type: 'polynomial',
                    degree: 3,
                    visibleInLegend: true,
                    labelInLegend: 'Trend',
                    tooltip: false
                },
                },
            }}
            rootProps={{ 'data-testid': '4' }}
            chartPackages={['corechart', 'controls']}
            />
            </>
        )
    }

}

export default TimelineTwo;