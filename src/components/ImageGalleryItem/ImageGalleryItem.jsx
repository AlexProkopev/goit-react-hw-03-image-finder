import React, { Component } from 'react'
import css from "./ImageGalleryItem.module.css"
import { nanoid } from 'nanoid';

export default class ImageGalleryItem extends Component {
  render() {
    
    return (
     <>
     {this.props.imageData !== null && this.props.imageData.map(({webformatURL,id })=>{
      const idUniq = nanoid()
        return (
          <li key={idUniq} className={css.galleryItem} onClick={()=>{this.props.handleClickModal(webformatURL)}}>
            <img src={webformatURL} alt={id} />
          </li>
        )
     })}
     </>
    )
  }
}
