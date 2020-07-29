
const MOCK_DATA = {
  data: {
    columns: [
      'Event_Id',
      'Date',
      'Time_24H',
      'Duration_Min',
      'Appl_Id',
      'Appl.NAME',
      'Global_active_power',
      'Global_reactive_power',
      'Voltage',
      'Global_intensity',
      'Total Subm. 1+2+3',
      'Total measum. WH',
      'POWER Composition [kWH]',
      'USE CATEG',
      'CATEGORY NAME (Literal)'
    ],
    data: [
      [
        40979,
        '11/07/2020',
        '18:49:45',
        2,
        '0006_c2',
        'PC1_Gar',
        2.69,
        0.09,
        248.75,
        11.45,
        22,
        44,
        0.04,
        'E',
        'EDUCATION, COMMS, ENTERNTAINMENT'
      ]
    ]
  }
}

const INITIAL_HASH = "0000510308e7e0bea95a3e88e4e406c37133f0929c80866bda04bc0bce53a14"

export {INITIAL_HASH, MOCK_DATA};
