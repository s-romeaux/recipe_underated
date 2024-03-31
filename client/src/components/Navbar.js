import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    background: #1A3240;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    margin-right: 10px; /* Adjust margin as needed */
`;

const MenuContainer = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled(Link)`
    color: #F1F2CC;
    text-decoration: none;
    padding: 0 1rem;
    cursor: pointer;

    &.active {
        color: #F1F2CC; /* Set active link color to match default link color */
    }
`;

const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

const MobileMenuContainer = styled.div`
    position: absolute;
    top: 80px;
    right: 10px; /* Adjust position */
    background: #1A3240;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    padding: 10px;
    border-radius: 5px;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

const LoginPopup = styled.div`
    position: absolute;
    top: 80px;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    z-index: 999;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #1A3240;
    color: #F1F2CC;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const toggleLogin = () => {
        setLoginOpen(!isLoginOpen);
    };

    return (
        <Nav>
            <LogoContainer>
                <Logo src='/images/samich.jpg' alt="Logo" className="logo" />
                <img src='/images/name.svg' alt="Logo" className="name-logo" />
            </LogoContainer>
            <MenuContainer>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/add-recipe">Add Recipe</NavLink>
                <NavLink onClick={toggleLogin}>Login</NavLink>
            </MenuContainer>
            <Bars onClick={toggleMenu} />
            <MobileMenuContainer isOpen={isMenuOpen}>
                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/add-recipe" onClick={toggleMenu}>Add Recipe</NavLink>
                <NavLink onClick={toggleLogin}>Login</NavLink>
            </MobileMenuContainer>
            <LoginPopup isOpen={isLoginOpen}>
                <form>
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit">Sign In</Button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </LoginPopup>
        </Nav>
    );
}

export default Navbar;
