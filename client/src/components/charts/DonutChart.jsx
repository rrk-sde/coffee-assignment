import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';


const DonutChart = ({ data }) => {

    const [showLegend, setShowLegend] = useState(false);

    const regionData = data.reduce((acc, item) => {
        if (item.region) {
            acc[item.region] = (acc[item.region] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(regionData).map(region => ({
        x: region,
        y: regionData[region],
    }));

    const chartOptions = {
        labels: chartData.map(item => item.x),
        legend: { position: 'bottom', show: showLegend },
    };

    return (
        <div className="chart-container">

            <ReactApexChart options={chartOptions} series={chartData.map(item => item.y)} type="donut" height={350} />
            <button
                onClick={() => setShowLegend(!showLegend)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Toggle Legend
            </button>

        </div>
    );
};

export default DonutChart;
