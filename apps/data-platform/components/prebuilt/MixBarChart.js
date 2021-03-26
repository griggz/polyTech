import React, { useState, useEffect } from 'react'
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { Typography } from '@material-ui/core'
import * as d3 from 'd3'

const ungroup = (data) => {
  const arr = []
  data.forEach(function (keys) {
    arr.push({
      year: keys.key,
      state_population: keys.value.state_population,
      population_growth_rate: keys.value.population_growth_rate,
      households: keys.value.households,
      household_growth_rate: keys.value.household_growth_rate,
      light_duty_vehicles: keys.value.light_duty_vehicles,
      light_duty_vehicles_growth_rate: keys.value.light_duty_vehicles_growth_rate
    })
  })
  return arr
}

const shapeVizData = (d) => {
  return {
    year: d.year,
    state_population: +d.state_population,
    population_growth_rate: +(+d.population_growth_rate * 100).toFixed(2),
    households: +d.households,
    household_growth_rate: +(+d.household_growth_rate * 100).toFixed(2),
    light_duty_vehicles: +d.light_duty_vehicles,
    light_duty_vehicles_growth_rate: +(+d.light_duty_vehicles_growth_rate * 100).toFixed(2)
  }
}

const groupBy = (data, key) => {
  const dataRollup = d3.nest()
    .key(d => d[key])
    .rollup(v => ({
      state_population: d3.sum(v, d => d.state_population),
      population_growth_rate: d3.sum(v, d => d.population_growth_rate),
      households: d3.sum(v, d => d.households),
      household_growth_rate: d3.sum(v, d => d.household_growth_rate),
      light_duty_vehicles: d3.sum(v, d => d.light_duty_vehicles),
      light_duty_vehicles_growth_rate: d3.sum(v, d => d.light_duty_vehicles_growth_rate)
    }))
    .entries(data)
  return dataRollup
}

export default function MixBarChart ({ mixBarData }) {
  const [data, setData] = useState()
  const [doneLoading, setDoneLoading] = useState()

  useEffect(() => {
    async function load () {
      // load credential data
      await prepData(mixBarData)
      await setDoneLoading(true)
    }
    // Load
    load()
  }, [mixBarData])

  const prepData = async (data) => {
    const grouped = groupBy(data, 'year')
    const unGroup = ungroup(grouped)
    const cleanData = unGroup.map(d => shapeVizData(d))
    cleanData.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0))
    await setData(cleanData)
  }

  if (!doneLoading) {
    return ''
  }

  return (
    <>
      <Typography variant='h6' color='secondary' align='center'>
        Growth Statistics
      </Typography>
      <ResponsiveContainer width='100%' aspect={3.0 / 2.0}>
        <ComposedChart
          data={data}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='year' label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
          <YAxis
            label={{ value: 'Growth Rate (%)', angle: -90, position: 'insideLeft' }}
            domain={[(Math.min(...data)), (Math.max(...data))]}
            unit='%'
            allowDataOverflow
          />
          <Tooltip />
          <Legend />
          <Area type='monotone' unit='%' name='Population Growth Rate' dataKey='population_growth_rate' fill='rgba(87, 204, 153, 1)' stroke='rgba(87, 204, 153, 1)' />
          <Bar dataKey='household_growth_rate' unit='%' name='Household Growth Rate' barSize={20} fill='#5e6472' />
          <Line type='monotone' unit='%' dataKey='light_duty_vehicles_growth_rate' name='Vehicle Growth Rate' stroke='#e76f51' />
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </>

  )
}
