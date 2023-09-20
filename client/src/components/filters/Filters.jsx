import React, { useState } from 'react';

const Filters = ({ label, options, selectedOptions, onOptionChange }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        onOptionChange(label, selectedValues);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="flex flex-col relative bg-blue-200 px-4 py-2 rounded">
            <div className='flex justify-between items-center'>
                <div className="mb-2 font-bold uppercase">{label}</div>
                <button onClick={toggleDropdown}> {isDropdownVisible ? 'Hide' : 'Show'}</button>
            </div>
            {isDropdownVisible && (
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded py-2 px-3 mb-2 focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <select
                        multiple
                        value={selectedOptions}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-400 h-[250px] w-52"
                    >
                        {filteredOptions.map((option, index) => (
                            <option className='' key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Filters;
