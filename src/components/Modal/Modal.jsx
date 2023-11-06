import React, { Component } from 'react'
import css from "./Modal.module.css"

export default class Modal extends Component {

    componentDidMount = () => {
        document.addEventListener('keydown', this.props.closeModalToESCAPE);
      }
      
      componentWillUnmount =()=>{
        document.removeEventListener('keydown', this.props.closeModalToESCAPE);
      }

  render() {

    const {largeImageURL,id} = this.props.modalData
    return (
        <div className={css.overlay} onClick={this.props.closeModal}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={id} />
        </div>
      </div>
    )
  }
}
