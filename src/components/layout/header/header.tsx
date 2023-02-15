import './header.scss'

import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import Logo from '../../../assets/images/logo106x72.png'
import InputSearch from '../../ui/input-search/input-search'

interface Props {

  /**
   *
   */
  className?: string

  /**
   * Additional properties
   */
  [x: string]: any
}

const Header: React.FC<Props> = () => {
  const [query, setQuery] = useState<string>('')
  const navigate = useNavigate()

  /**
   * Redirect to items page on submit
   */
  const handleSubmit = (): void => {
    navigate(`/items?search=${query}`)
  }

  return (
    <React.Fragment>
      <header className='header'>
        <div className='header__container'>
          <Link to="/" className='header__logo'>
            <img src={Logo} alt='Logo de mercado libre'></img>
          </Link>
          <span>
            <InputSearch label='Buscar' value={query} onChange={setQuery} onClick={handleSubmit}/>
          </span>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
