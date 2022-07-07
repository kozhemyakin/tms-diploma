import React from "react";

function Pagination({productsPerPage, totalProducts, paginate, prevPage, nextPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return ( 
        <div className="pagination">
            <button onClick={() => prevPage()}>prev</button>
            <ul className="pagination-numbers">
            {pageNumbers.map(number =>
                <li key={number}>
                    <div onClick={() => paginate(number)}>
                        {number}
                    </div>
                </li>)} 
            </ul>
        <button onClick={() => nextPage()}>next</button>
    </div>
    );
}

export default Pagination;