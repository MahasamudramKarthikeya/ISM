import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Search = () => {
    let history = useHistory();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        // Check if the keyword matches the XSS code pattern for <a href="javascript:alert('XSS')">Click Here</a>
        const isXSSCode = /<a href="javascript:alert\('XSS'\)">Click Here<\/a>/i.test(keyword);

        if (isXSSCode) {
            // Display dialogue box for the specific XSS code
            displayXSSMessage();
        } else {
            if (keyword.trim()) {
                console.log(keyword);
                history.push(`/lot/${keyword}`);
            } else {
                console.log(`keyword is not defined`);
                history.push("/lot");
            }
        }
    };

    // Function to display appropriate dialogue box for the specific XSS code
    const displayXSSMessage = () => {
        // Display an appropriate message box for the specific XSS code
        alert('XSS Attack: This website is vulnerable!');
    };

    return (
        <>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <i className="fa fa-search"></i>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Looking for an Auction ? Search Now"
                    onChange={(e) => setKeyword(e.target.value)}
                /> 
                <button className="btn btn-primary" type='submit'>Search</button>
            </form>
            {/* Render the link "Click Here" */}
            <div dangerouslySetInnerHTML={{ __html: keyword }}></div>
        </>
    );
};

export default Search;
