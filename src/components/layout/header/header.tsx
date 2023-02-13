import './header.scss'

import { Link } from 'react-router-dom'
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
  const [query, setQuery] = useState('')
  // const navigate = useNavigate()

  /**
   * Redirect to search page on submit
   */
  const onSubmit = (): void => {
    console.log('on Submit')

    // TODO: try redirect
    // navigate({
    //   pathname: 'search',
    //   search: createSearchParams({
    //     q: query
    //   }).toString()
    // })
  }

  return (
    <React.Fragment>
    <header className='header'>
      <div className='header__container'>
        <Link to="/" className='header__logo'>
          <img src={Logo} alt='Logo de mercado libre'></img>
        </Link>
        <form onSubmit={onSubmit}>
          <InputSearch label='Buscar' value={query} onChange={setQuery}/>
        </form>
      </div>
    </header>
    </React.Fragment>
  )
}

export default Header
