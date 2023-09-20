import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ data }) => {

    const recentYear = data
        .map(item => item.start_year)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .slice(0, 10);

    console.log(recentYear)


    const calculateTotalForProperty = (property) => {
        const totalValues = recentYear.map(year => {
            const yearData = data.filter(item => item.start_year === year);

            console.log(yearData);

            const total = yearData.reduce((acc, item) => {
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
            data: intensityData,
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
            categories: recentYear,
        },
        yaxis: {
            title: {
                text: 'Value',
            },
            forceNiceScale: false,
            min: 0,
            max: 5000,
        },
        legend: {
            position: 'top',
        },
    };

    return (
        <div className="chart-container">

            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
            />
        </div>
    );
};

export default LineChart;
