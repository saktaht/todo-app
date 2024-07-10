import React from 'react'

export const Input = (): React.JSX.Element => {
  return (
    <div className=''>
      <form action="" autoComplete="on">
        <input 
        type="text" 
        size={70}
        className="border-2 border-blue-500 rounded-md p-4" 
        placeholder='ここにやることを書いてください'
        />
      </form>
    </div>
  )
}
