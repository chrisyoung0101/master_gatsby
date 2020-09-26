import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }
  /*tilt*/
  li {
    transform: rotate(-2deg);
    order: 1;
  }
  li {
    /* here we create a css variable --rotate and then overwrite it on specific children */
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    /*Hot Now*/
    &:nth-child(1) {
      --rotate: 1deg;
    }
    /*Pizza Menu*/
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    /*Slicemasters*/
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    /*rotate on hover*/
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
