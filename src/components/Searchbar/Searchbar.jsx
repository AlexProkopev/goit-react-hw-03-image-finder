import React, { Component } from 'react'
import css from "./Searchbar.module.css"

export default class Searchbar extends Component {

  

    hendleSubmitForm =(e)=>{
      e.preventDefault()
        const value = e.currentTarget.elements.search.value
        if (value === '') {
          alert('Введите текст для поиска')
          return
        } 
        this.props.onSubmit(value)
        e.currentTarget.reset()
    }



    

  render() {

    
    return (
        <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.hendleSubmitForm} >
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
      
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='search'
          />
        </form>
      </header>
    )
  }
}
