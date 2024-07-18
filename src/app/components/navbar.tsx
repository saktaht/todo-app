'use client'

import React from 'react'
import { useContext } from 'react';
import { ReactElement } from 'react';
import { GiAchievement } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { NavItem } from '../@types/navItem';
import { OpenContext } from './openContext';
import { IconContext } from 'react-icons'

export const Navbar = (): JSX.Element => {
  const data: NavItem[] = [
    {title: 'ホーム', icon: <FaHome />, link: '/'},
    {title: '達成', icon: <GiAchievement />, link: '/'},
    {title: '合計時間', icon: <CiTimer />, link: '/'},
  ];
  const { isOpen, handleOpen } = React.useContext(OpenContext);

  return (
    <IconContext.Provider value={{ color: 'black', size: '40px' }}>
      <>
      {/* <label htmlFor="menu" className="block absolute text-100 sm:hidden"> */}
      {!isOpen ? (
        <button 
          type='button' 
          className='h-10 inline md:hidden ml-2 pt-2' 
          onClick={handleOpen}
          >
          {/* メニューボタン */}
          <IoMenu />
        </button>
      ) : (
        <div>
          <aside>
            {/* <label htmlFor="menu" className="block sm:hidden"> */}
            <button 
              type='button' 
              className='h-10 inline md:hidden ml-2 pt-2'
              onClick={handleOpen}
            >
            {/* 閉じるボタン */}
              <TfiClose />
            </button>      
            {/* </label> */}
              <nav className='h-screen'>
                <ul className='h-full grid grid-rows-4 md:static absolute'>
                  {data.map((item, index) => (
                    <li 
                      key={index} 
                      className='cursor-pointer  bg-blue-300 hover:bg-sky-300 grid place-items-center border-t-4 '
                    >
                        {item.icon}
                      <a href={item.link} className='text-lg'>
                        {item.title}
                      </a>
                    </li>
                  ))}
                  <li className=" bg-blue-300 border-t-4 text-center grid place-items-center">
                    2024 © All rights reserved.
                  </li>
                </ul>         
              </nav>
          </aside>
        </div>
        
      )}
      
      {/* </label> */}
      <aside className='hidden md:block'>
            {/* <label htmlFor="menu" className="block sm:hidden"> */}   
            {/* </label> */}
              <nav className='h-screen bg-blue-300'>
                <ul className='h-full grid grid-rows-4'>
                  {data.map((item, index) => (
                    <li 
                      key={index} 
                      className='cursor-pointer hover:bg-sky-300 grid place-items-center border-t-4 '
                    >
                        {item.icon}
                      <a href={item.link} className='text-lg'>
                        {item.title}
                      </a>
                    </li>
                  ))}
                  <li className="border-t-4 text-center">
                    2024 © All rights reserved.
                  </li>
                </ul>         
              </nav>
          </aside>
    </>
    </IconContext.Provider>
    
  )
}
