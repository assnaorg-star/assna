'use client'

import { useState, useRef, useEffect } from 'react'

interface CustomSelectProps {
  id?: string
  name?: string
  required?: boolean
  options: { label: string; value: string }[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function CustomSelect({
  id,
  name,
  required,
  options,
  placeholder = 'Select an option',
  value,
  defaultValue,
  onChange
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : (defaultValue || ''))
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentValue = value !== undefined ? value : internalValue

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue: string) => {
    setInternalValue(optionValue)
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }

  const selectedOption = options.find((opt) => opt.value === currentValue)
  const displayLabel = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} id={id} value={currentValue} required={required} />
      
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''} ${!currentValue ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#c8a84b" className={`custom-select-arrow ${isOpen ? 'open' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <ul className="custom-select-options">
          {placeholder && !required && (
            <li 
              className={`custom-select-option ${currentValue === '' ? 'selected' : ''}`}
              onClick={() => handleSelect('')}
            >
              {placeholder}
            </li>
          )}
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-select-option ${currentValue === opt.value ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
