import React from 'react'

export const Filter = () => {
  return (
    <div className='filters'>
        <select className='select'>
            <option value="" disabled >Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <div className='filter'>
            <span className="material-icons">
                filter_alt  
            </span>
        </div>
        <div className="refresh">
            <span className="material-icons">
                refresh
            </span>
        </div>
    </div>
  )
}
