import React from 'react'
import { ReactComponent as LogoBQ } from '../../assets/LOGO.svg';
import { LogoStyle } from './Logo.style';
export default function Logo() {
  return (
    <LogoStyle>
      <LogoBQ className='icon'/>
    </LogoStyle>
  )
}