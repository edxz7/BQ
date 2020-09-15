import React from 'react'
import { Nav, Anchor } from 'grommet';
// import { GoTasklist, GoPencil } from 'react-icons/go';
import { Clipboard, FormEdit } from 'grommet-icons';
import { NavbarStyle } from './Navbar.style';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <NavbarStyle>
      <Nav gap="large" margin={{vertical:"medium"}} direction="row" pad="small" round="large" background="accent-2" >
          <Link to='/orders'><Anchor as="span" color="accent-3" icon={<FormEdit size="medium" />} /></Link>
          <Link to='/orders-kitchen'><Anchor as="span" color="accent-3" icon={<Clipboard size="medium" />}  /></Link>
      </Nav>
    </NavbarStyle>
  )
}