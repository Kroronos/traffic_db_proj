import React from 'react';
import {Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, NavExtLinks} from './NavbarElements';

export const Navbar = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>Accident Trends</NavLogo>
                    <NavMenu>
                        <NavItem>
                            <NavExtLinks href='https://github.com/Kroronos/traffic_db_proj'>Contribute </NavExtLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/sources'>Sources </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavExtLinks href='https://github.com/Kroronos/traffic_db_proj'>Contact Us </NavExtLinks>
                        </NavItem>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
};
