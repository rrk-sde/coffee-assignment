import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';


const PieChart = ({ data }) => {

    const [showLegend, setShowLegend] = useState(false);
    const countryData = data.reduce((acc, item) => {
        if (item.country) {
            acc[item.country] = (acc[item.country] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(countryData).map(country => ({
        x: country,
        y: countryData[country],
    }));

    const chartOptions = {
        labels: chartData.map(item => item.x),
        legend: { position: 'bottom', show: showLegend },
    };

    return (
        <div className="chart-container">

            <ReactApexChart options={chartOptions} series={chartData.map(item => item.y)} type="pie" height={350} />
            <button
                onClick={() => setShowLegend(!showLegend)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Toggle Legend
            </button>
        </div>
    );
};

export default PieChart;
