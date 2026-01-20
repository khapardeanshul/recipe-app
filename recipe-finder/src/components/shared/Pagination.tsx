import React from 'react';
import Button from './Button';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) =>{
    return (
        <div className='pagination'>
            <Button
            variant='secondary'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage===1}
            >
            Previous
            </Button>

            <span className='pagination-info'>
                Page {currentPage} of {totalPages}
            </span>

            <Button 
                variant='secondary'
                onClick={() => {onPageChange(currentPage + 1)}}
                disabled={currentPage===totalPages}
            >
                Next
            </Button>

        </div>
    );
};

export default Pagination;