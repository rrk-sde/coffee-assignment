import React, { useEffect, useState } from 'react'
import PieChart from '../components/charts/PieChart'
import DonutChart from '../components/charts/DonutChart'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import axios from 'axios'
// import jsonData from '../data/jsondata.json';

const Charts = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/coffee', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response)
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    console.log(data)

    // if (loading) {
    //   return <p>Loading...</p>;
    // }

    // if (error) {
    //   return <p>Error: {error.message}</p>;
    // }

    return (
        <>
            <h1 className='font-black text-3xl'>Data Visualization Dashboard</h1>
            {/* <HeatmapChart data={jsonData} /> */}
            <h2 className='font-serif text-xl py-4'>intensity, Likelihood and Relevance By Sector</h2>
            <BarChart data={data} />

            <h2 className='font-serif text-xl py-4'>Country Distribution</h2>
            <PieChart data={data} />
            <h2 className='font-serif text-xl py-4'>Yearly Data of intensity, Likelihood and Relevance</h2>
            <LineChart data={data} />
            <h2 className='font-serif text-xl py-4'>Region-wise Distribution</h2>
            <DonutChart data={data} />


            {/* <IntensityChart data={jsonData} /> */}
        </>
    )
}

export default Charts