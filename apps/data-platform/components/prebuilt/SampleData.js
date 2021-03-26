const hfcData = [
  {
    state: 'texas',
    year: '2030',
    category: 'aerosols',
    end_use: 'aerosol_propellants',
    bau: 1.23,
    kigali: 0.36,
    rmp: 1.22,
    slcp: 1.22,
    snap: 0.46,
    snap_kigali: 0.18,
    rmp_snap: 0.46,
    rmp_snap_slcp: 0.46,
    rmp_snap_slcp_kigali: 0.18
  },
  {

    state: 'texas',
    year: '2030',
    category: 'air_conditioning',
    end_use: 'stationary_ac_>_50_lbs._commercial',
    bau: 1.20,
    kigali: 0.70,
    rmp: 1.20,
    slcp: 0.90,
    snap: 1.09,
    snap_kigali: 0.64,
    rmp_snap: 1.09,
    rmp_snap_slcp: 0.90,
    rmp_snap_slcp_kigali: 0.54
  },
  {
    state: 'texas',
    year: '2030',
    category: 'air_conditioning',
    end_use: 'stationary_ac_<50_lbs._commercial',
    bau: 1.22,
    kigali: 2.02,
    rmp: 3.37,
    slcp: 2.41,
    snap: 3.37,
    snap_kigali: 2.02,
    rmp_snap: 3.37,
    rmp_snap_slcp: 2.41,
    rmp_snap_slcp_kigali: 1.45
  },
  {
    state: 'texas',
    year: '2030',
    category: 'air_conditioning',
    end_use: 'stationary_ac_residential_heat_pumps',
    bau: 2.75,
    kigali: 1.67,
    rmp: 2.75,
    slcp: 2.10,
    snap: 2.75,
    snap_kigali: 1.67,
    rmp_snap: 2.75,
    rmp_snap_slcp: 2.10,
    rmp_snap_slcp_kigali: 1.27
  },
  {
    state: 'texas',
    year: '2030',
    category: 'air_conditioning',
    end_use: 'stationary_central_ac_residential',
    bau: 3.87,
    kigali: 2.35,
    rmp: 3.87,
    slcp: 2.94,
    snap: 3.87,
    snap_kigali: 2.35,
    rmp_snap: 3.87,
    rmp_snap_slcp: 2.94,
    rmp_snap_slcp_kigali: 1.79
  },
  {
    state: 'texas',
    year: '2030',
    category: 'air_conditioning',
    end_use: 'stationary_room_unit_ac_residential',
    bau: 0.42,
    kigali: 0.34,
    rmp: 0.42,
    slcp: 0.35,
    snap: 0.42,
    snap_kigali: 0.344,
    rmp_snap: 0.42,
    rmp_snap_slcp: 0.35,
    rmp_snap_slcp_kigali: 0.28
  }
]

const stateData = [
  {
    state: 'texas',
    year: '2030',
    state_population: 33317744,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.42,
    household_growth_rate: 0.01,
    household_heat_pumps: 0.42,
    household_room_ac: 0.20,
    households: 13292161,
    light_duty_vehicles: 22592200,
    light_duty_vehicles_growth_rate: 0.01,
    population_growth_rate: 0.01,
    room_ac_growth_rate: 0
  },
  {
    state: 'texas',
    year: '2029',
    state_population: 32809827,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.41,
    household_growth_rate: 0.01,
    household_heat_pumps: 0.42,
    household_room_ac: 0.20,
    households: 13089965,
    light_duty_vehicles: 22351900,
    light_duty_vehicles_growth_rate: 0.01,
    population_growth_rate: 0.01,
    room_ac_growth_rate: 0
  },
  {
    state: 'texas',
    year: '2028',
    state_population: 32310736,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.41,
    household_growth_rate: 0.05,
    household_heat_pumps: 0.41,
    household_room_ac: 0.2,
    households: 12891431,
    light_duty_vehicles: 22111800,
    light_duty_vehicles_growth_rate: 0.011,
    population_growth_rate: 0.015,
    room_ac_growth_rate: 0
  },
  {
    state: 'texas',
    year: '2027',
    state_population: 31820681,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.42,
    household_growth_rate: 0.01,
    household_heat_pumps: 0.40,
    household_room_ac: 0.20,
    households: 12696277,
    light_duty_vehicles: 21870400,
    light_duty_vehicles_growth_rate: 0.01,
    population_growth_rate: 0.01,
    room_ac_growth_rate: 0
  },
  {
    state: 'texas',
    year: '2026',
    state_population: 31338972,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.43,
    household_growth_rate: 0.015,
    household_heat_pumps: 0.39,
    household_room_ac: 0.20,
    households: 12504312,
    light_duty_vehicles: 21644700,
    light_duty_vehicles_growth_rate: 0.009,
    population_growth_rate: 0.01,
    room_ac_growth_rate: 0
  },
  {
    state: 'texas',
    year: '2025',
    state_population: 30865134,
    central_ac_growth_rate: 0,
    heat_pump_growth_rate: 0,
    household_central_ac: 0.43,
    household_growth_rate: 0.015,
    household_heat_pumps: 0.38,
    household_room_ac: 0.20,
    households: 12315570,
    light_duty_vehicles: 21432700,
    light_duty_vehicles_growth_rate: 0.009,
    population_growth_rate: 0.01,
    room_ac_growth_rate: 0
  }
]

export { stateData, hfcData }
