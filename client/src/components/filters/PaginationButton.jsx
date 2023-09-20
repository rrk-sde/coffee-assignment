import React from 'react'

const PaginationButton = ({ onClick, isActive, children }) => {

    const active = `bg-blue-400`
    return (

        <button
            onClick={onClick}
            className={`shadow-md px-4 py-2 hover:bg-white ${isActive ? active : ''}`}
        >
            {children}
        </button>
    )


};

const PaginationEllipsis = () => <span className="pagination-ellipsis">...</span>;


export { PaginationButton, PaginationEllipsis }