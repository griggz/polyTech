import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer,
} from 'recharts';
import theme from '../ui/MaterialTheme'


const COLORS = ["#8884d8", "#82ca9d", '#0000ff']

const renderCustomizedLabel = props => {
  const { x, y, width, height, value, name } = props;
  if(!value) {
    return null;
  }
  const percent = (value * 100).toFixed(2)
  return (
    <foreignObject style={{position: 'relative'}} x={x + width - 3} y={y - 15} width={200} height={50}  fill="red" >
      <div style={{height: '100%', position: 'relative'}}>
      <span style={{bottom: 0, left: 5, position: 'absolute', fontSize: 18 }}>{percent}% | {name}</span>
      </div>
    </foreignObject>
  );
};

export default function StackedBar({data}) {
  const domain = [0, 1];
  const ticks = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
          data={data.data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="year" hide /> */}
          <YAxis  domain={domain} ticks={ticks} tickCount={10} tickFormatter={'toPercent'} hide/>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          {data.keys.map((d, index) => {
            console.log('horz', d)
            return (
            <Bar dataKey={d} key={index} stackId='a' barSize={60} fill={COLORS[index]}>
              <LabelList dataKey={d} name={d} value={d} valueAccessor={d} content={renderCustomizedLabel}/>
            </Bar>
            )
          }
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
