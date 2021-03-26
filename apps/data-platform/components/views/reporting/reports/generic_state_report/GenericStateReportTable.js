import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

export default function DataTable (props) {
  const { doneLoading, data } = props

  const [state, setState] = useState({
    columns: [],
    data: []
  })
  // Grabs credentials with home State details
  useEffect(() => {
    async function prep () {
      const cols = [
        { title: 'State', field: 'state' },
        { title: 'Year', field: 'year' },
        { title: 'bau', field: 'bau_web' },
        { title: 'rmp', field: 'rmp_web' },
        { title: 'snap', field: 'snap_web' },
        { title: 'kigali', field: 'kigali_web' },
        { title: 'slcp', field: 'slcp_web' }
      ]

      // update state
      await setState({
        ...state,
        columns: cols,
        data: data
      })
    }
    // Load
    prep()
  }, [data])

  if (doneLoading !== true && data.length === 0) {
    return ''
  }

  return (
    <>
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />

      <MaterialTable
        title='Annual Totals'
        columns={state.columns}
        data={state.data}
        options={{
          exportButton: true
        }}
        style={{
          position: 'relative',
          width: '100%'
        }}
        components={{
          Container: props => props.children
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.push(newData)
                  return { ...prevState, data }
                })
              }, 600)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data]
                    data[data.indexOf(oldData)] = newData
                    return { ...prevState, data }
                  })
                }
              }, 600)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(oldData), 1)
                  return { ...prevState, data }
                })
              }, 600)
            })
        }}
      />
    </>
  )
}
