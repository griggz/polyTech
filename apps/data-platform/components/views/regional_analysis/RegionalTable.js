import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import csvDownload from 'json-to-csv-export'
import { Typography } from '@material-ui/core'

const prepExport = (d) => {
  return {
    region: d.region,
    state: d.state,
    year: d.year,
    bau: +d.bau,
    rmp: +d.rmp,
    kigali: +d.kigali,
    snap: +d.snap,
    slcp: +d.slcp,
    rmp_snap: +d.rmp_snap,
    snap_kigali: +d.snap_kigali,
    rmp_snap_slcp: +d.rmp_snap_slcp,
    rmp_snap_slcp_kigali: +d.rmp_snap_slcp_kigali
  }
}

export default function RegionalTable (props) {
  const columns = [
    { title: 'Region', field: 'region' },
    { title: 'State', field: 'state' },
    { title: 'Year', field: 'year' },
    { title: 'bau', field: 'bau' },
    { title: 'rmp', field: 'rmp' },
    { title: 'snap', field: 'snap' },
    { title: 'kigali', field: 'kigali' },
    { title: 'slcp', field: 'slcp' }
  ]

  const tableTitle = (
    <>
      <Typography variant='h5' color='Primary'>Region Data</Typography>
      <Typography variant='caption' color='primary'>* This is a calculated table summing all annual totals by scenario and by region</Typography>

    </>
  )

  return (
    <>
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      <MaterialTable
        title={tableTitle}
        columns={columns}
        data={props.regionData ? props.regionData : props.data}
        options={{
          exportButton: true,
          exportCsv: (columns, data) => {
            regionData
              ? csvDownload(regionData.map(d => { return prepExport(d) }), 'region_data.csv')
              : csvDownload(data.map(d => { return prepExport(d) }), 'region_data.csv')
          },
          exportPdf: (columns, data) => {
            alert('PDF Exports are currently disabled for this table')
          },
          pageSize: 50,
          pageSizeOptions: [50, 100, 150]
        }}
        style={{
          position: 'relative',
          width: '100%'
        }}
      />
    </>
  )
}
