// These functions are intended to serve as a basic check on the uploaded dataset
import States from '../prebuilt/States'

const HfcHeader = ['state', 'year', 'category', 'end_use', 'bau', 'rmp', 'snap', 'slcp', 'kigali', 'rmp_snap', 'snap_kigali', 'rmp_snap_slcp', 'rmp_snap_slcp_kigali']

const StateHeader = ['state', 'year', 'state_population', 'population_growth_rate', 'population_growth_rate', 'households', 'household_growth_rate', 'household_heat_pumps', 'heat_pump_growth_rate', 'household_central_ac', 'central_ac_growth_rate', 'household_room_ac', 'room_ac_growth_rate', 'light_duty_vehicles', 'light_duty_vehicles_growth_rate']

// checks to see if data set is hfc scenario data or state metrics
const WhichData = (data) => {
  const cols = []
  Object.keys(data[0]).map(key => cols.push(key))
  if (cols.includes('bau')) {
    return 'hfc'
  } else {
    return 'state'
  }
}

// converts non ints to ints
const ShapeHfcData = (d) => {
  return {
    state: d.state ? d.state.toLowerCase().trim().replace(/\s/g, '_') : '',
    year: d.year ? d.year.trim() : '',
    category: d.category ? d.category.toLowerCase().trim().replace(/\s/g, '_') : '',
    end_use: d.end_use ? d.end_use.toLowerCase().trim().replace(/\s/g, '_') : '',
    bau: d.bau ? +d.bau : 0,
    rmp: d.rmp ? +d.rmp : 0,
    kigali: d.kigali ? +d.kigali : 0,
    snap: d.snap ? +d.snap : 0,
    slcp: d.slcp ? +d.slcp : 0,
    rmp_snap: d.rmp_snap ? +d.rmp_snap : 0,
    snap_kigali: d.snap_kigali ? +d.snap_kigali : 0,
    rmp_snap_slcp: d.rmp_snap_slcp ? +d.rmp_snap_slcp : 0,
    rmp_snap_slcp_kigali: d.rmp_snap_slcp_kigali ? +d.rmp_snap_slcp_kigali : 0,
    errors: false
  }
}

// converts non ints to ints
const ShapeStateData = (d) => {
  return {
    // standard columns
    state: d.state ? d.state.toLowerCase().trim().replace(/\s/g, '_') : '',
    year: d.year ? d.year.trim() : '',
    state_population: d.state_population ? +d.state_population : 0,
    population_growth_rate: d.population_growth_rate ? +d.population_growth_rate : 0,
    households: d.households ? +d.households : 0,
    household_growth_rate: d.household_growth_rate ? +d.household_growth_rate : 0,
    household_heat_pumps: d.household_heat_pumps ? +d.household_heat_pumps : 0,
    heat_pump_growth_rate: d.heat_pump_growth_rate ? +d.heat_pump_growth_rate : 0,
    household_central_ac: d.household_central_ac ? +d.household_central_ac : 0,
    central_ac_growth_rate: d.central_ac_growth_rate ? +d.central_ac_growth_rate : 0,
    household_room_ac: d.household_room_ac ? +d.household_room_ac : 0,
    room_ac_growth_rate: d.room_ac_growth_rate ? +d.room_ac_growth_rate : 0,
    light_duty_vehicles: d.light_duty_vehicles ? +d.light_duty_vehicles : 0,
    light_duty_vehicles_growth_rate: d.light_duty_vehicles_growth_rate ? +d.light_duty_vehicles_growth_rate : 0
  }
}

// CheckEndUse
const CheckEndUse = (d) => {
  const endUseFields = ['bau', 'commericial_refrig.', 'industrial_refrig.', 'domestic_refrig.', 'transport_refrigeration', 'stationary_ac_>_50_lbs._commercial', 'stationary_ac_<50_lbs._commercial', 'stationary_ac_residential_heat_pumps', 'stationary_central_ac_residential', 'stationary_room_unit_ac_residential', 'light-duty_mvac', 'heavy-duty_mvac', 'foam', 'aerosol_propellants', 'solvents_and_fire_suppressant']

  if (endUseFields.includes(d)) {
    return 'pass'
  } else {
    return 'fail'
  }
}

// CheckCategory
const CheckCategory = (d) => {
  const categoryFields = ['annual_total', 'refrigeration', 'air_conditioning', 'mobile_r/ac', 'foams', 'aerosols', 'other']

  if (categoryFields.includes(d)) {
    return 'pass'
  } else {
    return 'fail'
  }
}

// CheckYear
const CheckYear = (d) => {
  if (+d > 1999 && +d < 2099) {
    return 'pass'
  } else {
    return 'fail'
  }
}

const CheckState = (d, stateName) => {
  const states = States.map((option) => (option.value))
  const match = d.toLowerCase() === stateName.toLowerCase()
  if (match) {
    if (states.includes(d)) {
      return 'pass'
    } else {
      return 'fail'
    }
  } else {
    return 'fail'
  }
}

// converts invalid col headers to valid col headers
const CleanHeader = (data) => {
  const arr = []
  data.forEach(function (row) {
    const cleanRow = renameKeys(row.data)
    arr.push(cleanRow)
  })
  return arr
}

// function to rename keys, removing spaces and lowercasing
const renameKeys = (obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [key.toLowerCase().replace(/\W/, '_')]: obj[key] }
    }),
    {}
  )

// Checks to confirm columns exist
const CheckColumns = ({ setName, data }) => {
  const invalidCols = []
  const dataCols = []
  if (setName === 'hfc') {
    Object.keys(data[0]).forEach(key => {
      dataCols.push(key)
      if (!HfcHeader.includes(key)) {
        invalidCols.push(key)
      }
    })
  } else if (setName === 'state') {
    Object.keys(data[0]).forEach(key => {
      dataCols.push(key)
      if (!StateHeader.includes(key)) {
        invalidCols.push(key)
      }
    })
  }
  return { invalidCols }
}

// Check if State Matches
const CheckUserState = ({ data, user }) => {
  if (user.state === data[0].state) {
    return true
  } else {
    return false
  }
}

export { CleanHeader, WhichData, ShapeStateData, ShapeHfcData, CheckColumns, HfcHeader, StateHeader, CheckEndUse, CheckCategory, CheckYear, CheckState, CheckUserState }
