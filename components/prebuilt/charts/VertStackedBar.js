import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Label, ResponsiveContainer,
} from 'recharts';
import theme from '../ui/MaterialTheme'

const CustomLabel = (props) => {
  const { x, y, width, height, value, name } = props;
  if(!value) {
    return null;
  }
  const percent = (value * 100).toFixed(2)

		return (
      <foreignObject style={{position: 'relative'}} x={x + width - 2} y={y - 30} width={400} height={100}>
        <div style={{height: '100%', minWidth: '200px', position: 'relative'}}>
        <span style={{bottom: 0, left: 10, position: 'absolute', fontSize: 16 }}>{name}</span>
        <span style={{top: 40, bottom: 0, left: 10, position: 'absolute', fontSize: 20 }}>{percent}%</span>
        </div>
      </foreignObject>
	    )
	}

export default function VertStackedBar({data}) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
      width='100%'
      layout="vertical"
      data={data.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
      >
        <XAxis type='number' hide/>
        <YAxis dataKey="name" type="category" hide />
        <Tooltip />
        <Bar dataKey="value" barSize={80} fill="#ee6c4d" label={CustomLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
}
