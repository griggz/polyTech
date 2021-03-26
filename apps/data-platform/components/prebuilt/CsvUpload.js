import React, { createRef } from 'react'
import Button from '@material-ui/core/Button'

import { CSVReader } from 'react-papaparse'

const buttonRef = createRef()

export default function CsvUploader (props) {
  const { setError, handleOnFileLoad, handleOnRemoveFile } = props

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err, file, inputElem, reason)
    setError(err)
  }

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const config = {
    delimiter: '', // auto-detect
    newline: '', // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: '',
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    downloadRequestHeaders: undefined,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined
    // delimitersToGuess: [',', '  ', '|', ';', RECORD_SEP, UNIT_SEP]
  }

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleOnRemoveFile}
      config={config}

    >
      {({ file }) => (
        <aside
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10
          }}
        >
          <Button variant='outlined' width='40%' color='secondary' onClick={handleOpenDialog}>
            Browse files
          </Button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              height: 45,
              lineHeight: 2.5,
              paddingLeft: 13,
              paddingTop: 3,
              width: '60%'
            }}
          >
            {file && file.name}
          </div>
          <Button variant='outlined' width='40%' color='secondary' onClick={handleRemoveFile}>
            Remove
          </Button>
        </aside>
      )}
    </CSVReader>
  )
}
