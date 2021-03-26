import React from 'react'
import { Radar } from 'react-chartjs-2'

export default function RadialViz (props) {
  return (
    <Radar data={props.data} />
  )
}
