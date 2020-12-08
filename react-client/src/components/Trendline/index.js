import Chart from "react-google-charts";
import React, { Component } from 'react';


class Trendline extends Component {
    constructor() {
        super();
        this.state = {
            dataLoadingStatus: 'loading',
            chartData: null,
        };
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ dataLoadingStatus: 'ready', chartData: (res.express.map((item) => [new Date(item.STARTYEAR, item.STARTMONTH), item.ACCIDENTCOUNT]))}))
          .catch(err => console.log(err));
    }
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/accidentsvstime');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        console.log(body);
        return body;
    };
    render() {
        if(this.state.chartData && this.state.dataLoadingStatus === 'ready') {

            var chartData = [['Date', 'Accidents']];
            for(var index = 0; index < this.state.chartData.length; index++) {
                chartData = chartData.concat([this.state.chartData[index]]);
            }

            console.log(this.state.chartData);
            console.log(chartData);


            return(
                <>
                <Chart
                backgroundColor='#808080'
                chartType="ScatterChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    width: 500,
                    height: 300,
                    title: 'Number of Accidents vs Time',
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
                    'chartArea': {
                        'backgroundColor': {
                            'fill': '#F4F4F4',
                            'opacity': 100
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

export default Trendline;