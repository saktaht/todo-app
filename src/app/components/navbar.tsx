import React from 'react'
import { ReactElement } from 'react';
import { GiAchievement } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { NavItem } from '../@types/navItem';
import { IconContext } from 'react-icons'

export const Navbar = (): JSX.Element => {
  const data: NavItem[] = [
    {title: 'ホーム', icon: <FaHome />, link: '/'},
    {title: '達成', icon: <GiAchievement />, link: '/'},
    {title: '合計時間', icon: <CiTimer />, link: '/'},
  ]

  return (
    <div>
    {/* <input id="menu" type="checkbox" className="absolute -left-10 "/>
      <label htmlFor="menu" className="block absolute text-100 sm:hidden">≡</label>
      <label htmlFor="menu" className="back"></label> */}
      <aside>
        {/* <label htmlFor="menu" className="block sm:hidden">×</label> */}
          {/* <nav className='h-screen md:max-w-none md:w-1/6 max-w-32 bg-blue-300'> */}
          <nav className='h-screen bg-blue-300'>
            <ul className='h-full grid grid-rows-4'>
              {data.map((item, index) => (
                <li 
                  key={index} 
                  className='cursor-pointer hover:bg-sky-300 grid place-items-center  border-t-4 '
                >
                    {item.icon}
                  <a href={item.link} className='text-lg'>
                    {item.title}
                  </a>
                </li>
              ))}
              <li className="border-t-4 text-center">
                2024 © All rights reserved.
                ここはフッター
              </li>
            </ul>         
          </nav>
      </aside>
    </div>
  )
}
