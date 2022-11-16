import React from "react";

import headerdata from '../../testData/testHeader.json'

const Header = () => (
    <div className="Header">
        <img src={headerdata.src} alt={headerdata.alt} style={headerdata.style}></img>
   
    </div>
)

export default Header;