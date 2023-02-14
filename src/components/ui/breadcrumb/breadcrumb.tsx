import "./breadcrumb.scss"

import React, { useEffect, useState } from "react"

interface Props {
  /**
   * categories list
   */
  categories: string[]

  /**
   * Additional properties
   */
  [x: string]: any
}

const UIBreadcrumb: React.FC<Props> = ({ categories }) => {
  const [breadcrumb, setBreadcrumb] = useState<JSX.Element[]>([])

  useEffect(() => {
    const breadcrumbItems: JSX.Element[] = []
    categories.forEach((category, index) => {
      if (index !== categories.length - 1) {
        breadcrumbItems.push(<span className='a-breadcrumb__part' key={index}>{ `${category}  >  ` }</span>)
      } else {
        breadcrumbItems.push(<span className='a-breadcrumb__part a-breadcrumb__part--bold' key={index}>{ category } </span>)
      }
    })
    setBreadcrumb(breadcrumbItems)
  }, [])

  return (
    <p className='breadcrumb'>
      { breadcrumb }
    </p>
  )
}

export default UIBreadcrumb
