import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ data }) => {
    const topSectors = data
        .map(item => item.sector)
        .filter((value, index, self) => self.indexOf(value) === index)
        .slice(0, 10);

    console.log(topSectors)


    const calculateTotalForProperty = (property) => {
        const totalValues = topSectors.map(sector => {
            const sectorData = data.filter(item => item.sector === sector);

            console.log(sectorData);

            const total = sectorData.reduce((acc, item) => {
                const value = parseInt(item[property]);
                if (!isNaN(value)) {
                    return acc + value;
                } else {
                    return acc;
                }
            }, 0);

            return total;
        });

        return totalValues;
    }

    const intensityData = calculateTotalForProperty('intensity');
    console.log(intensityData);

    const likelihoodData = calculateTotalForProperty('likelihood');
    console.log(likelihoodData);

    const relevanceData = calculateTotalForProperty('relevance');
    console.log(relevanceData);


    const chartSeries = [
        {
            name: 'Intensity',
            data: intensityData
        },
        {
            name: 'Likelihood',
            data: likelihoodData,
        },
        {
            name: 'Relevance',
            data: relevanceData,
        },
    ];

    const chartOptions = {
        xaxis: {
            categories: topSectors.map(sector => sector === '' ? 'NotAnySector' : sector),
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            offsetY: 10,
        },
    };

    return (
        <div className="chart-container">

            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default BarChart;
