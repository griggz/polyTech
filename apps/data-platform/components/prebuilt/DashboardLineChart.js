import React, { useState, useEffect } from 'react'
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../views/ui/MaterialTheme';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';
import ScenarioOptionsMultiple from './ScenarioOptionsMultiple';
// import Scenarios from './Scenarios'

const useStyles = makeStyles(() => ({
  Slider: {
    paddingTop: '45px'
  }

}))

const CustomizedLabel = props => {
  const { x, y, width, height } = props.viewBox

  return (
    <g>
      <text x={x + width / 2} y={y + height + 15} dy={props.dy ? props.dy : '-8.5em'} dx={props.dy ? props.dy : '1.5em'} transform='rotate(-90, 30, 143)' fill='#888888' fontSize='1em' textAnchor='middle' dominantBaseline='bottom'>
        {props.text}
      </text>
    </g>
  )
}

const shapeData = (d, fields) => {
  const objData = {}

  fields.forEach(f => {
    if (f === 'year') {
      objData[f] = d[f]
    } else {
      objData[f] = +d[f]
    }
  })
  return objData
}

const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key]
      return acc
    }, {})
  )

// chart toolbar styles
const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: '1 1 100%'
  }
}))

// chart toolbar
const PaperToolbar = ({ onChange, value }) => {
  const classes = useToolbarStyles()

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} color='secondary' variant='h6' id='tableTitle'>
        BAU Emissions & Mitigation Options
      </Typography>

      <ButtonGroup variant='text' color='secondary' aria-label='text primary button group'>
        <ScenarioOptionsMultiple
          onChange={onChange}
          value={value}
        />
      </ButtonGroup>
    </Toolbar>
  )
}

export default function LineViz ({ data }) {
  const classes = useStyles()
  const [scenarioChoice, setScenarioChoice] = useState([
    { value: 'bau', label: 'BAU' },
    { value: 'rmp', label: 'RMP' },
    { value: 'kigali', label: 'KIGALI' },
    { value: 'snap', label: 'SNAP' },
    { value: 'slcp', label: 'SLCP' }])
  const [chartData, setChartData] = useState()
  const [sourceData, setSourceData] = useState()
  const [sliderValue, setSliderValue] = useState()
  const [max, setMax] = useState()
  const [min, setMin] = useState()
  const [activeFields, setActiveFields] = useState()

  const handleScenarioChange = async (values) => {
    await setScenarioChoice(values)
    await prepData({ values })
  }

  const handleSliderChange = async (event, newValue) => {
    if (newValue !== sliderValue) {
      await setSliderValue(newValue)
      // get cleanDataSet
      const cleanData = await sourceData.map(d => shapeData(d, activeFields))
      // Slider Data
      const sliceData = await reducedFilter(cleanData, activeFields, item => item.year >= newValue[0] && item.year <= newValue[1])
      await setChartData(sliceData)
    }
  }

  const prepData = async ({ values }) => {
    const fields = ['year']
    await values.map(d => fields.push(d.value))
    const cleanData = await sourceData.map(d => shapeData(d, fields))
    // Slider Data
    const sliceData = await reducedFilter(cleanData, fields, item => item.year >= sliderValue[0] && item.year <= sliderValue[1])
    // update state
    await setChartData(sliceData)
    await setActiveFields(fields)
  }

  useEffect(() => {
    async function load () {
      // load credential data
      const values = [
        { value: 'bau', label: 'BAU' },
        { value: 'rmp', label: 'RMP' },
        { value: 'kigali', label: 'KIGALI' },
        { value: 'snap', label: 'SNAP' },
        { value: 'slcp', label: 'SLCP' }]
      const fields = ['year']
      await values.map(d => fields.push(d.value))
      const cleanData = await data.map(d => shapeData(d, fields))
      // Slider Data
      const yearsArr = []
      await data.forEach(d => {
        if (d.year) {
          yearsArr.push(Number(d.year))
        }
      })
      await setSliderValue([Math.min(...yearsArr), Math.max(...yearsArr)])
      await setMax(Math.max(...yearsArr))
      await setMin(Math.min(...yearsArr))
      await setChartData(cleanData)
      await setActiveFields(fields)
      await setSourceData(data)
    }
    if (data) {
    // Load
      load()
    }
  }, [data])

  if (!chartData) {
    return ''
  }

  return (
    <>
      <PaperToolbar onChange={handleScenarioChange} value={scenarioChoice} />
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis label={<CustomizedLabel text='HFC Emissions (MMTCO2E)' dy='' viewBox={{ height: '150px' }} />} allowDataOverflow />
          <Tooltip />
          <Legend />
          {chartData[0].bau &&
            <Line type='monotone' dataKey='bau' name='BAU' stroke='#ef476f' activeDot={{ r: 8 }} strokeWidth={3} />}
          {chartData[0].kigali &&
            <Line type='monotone' dataKey='kigali' name='KIGALI' stroke='#ffd166' strokeWidth={2} />}
          {chartData[0].rmp &&
            <Line type='monotone' dataKey='rmp' name='RMP' stroke='#06d6a0' strokeWidth={2} />}
          {chartData[0].snap &&
            <Line type='monotone' dataKey='snap' name='SNAP' stroke='#118ab2' strokeWidth={2} />}
          {chartData[0].slcp &&
            <Line type='monotone' dataKey='slcp' name='SLCP' stroke='#073b4c' strokeWidth={2} />}
          {chartData[0].rmp_snap &&
            <Line type='monotone' dataKey='rmp_snap' name='RMP & SNAP' stroke='#3b28cc' strokeWidth={2} />}
          {chartData[0].snap_kigali &&
            <Line type='monotone' dataKey='snap_kigali' name='SNAP & KIGALI' stroke='#f48c06' strokeWidth={2} />}
          {chartData[0].rmp_snap_slcp &&
            <Line type='monotone' dataKey='rmp_snap_slcp' name='RMP, SNAP, SLCP' stroke='#9db4c0' strokeWidth={2} />}
          {chartData[0].rmp_snap_slcp_kigali &&
            <Line type='monotone' dataKey='rmp_snap_slcp_kigali' name='RMP, SNAP, SLCP, KIGALI' stroke='#f7aef8' strokeWidth={2} />}
        </LineChart>
      </ResponsiveContainer>
      <Slider
        className={classes.Slider}
        value={sliderValue}
        color='secondary'
        getAriaValueText={(value) => `${value}`}
        valueLabelDisplay='on'
        onChange={handleSliderChange}
        step={1}
        marks
        min={min}
        max={max}
      />
    </>
  )
}
