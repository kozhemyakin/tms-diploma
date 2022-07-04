import React from "react";

function Pagination({productsPerPage, totalProducts, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return ( 
        <div>
        <ul className="pagination">
           {pageNumbers.map(number =>
            <li key={number}>
                <div onClick={() => paginate(number)}>
                    {number}
                </div>
            </li>)} 
        </ul>
    </div>
    );
}

export default Pagination;