import React from 'react';

const Navbar = ({ onRoleChange }) => {
  return (
    <div className="navbar">
      <h1> Greenpass (A E-Waste Recycling Prototype)</h1>
      
      <div>
        <button className="nav-button" onClick={() => onRoleChange('citizen')}>Citizen</button>
        <button className="nav-button" onClick={() => onRoleChange('kabadiwala')}>Kabadiwala</button>
        <button className="nav-button" onClick={() => onRoleChange('recycler')}>Recycler</button>
      </div>
    </div>
  );
};

export default Navbar;