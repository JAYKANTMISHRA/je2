import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 1rem;a
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SelectStyled = styled.select`
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Arrow = styled.button`
    padding: 8px;
    margin: 4px;
    background-color: #ccc;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #333;

    &:hover {
        background-color: #aaa;
    }
`;

const PageNumber = styled.div`
    padding: 8px 12px;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ index, currentPage }) =>
        index === currentPage ? '#a9abac' : '#e6e6e6'};
    color: ${({ index, currentPage }) => (index === currentPage ? '#fff' : '#333')};

    &:hover {
        background-color: ${({ index, currentPage }) =>
            index === currentPage ? '#a9abac' : '#d9d9d9'};
    }
`;

export default function Pagination({ probPerPage, setProbPerPage, totalProb, setCurrentPage, currentPage }) {
    const [currentRangeStart, setCurrentRangeStart] = useState(1);

    const totalPages = Math.ceil(totalProb / probPerPage);

    useEffect(() => {
        // Reset range when current page goes outside the visible window
        if (currentPage < currentRangeStart) {
            setCurrentRangeStart(currentPage);
        } else if (currentPage >= currentRangeStart + 5) {
            setCurrentRangeStart(currentPage - 4);
        }
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleProbPage = (e) => {
        const newVal = parseInt(e.target.value, 10);
        setProbPerPage(newVal);
        setCurrentPage(1);
        setCurrentRangeStart(1);
    };

    return (
        <PaginationContainer>
            <SelectContainer>
                <SelectStyled value={probPerPage} onChange={handleProbPage}>
                    <option value={2}>2/Page</option>
                    <option value={10}>10/Page</option>
                    <option value={20}>20/Page</option>
                </SelectStyled>
            </SelectContainer>

            <PaginationWrapper>
                <Arrow onClick={handlePrev}>&lt;</Arrow>

                {Array.from({ length: Math.min(5, totalPages - currentRangeStart + 1) }, (_, i) => {
                    const pageNumber = currentRangeStart + i;
                    return (
                        <PageNumber
                            key={pageNumber}
                            index={pageNumber}
                            currentPage={currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                        >
                            {pageNumber}
                        </PageNumber>
                    );
                })}

                <Arrow onClick={handleNext}>&gt;</Arrow>
            </PaginationWrapper>
        </PaginationContainer>
    );
}
