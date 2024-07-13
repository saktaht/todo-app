import React, { Children } from 'react'
import { ButtonProps } from '../types/button'

type ColorClasses = {
  [key in ButtonProps['color']]: string;
};

const colorClasses: ColorClasses = {
  red: 'bg-red-500 hover:bg-red-600',
  green: 'bg-green-500 hover:bg-green-600',
  blue: 'bg-blue-500 hover:bg-blue-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  indigo: 'bg-indigo-500 hover:bg-indigo-600',
  black: 'bg-black-500 hover:bg-black-600',
  white: 'bg-white-500 hover:bg-white-600',
};

export const Button = ({ color, children, ...rest }: ButtonProps) => {
  return (
    <div>
      <button 
        type="button" 
        className={`rounded-md text-white font-bold md:px-6 md:py-3 px-4 py-2  ${colorClasses[color]}`} 
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
