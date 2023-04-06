import React from 'react'
import s from './SearchBar.module.css'

const SearchBar = ({ className, ...rest }) => {
  return (
    <div className={`${s.searchBar} ${className}`}>
      <input type="text" placeholder="Buscar" {...rest} />
      <button className={s.searchButton}>
      </button>
    </div>
  )
}

export default SearchBar