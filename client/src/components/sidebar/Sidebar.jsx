import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Blackcoffer-logo-new.png'

const Sidebar = () => {

    return (
        <ul className='font-serif text-xs md:text-xl gap-2 flex flex-col px-2 py-8' >
            <img src={logo} width={98} alt="" srcset="" />
            <hr />
            <NavLink style={({ isActive }) => ({
                color: isActive ? '#fff' : '#545e6f',
                background: isActive ? '#7600dc' : '#f0f0f0',
            })} to="/" >
                Dashboard
            </NavLink>
            <hr />
            <NavLink style={({ isActive }) => ({
                color: isActive ? '#fff' : '#545e6f',
                background: isActive ? '#7600dc' : '#f0f0f0',
            })} to="/filter" >
                Filters
            </NavLink>
            <hr />
        </ul>

    );
};

export default Sidebar;
