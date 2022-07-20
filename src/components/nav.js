import React from 'react'
import logo from '../assets/Logo.svg'

const Nav = () => {
  return (
    <div>
      <div className="bg-nav-background h-[67px] md:h-128 lg:h-128 w-full flex justify-center lg:justify-start pl-0  lg:pl-[77px] items-center text-white">
        <div className="hidden md:block lg:block ">
          <img src={logo} alt="Logo" width="193px" height="60px" />
        </div>
        <div className="block md:hidden lg:hidden ">
          <img src={logo} alt="Logo" width="108px" height="33.58px" />
        </div>
      </div>
    </div>
  )
}

export default Nav
