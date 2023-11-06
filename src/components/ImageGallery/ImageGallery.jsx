import React, { Component } from 'react'
import css from "./ImageGallery.module.css"
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'

export default class ImageGallery extends Component {


  render() {
    const {imageData,handleClickModal} = this.props;
    return (
        <ul className={css.gallery}>
       <ImageGalleryItem imageData={imageData} handleClickModal={handleClickModal}/>
      </ul>
    )
  }
}

