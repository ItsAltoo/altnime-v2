import React from 'react'

const Grid = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="grid grid-cols-5 gap-5 px-2">
      {children}
    </div>
  )
}

export default Grid