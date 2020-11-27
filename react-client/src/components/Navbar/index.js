import React from 'react';
import {Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks} from './NavbarElements';

export const Navbar = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>Accident Trends</NavLogo>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='/explore'>Explore </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/sources'>Sources </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/'>Contact Us </NavLinks>
                        </NavItem>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
};
