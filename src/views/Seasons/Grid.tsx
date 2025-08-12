import React from 'react'

const Grid = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {children}
    </div>
  )
}

export default Grid