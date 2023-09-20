import React, { useState, useEffect } from 'react';
import Filters from '../components/filters/Filters';
import DataView from '../components/filters/DataView';
// import data from '../data/jsondata.json';
import { AiFillFilter } from "react-icons/ai"
import logo from '../assets/Blackcoffer-logo-new.png'
import axios from 'axios'

function Filter() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    console.log("hello")

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get('http://localhost:8000/api/coffee', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response)
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error, "errorsssss");
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    console.log(data)



    const intialData = {
        topics: [],
        sectors: [],
        regions: [],
        sources: [],
        countries: [],
        insight: [],
    }

    const [selectedFilters, setSelectedFilters] = useState(intialData);

    const [filterOptions, setFilterOptions] = useState(intialData);

    useEffect(() => {
        console.log("koko unique")
        const uniqueOptions = category =>
            Array.from(new Set(data.map(item => item[category])));

        setFilterOptions({
            topics: uniqueOptions('topic'),
            sectors: uniqueOptions('sector'),
            regions: uniqueOptions('region'),
            sources: uniqueOptions('source'),
            countries: uniqueOptions('country'),
            insight: uniqueOptions('insight'),

        });

    }, [loading]);

    const handleFilterChange = (filterName, selectedOptions) => {
        setSelectedFilters({ ...selectedFilters, [filterName]: selectedOptions });
    };


    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const filteredData = data.filter(item => {
            const topicMatch = selectedFilters.topics.length === 0 || selectedFilters.topics.includes(item.topic);
            const sectorMatch = selectedFilters.sectors.length === 0 || selectedFilters.sectors.includes(item.sector);
            const regionMatch = selectedFilters.regions.length === 0 || selectedFilters.regions.includes(item.region);
            const sourceMatch = selectedFilters.sources.length === 0 || selectedFilters.sources.includes(item.source);
            const countryMatch = selectedFilters.countries.length === 0 || selectedFilters.countries.includes(item.country);
            return topicMatch && sectorMatch && regionMatch && sourceMatch && countryMatch;
        });

        setFilteredData(filteredData);
    }, [selectedFilters]);


    // console.log(filteredData, "filteredData")

    console.log(selectedFilters, "selectedFilters")

    const handleClearFilter = () => {
        setSelectedFilters(intialData);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex min-h-screen w-full gap-4 pt-4">
            {/* <h1>Interactive Dashboard</h1> */}

            <div className=' h-full w-[20%] top-0 gap-12' >

                <div className='flex justify-center items-center gap-16'>
                    <AiFillFilter size={40} />

                    <button
                        onClick={handleClearFilter}
                        className="mt-4 mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
                    >
                        Clear Filters
                    </button>
                </div>


                <Filters
                    label="topics"
                    options={filterOptions.topics}
                    selectedOptions={selectedFilters.topics}
                    onOptionChange={handleFilterChange}
                />

                <Filters
                    label="sectors"
                    options={filterOptions.sectors}
                    selectedOptions={selectedFilters.sectors}
                    onOptionChange={handleFilterChange}
                />

                <Filters
                    label="regions"
                    options={filterOptions.regions}
                    selectedOptions={selectedFilters.regions}
                    onOptionChange={handleFilterChange}
                />

                <Filters
                    label="sources"
                    options={filterOptions.sources}
                    selectedOptions={selectedFilters.sources}
                    onOptionChange={handleFilterChange}
                />

                <Filters
                    label="countries"
                    options={filterOptions.countries}
                    selectedOptions={selectedFilters.countries}
                    onOptionChange={handleFilterChange}
                />




            </div>

            <div className='h-[90vh] flex-1 overflow-y-auto'>
                <DataView data={filteredData} />
            </div>

        </div >
    );
}

export default Filter;
