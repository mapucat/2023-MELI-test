import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../layout/header/header'
import './default.scss'

interface Props {
  /**
   * component className
   */
  className?: string

  /**
   * Additional properties
   */
  [x: string]: any
}

const DefaultTemplate: React.FC<Props> = () => {
  return (
    <>
      <Header></Header>
      <main className="default-template">
        <Outlet/>
      </main>
    </>
  )
}

export default DefaultTemplate
