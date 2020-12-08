import Chart from "react-google-charts";
import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class Geochart extends Component {
    constructor() {
        super();
        this.state = {
            dataLoadingStatus: 'loading',
            chartData: null,
            startYearQuery: 2017,
        };
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ dataLoadingStatus: 'ready', chartData: (res.express.map((item) => ['US-' + item.STATE, item.ACCIDENTCOUNT]))}))
          .catch(err => console.log(err));
    }
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/windyAccidents?startYear='+this.state.startYearQuery);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        console.log("Geochart body" + body);
        return body;
    };

    handle2016Click = () => this.handleClick(2016);
    handle2017Click = () => this.handleClick(2017);
    handle2018Click = () => this.handleClick(2018);
    handle2019Click = () => this.handleClick(2019);
    handle2020Click = () => this.handleClick(2020);


    handleClick(item) {
        this.setState({startYearQuery: item, dataLoadingStatus: 'loading'});
        this.componentDidMount();
    }

    render() {
        if(this.state.chartData && this.state.dataLoadingStatus === 'ready') {

            var chartData = [['State', 'Accidents']];
            for(var index = 0; index < this.state.chartData.length; index++) {
                chartData = chartData.concat([this.state.chartData[index]]);
            }

            console.log(this.state.chartData);
            console.log(chartData);


            return(
                <>
                <h3>Accidents Across The United States During {this.state.startYearQuery} With Wind Speed > 20 MPH</h3>

                <Chart
                backgroundColor='#808080'
                chartType="GeoChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    region: 'US',
                    displayMode: 'regions',
                    resolution: 'provinces',
                    width: 1000,
                    height: 600,
                    title: 'Monthly Change in the Number of Accidents',
                    'chartArea': {
                        'backgroundColor': {
                            'fill': '#F4F4F4',
                            'opacity': 100
                         },       
                    },
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyDym1I40GwcAx2NWwtPXAasfQEhvVvjTls"
                rootProps={{ 'data-testid': '3' }}
                />

                <Button variant="primary" onClick={this.handle2016Click}>2016</Button>{' '}
                <Button variant="primary" onClick={this.handle2017Click}>2017</Button>{' '}
                <Button variant="primary" onClick={this.handle2018Click}>2018</Button>{' '}
                <Button variant="primary" onClick={this.handle2019Click}>2019</Button>{' '}
                <Button variant="primary" onClick={this.handle2020Click}>2020</Button>{' '}

                </>

                
            );
        }
        return (
            <>
            <Chart
                chartType="GeoChart"
                data={[
                    ['State', 'Accidents'],
                    ['US-AL', 100],
                    ['US-AK', 2],
                    ['US-AR', 3],
                    ['US-AK', 4],
                    ['US-AZ', 5],
                    ['US-Colorado', 500],
                    ['US-CO', 6],
                    ['US-DE', 50],
                    ['US-FL', 1000],
                    ['US-HI', 400],
                    ['US-KS', 300],
                    ['US-KY', 200],
                    ['US-MI', 500],
                    ['US-MO', 800],
                    ['US-MS', 200],
                    ['US-MT', 150],
                    ['US-NE', 0],
                    ['US-NJ', 50],
                    ['US-NM', 2500],
                    ['US-NY', 8000],
                    ['US-OR', 300],
                    ['US-PA', 3000],
                    ['US-TX', 4500],
                    ['US-UT', 4000],
                    ['US-VA', 0],
                    ['US-WA', 0],
                    ['US-WV', 0],
                    ['US-WY', 0],
                ]}
                options={{
                    region: 'US',
                    displayMode: 'regions',
                    resolution: 'provinces',
                    width: 1000,
                    height: 600,
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyDym1I40GwcAx2NWwtPXAasfQEhvVvjTls"
                rootProps={{ 'data-testid': '1' }}
            />
        </>
        )
    }

}

export default Geochart;