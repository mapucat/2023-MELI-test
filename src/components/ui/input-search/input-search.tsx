import React from 'react'

import Lens from '../../../assets/images/search36.png'
import './input-search.scss'

interface Props {
  /**
   * input name
   */
  label: string

  /**
   * input value
   */
  value: string

  /**
   * On change
   */
  onChange: (value: string) => void

  /**
   * On change
   */
  onClick: () => void

  /**
   * Additional properties
   */
  [x: string]: any
}

const UIInputSearch: React.FC<Props> = ({ label, value, onChange, onClick }: Props) => {
  /**
   * Gets event and passes it to the onChange function
   * @param event - initial onChange event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement
    onChange(value)
  }

  return (
    <div className='ui-input-search'>
      <input
        aria-label={label}
        value={value}
        placeholder='Nunca dejes de buscar'
        onChange={handleOnChange}
        type='text'
        autoComplete='on'
      />
      <button onClick={() => { onClick() }}>
        <img src={Lens} alt='Ícono de búsqueda'></img>
      </button>
    </div>
  )
}

export default UIInputSearch
