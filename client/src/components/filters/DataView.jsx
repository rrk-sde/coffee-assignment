import React, { useState } from 'react';
import { PaginationButton, PaginationEllipsis } from './PaginationButton';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'


const DataView = ({ data }) => {

    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <div className="">
            <h2 className='bg-blue-100 font-semibold shadow-md px-2 text-2xl'>Data View</h2>
            <ul className='list-disc list-inside h-[75vh]'>
                {currentData.map((item, index) => (
                    <li className='py-1' key={index}>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className="bg-green-200 gap-4 mt-4 flex justify-center items-center">
                {currentPage > 1 && <PaginationButton onClick={() => handlePageChange(currentPage - 1)}><AiFillStepBackward /></PaginationButton>}
                {currentPage !== 1 && <PaginationButton onClick={() => handlePageChange(1)} isActive={currentPage === 1}>1</PaginationButton>}
                {currentPage > 4 && <PaginationEllipsis />}
                {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => (
                    <PaginationButton key={currentPage + i} onClick={() => handlePageChange(currentPage + i)} isActive={currentPage === currentPage + i}>
                        {currentPage + i}
                    </PaginationButton>
                ))}
                {currentPage < totalPages - 3 && <PaginationEllipsis />}
                {totalPages > 1 && <PaginationButton key={totalPages} onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>{totalPages}</PaginationButton>}
                {currentPage < totalPages && <PaginationButton onClick={() => handlePageChange(currentPage + 1)}><AiFillStepForward /></PaginationButton>}
            </div>


        </div>
    );
};

export default DataView;
