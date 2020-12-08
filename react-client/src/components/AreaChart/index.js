import Chart from "react-google-charts";
import React, { Component } from 'react';


class AreaChart extends Component {
    constructor() {
        super();
        this.state = {
            dataLoadingStatus: 'loading',
            chartData: null,
            chartTitle: null,
        };
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ dataLoadingStatus: 'ready', chartTitle: (res.express.map((item) => ['Date', item.CITY, item.CITY2, item.CITY3])),chartData: (res.express.map((item) => [new Date(item.STARTYEAR, 0), item.ACCIDENTCOUNT, item.ACCIDENTCOUNT2, item.ACCIDENTCOUNT3]))}))
          .catch(err => console.log(err));
    }
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/stackedCities');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        console.log(body);
        return body;
    };
    render() {
        if(this.state.chartData && this.state.dataLoadingStatus === 'ready') {

            var chartData = [this.state.chartTitle[0]];
            for(var index = 0; index < this.state.chartData.length; index++) {
                chartData = chartData.concat([this.state.chartData[index]]);
            }

            console.log(this.state.chartData);
            console.log(chartData);


            return(
                <>
                <Chart
                backgroundColor='#808080'
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    width: 1000,
                    height: 600,
                    title: 'Accidents In Three Cities',
                    'chartArea': {
                        'backgroundColor': {
                            'fill': '#F4F4F4',
                            'opacity': 100
                         },       
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
                chartPackages={['corechart', 'controls']}
                controls ={[
                    {
                        controlType: 'DateRangeFilter',
                        options: {
                            filterColumnLabel: 'Date',
                            ui: {format: {patern: 'yyyy'}}
                        }
                    }
                ]}
                />
                </>
            );
        }
        return (
            <>
            <Chart
            width={'1000px'}
            height={'600px'}
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
            controls ={[
                {
                    controlType: 'DateRangeFilter',
                    options: {
                        filterColumnLabel: 'Date',
                        ui: {format: {patern: 'yyyy'}}
                    }
                }
            ]}
            />
            </>
        )
    }

}

export default AreaChart;