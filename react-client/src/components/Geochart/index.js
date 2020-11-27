import Chart from "react-google-charts";
import React from 'react';

export const Geochart = () => {
    return (
        <>
            <Chart
                width={'500px'}
                height={'300px'}
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
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyDym1I40GwcAx2NWwtPXAasfQEhvVvjTls"
                rootProps={{ 'data-testid': '1' }}
            />
        </>
    )
};