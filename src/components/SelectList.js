import React from 'react'

const SelectList = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={onChange} className="w-600">
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

export default SelectList
