import React from "react";

function Pagination({productsPerPage, totalProducts, paginate, prevPage, nextPage, currentPage, currentProduct}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return ( 
        <div className="pagination">
            {currentPage === 1 ? <button disabled onClick={() => prevPage()}>prev</button> : <button onClick={() => prevPage()}>prev</button>}
            <ul className="pagination-numbers">
            {pageNumbers.map(number =>
                <li key={number}>
                    <div onClick={() => paginate(number)}>
                        {number}
                    </div>
                </li>)} 
            </ul>
            {currentPage < currentProduct.length - 1 ? <button onClick={() => nextPage()}>next</button> : <button disabled onClick={() => nextPage()}>next</button>}
    </div>
    );
}

export default Pagination;