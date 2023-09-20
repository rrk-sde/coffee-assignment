import React from 'react';
import ReactApexChart from 'react-apexcharts';

const IntensityChart = ({ data }) => {
    // Sample a subset of the data for visualization
    const sampleSize = 50; // Adjust this based on your needs
    const sampledData = data.slice(0, sampleSize);

    const insightIntensities = sampledData.map(item => item.intensity);

    const options = {
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: insightIntensities.map((_, index) => `Insight ${index + 1}`)
        },
        yaxis: {
            title: {
                text: 'Intensity'
            }
        }
    };

    const series = [{
        name: 'Intensity',
        data: insightIntensities
    }];

    return (
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    );
};

export default IntensityChart;
