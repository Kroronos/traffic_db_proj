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

class Trendline extends Component {
    constructor() {
        super();
        this.state = {
            stateQuery: 'FL',
            featureQuery: 'crossing',
            dataLoadingStatus: 'loading',
            chartData: null,
        };
    }

    setFeatureName(item) {
        if(item[0]) {
            var convertedItem = item[0].value.split(" ").join("");
            this.setState({featureQuery: convertedItem, dataLoadingStatus: 'loading'});
            this.componentDidMount();
        }
    }

    setStateName(item) {
        let items = new Map([
            ['Alaska', 'AL'],
            ['Arkansas', 'AR' ],
            ['Arizona', 'AZ' ],
            ['California', 'CA' ],
            ['Colorado', 'CO' ],
            ['Connecticut', 'CT' ],
            ['District of Columbia', 'DC'],
            ['Delaware', 'DE' ],
            ['Florida',  'FL' ],
            ['Georgia', 'GA' ],
            ['Iowa', 'IA' ],
            ['Idaho', 'ID' ],
            ['Illinois', 'IL' ],
            ['Indiana', 'IN' ],
            ['Kansas', 'KS' ],
            ['Kentucky', 'KY' ],
            ['Louisiana', 'LA' ],
            ['Massachusetts', 'MA' ],
            ['Maryland', 'MD' ],
            ['Maine', 'ME' ],
            ['Michigan', 'MI' ],
            ['Minnesota', 'MN' ],
            ['Montana', 'MO' ],
            ['Mississippi', 'MS' ],
            ['North Carolina', 'NC' ],
            ['North Dakota', 'ND' ],
            ['Nebraska', 'NE' ],
            ['New Hampshire', 'NH' ],
            ['New Jersey', 'NJ' ],
            ['New Mexico', 'NM' ],
            ['Nevada', 'NV' ],
            ['New York', 'NY' ],
            ['Ohio', 'OH' ],
            ['Oklahoma', 'OK' ],
            ['Oregon', 'OR' ],
            ['Pennsylvania', 'PA' ],
            ['Rhode Island', 'RI' ],
            ['South Carolina', 'SC' ],
            ['South Dakota', 'SD' ],
            ['Tennessee', 'TN' ],
            ['Texas', 'TX' ],
            ['Utah', 'UT' ],
            ['Virginia','VA' ],
            ['Vermont', 'VT' ],
            ['Washington', 'WA' ],
            ['Wisconsin','WI' ],
            ['West Virginia', 'WV' ],
            ['Wyoming', 'WY'],
        ]);

        console.log("Item val ")
        console.log(item);
        if(item[0]) {
            var convertedItem = items.get(item[0].value);
            this.setState({stateQuery: convertedItem, dataLoadingStatus: 'loading'});
            this.componentDidMount();
        }
    }


    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
          .then(res => this.setState({ dataLoadingStatus: 'ready', chartData: (res.express.map((item) => [new Date(item.STARTYEAR, 1), item.ACCIDENTCOUNT]))}))
          .catch(err => console.log(err));
    }
    
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        ///numberOfAccidentsByStateFeature?state='+ this.state.stateQuery +' &feature='+this.state.featureQuery
        const response = await fetch('/numberOfAccidentsByStateFeature?state='+ this.state.stateQuery +'&feature='+this.state.featureQuery);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message) 
        }
        console.log("query =" + 'numberOfAccidentsByStateFeature?state='+ this.state.stateQuery +'&feature='+this.state.featureQuery)
        console.log("Trendline2 res " + body);
        return body;
    };
    render() {
        if(this.state.chartData && this.state.chartData.length > 0 && this.state.dataLoadingStatus === 'ready') {

            var chartData = [['Date', 'Accidents']];
            for(var index = 0; index < this.state.chartData.length; index++) {
                chartData = chartData.concat([this.state.chartData[index]]);
            }

            console.log(this.state.chartData);
            console.log(chartData);
            
            let featureItems = [
                { id: 0, value: 'Bump'},
                { id: 1, value: 'Crossing'},
                { id: 2, value: 'Junction'},
                { id: 3, value: 'Roundabout'},
                { id: 4, value: 'Turning Loop'},
                { id: 5, value: 'Traffic Calming'},
                { id: 6, value: 'Traffic Signal'},
            ]

            let stateItems = [
                { id: 0, value: 'Alaska'},
                { id: 1, value: 'Arkansas' },
                { id: 2, value: 'Arizona' },
                { id: 3, value: 'California' },
                { id: 4, value: 'Colorado' },
                { id: 5, value: 'Connecticut' },
                { id: 6, value: 'District' },
                { id: 7, value: 'Delaware' },
                { id: 8, value: 'Florida' },
                { id: 9, value: 'Georgia' },
                { id: 10, value: 'Iowa' },
                { id: 11, value: 'Idaho' },
                { id: 12, value: 'Illinois' },
                { id: 13, value: 'Indiana' },
                { id: 14, value: 'Kansas' },
                { id: 15, value: 'Kentucky' },
                { id: 16, value: 'Louisiana' },
                { id: 17, value: 'Massachusetts' },
                { id: 18, value: 'Maryland' },
                { id: 19, value: 'Maine' },
                { id: 20, value: 'Michigan' },
                { id: 21, value: 'Minnesota' },
                { id: 22, value: 'Montana' },
                { id: 23, value: 'Mississippi' },
                { id: 24, value: 'Carolina' },
                { id: 25, value: 'North' },
                { id: 26, value: 'Nebraska' },
                { id: 27, value: 'Hampshire' },
                { id: 28, value: 'New Jersey' },
                { id: 29, value: 'New Mexico' },
                { id: 30, value: 'Nevada' },
                { id: 31, value: 'New York' },
                { id: 32, value: 'Ohio' },
                { id: 33, value: 'Oklahoma' },
                { id: 34, value: 'Oregon' },
                { id: 35, value: 'Pennsylvania' },
                { id: 36, value: 'Rhode Island' },
                { id: 37, value: 'South Carolina' },
                { id: 38, value: 'South Dakota' },
                { id: 39, value: 'Tennessee' },
                { id: 40, value: 'Texas' },
                { id: 41, value: 'Utah' },
                { id: 42, value: 'Virginia' },
                { id: 43, value: 'Vermont' },
                { id: 44, value: 'Washington' },
                { id: 45, value: 'Wisconsin' },
                { id: 46, value: 'West Virginia' },
                { id: 47, value: 'Wyoming' }, 
              ]

            return(
                <>
                <Container className="p-3 justify-content-center">
                <Row>
                    <Col>
                    <div>
                    <Search items={stateItems}
                    placeholder='Pick a state'
                    maxSelected={1}
                    multiple={false}
                    onItemsChanged={this.setStateName.bind(this)} />
                    </div>
                    </Col>

                    <Col>
                    <div>
                    <Search items={featureItems}
                    placeholder="Pick a feature"
                    maxSelected={1}
                    multiple={false}
                    onItemsChanged={this.setFeatureName.bind(this)} />
                </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center"> 
                <Chart
                backgroundColor='#808080'
                chartType="ScatterChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    width: 500,
                    height: 300,
                    title: 'Number of Accidents at ' + (this.state.featureQuery.toString().charAt(0).toUpperCase() + this.state.featureQuery.slice(1)).toString() + 's in ' + this.state.stateQuery,
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