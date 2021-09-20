import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import './styles.scss'

const SearchBar = ({ onChange }) => {
  return (
    <div className="searchBar">
      <label htmlFor="searchBar" className="searchBar__label">
        <span>
          <AiOutlineSearch className="searchBar__icon" />
        </span>
        <input
          name="searchBar"
          onChange={onChange}
          type="text"
          className="searchBar__input"
        />
      </label>
    </div>
  )
}

export default SearchBar
