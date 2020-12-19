import * as d3 from 'd3'
import moment from 'moment'

function between(x, min, max) {
  return x >= min && x <= max;
}

// group data with single key
export function GroupBy(data, key1, key2) {
  const dataRollup = d3.nest()
    .key(d => d[key1])
    .key(d => d[key2])
      .rollup(v => (
        v.length
      ))
      .entries(data)
    return dataRollup
}

export function Formalize({data, objStyle}) {
  const arr = []
  const objKeys = []
  const values = data.map(d => d.values.map(v => (v.value)))[0]
  if (objStyle === 'single') {
    data.forEach(function (keys) {
      const dobj = new Object();
      dobj.year = keys.key
      keys.values.map(d => {
        if (d.key !== "null") {
          dobj[d.key] = d.value / values.reduce((a, b) => a + b, 0)
          objKeys.push(d.key)
        }
      })
      arr.push(dobj)
    })
  } else if (objStyle === 'multiple') {
    data.forEach(function (keys) {
      keys.values.map(d => {
        arr.push({'name': d.key, 'value': d.value / values.reduce((a, b) => a + b, 0)})
        objKeys.push(d.key)
      })
    })
  }
  return {data: arr, keys: objKeys}
}

// group data by generation
export function AddGeneration(data) {
  const generations = {
    silent: [1925, 1945],
    boomer: [1946, 1964],
    genx: [1965, 1979],
    millenial: [1980, 1994],
    genz: [1995, 2012]
  }
  data.forEach(d => {
    const born = d.age - moment.now()
    if (between(born, generations.silent[0], generations.silent[1])) {
      d['generation'] = 'silent_generation'
    } else if (between(born, generations.boomer[0], generations.boomer[1])) {
      d['generation'] = 'baby_boomer'
    } else if (between(born, generations.genx[0], generations.genx[1])) {
      d['generation'] = 'genx'
    } else if (between(born, generations.millenial[0], generations.millenial[1])) {
      d['generation'] = 'millenial'
    } else if (between(born, generations.genz[0], generations.genz[1])) {
      d['generation'] = 'genz'
    }
   });
   return data
}
