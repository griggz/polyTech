import React, { PureComponent } from 'react'
import { Treemap, ResponsiveContainer } from 'recharts'

class CustomizedContent extends PureComponent {
  render () {
    const {
      root, depth, x, y, width, height, index, payload, colors, rank, name
    } = this.props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10)
          }}
        />
        {
          depth === 1 ? (
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor='middle'
              fill='#fff'
              fontSize={14}
            >
              {name}
            </text>
          ) : null
        }
        {
          depth === 1 ? (
            <text
              x={x + 4}
              y={y + 18}
              fill='#fff'
              fontSize={16}
              fillOpacity={0.9}
            >
              {index + 1}
            </text>
          ) : null
        }
      </g>
    )
  }
}

const TreeViz = (props) => {
  const { data } = props
  const colorsAll = ['#0072c6', '#1c2630', '#ffd630', '#d63230']
  const COLORS = []
  if (data.length === 1) {
    COLORS.push(colorsAll[0])
  } else if (data.length === 2) {
    COLORS.push(colorsAll[0])
    COLORS.push(colorsAll[1])
  } else if (data.length === 3) {
    COLORS.push(colorsAll[0])
    COLORS.push(colorsAll[1])
    COLORS.push(colorsAll[2])
  } else if (data.length === 4) {
    COLORS.push(colorsAll[0])
    COLORS.push(colorsAll[1])
    COLORS.push(colorsAll[2])
    COLORS.push(colorsAll[3])
  }
  console.log(COLORS, data.length)

  return (
    <Treemap
      width={600}
      height={469}
      data={data}
      dataKey='size'
      ratio={4 / 3}
      stroke='#fff'
      /* fill='#8884d8' */
      content={<CustomizedContent colors={COLORS} />}
    />
  )
}

export default TreeViz
