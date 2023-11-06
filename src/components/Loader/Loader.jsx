import React, { Component } from 'react'
import { LineWave } from 'react-loader-spinner'

export default class Loader extends Component {
  render() {
    return (
      <div>
        <LineWave
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="line-wave"
  wrapperStyle={{position: 'fixed',}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>
      </div>
    )
  }
}
