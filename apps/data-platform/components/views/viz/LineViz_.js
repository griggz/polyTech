import React from 'react'
// import PropTypes from 'prop-types'
import { UpperFirstLetter } from '../prebuilt/Helper.js.js'

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

const CustomizedLabel = props => {
  const { x, y, width, height } = props.viewBox

  return (
    <g>
      <text x={x + width / 2} y={y + height + 15} dy={props.dy ? props.dy : '-11.5em'} transform='rotate(-90, 30, 143)' fill='#888888' fontSize='1em' textAnchor='middle' dominantBaseline='bottom'>
        {props.text}
      </text>
    </g>
  )
}

const cleanKeyName = (keyName) => {
  const word = keyName.split('_')
  if (word.length > 2) {
    const scenarios = ['bau', 'rmp', 'kigali', 'snap', 'slcp']
    const indexArray = []
    scenarios.map(s => { return word.indexOf(s) >= 0 ? indexArray.push(+word.indexOf(s)) : 0 })
    const state = word.slice(word[0], Math.min.apply(null, indexArray)).join('_')
    return UpperFirstLetter(state)
  } else {
    return UpperFirstLetter(keyName.split('_')[0])
  }
}

const LineViz = (props) => {
  const { source, data } = props

  return (source === 'compareTool' && props.vizKeys.length === 0
    ? <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy={props.dy ? props.dy : ''} viewBox={{ height: '150px' }} />} />
        <Tooltip />
        <Legend />
      </LineChart>
      </ResponsiveContainer>
    : source === 'compareTool' && props.vizKeys.length === 1
      ? <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>

      : source === 'compareTool' && props.vizKeys.length === 2
        ? <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
            <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
          </LineChart>
          </ResponsiveContainer>

        : source === 'compareTool' && props.vizKeys.length === 3
          ? <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='year' />
              <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
              <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
              <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
            </LineChart>
            </ResponsiveContainer>

          : source === 'compareTool' && props.vizKeys.length === 4
            ? <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='year' />
                <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
              </LineChart>
              </ResponsiveContainer>
            : source === 'compareTool' && props.vizKeys.length === 5
              ? <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' />
                  <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                  <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                  <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                  <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                  <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              : source === 'compareTool' && props.vizKeys.length === 6
                ? <ResponsiveContainer>
                  <LineChart
                    data={data}
                    margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='year' />
                    <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                    <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                    <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                    <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                    <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                    <Line type='monotone' dataKey={props.vizKeys[5]} name={cleanKeyName(props.vizKeys[5])} stroke='#9d0208' strokeWidth={2} />
                  </LineChart>
                  </ResponsiveContainer>
                : source === 'compareTool' && props.vizKeys.length === 7
                  ? <ResponsiveContainer>
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='year' />
                      <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                      <Tooltip />
                      <Legend />
                      <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                      <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                      <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                      <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                      <Line type='monotone' dataKey={props.vizKeys[5]} name={cleanKeyName(props.vizKeys[5])} stroke='#9d0208' strokeWidth={2} />
                      <Line type='monotone' dataKey={props.vizKeys[6]} name={cleanKeyName(props.vizKeys[6])} stroke='#b8f2e6' strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  : source === 'compareTool' && props.vizKeys.length === 8
                    ? <ResponsiveContainer>
                      <LineChart
                        data={data}
                        margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='year' />
                        <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                        <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[5]} name={cleanKeyName(props.vizKeys[5])} stroke='#9d0208' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[6]} name={cleanKeyName(props.vizKeys[6])} stroke='#b8f2e6' strokeWidth={2} />
                        <Line type='monotone' dataKey={props.vizKeys[7]} name={cleanKeyName(props.vizKeys[7])} stroke='#fe7f2d' strokeWidth={2} />
                      </LineChart>
                      </ResponsiveContainer>

                    : source === 'compareTool' && props.vizKeys.length === 9
                      ? <ResponsiveContainer>
                        <LineChart
                          data={data}
                          margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='year' />
                          <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                          <Tooltip />
                          <Legend />
                          <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                          <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[5]} name={cleanKeyName(props.vizKeys[5])} stroke='#9d0208' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[6]} name={cleanKeyName(props.vizKeys[6])} stroke='#b8f2e6' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[7]} name={cleanKeyName(props.vizKeys[7])} stroke='#fe7f2d' strokeWidth={2} />
                          <Line type='monotone' dataKey={props.vizKeys[8]} name={cleanKeyName(props.vizKeys[8])} stroke='#0b132b' strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                      : source === 'compareTool' && props.vizKeys.length === 10
                        ? <ResponsiveContainer>
                          <LineChart
                            data={data}
                            margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='year' />
                            <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='-9.5em' viewBox={{ y: '150px' }} />} />
                            <Tooltip />
                            <Legend />
                            <Line type='monotone' dataKey={props.vizKeys[0]} name={cleanKeyName(props.vizKeys[0])} stroke='#0072c6' activeDot={{ r: 8 }} strokeWidth={3} />
                            <Line type='monotone' dataKey={props.vizKeys[1]} name={cleanKeyName(props.vizKeys[1])} stroke='#1c2630' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[2]} name={cleanKeyName(props.vizKeys[2])} stroke='#ffd630' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[3]} name={cleanKeyName(props.vizKeys[3])} stroke='#d63230' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[4]} name={cleanKeyName(props.vizKeys[4])} stroke='#88d498' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[5]} name={cleanKeyName(props.vizKeys[5])} stroke='#9d0208' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[6]} name={cleanKeyName(props.vizKeys[6])} stroke='#b8f2e6' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[7]} name={cleanKeyName(props.vizKeys[7])} stroke='#fe7f2d' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[8]} name={cleanKeyName(props.vizKeys[8])} stroke='#0b132b' strokeWidth={2} />
                            <Line type='monotone' dataKey={props.vizKeys[9]} name={cleanKeyName(props.vizKeys[9])} stroke='#ffc6ff' strokeWidth={2} />
                          </LineChart>
                          </ResponsiveContainer>

                        : ''
  )
}

export default LineViz
