const initialState = [
  {
    name: 'state',
    display: 'State',
    type: 'select',
    options: [
      { name: 'Alabama', value: 'al' },
      { name: 'Alaska', value: 'ak' },
      { name: 'Arizona', value: 'az' },
      { name: 'Arkansas', value: 'ar' },
      { name: 'California', value: 'ca' },
      { name: 'Colorado', value: 'co' },
      { name: 'Connecticut', value: 'ct' },
      { name: 'Delaware', value: 'de' },
      { name: 'Florida', value: 'fl' },
      { name: 'Georgia', value: 'ga' },
      { name: 'Hawaii', value: 'hi' },
      { name: 'Idaho', value: 'id' },
      { name: 'Illinois', value: 'il' },
      { name: 'Indiana', value: 'in' },
      { name: 'Iowa', value: 'ia' },
      { name: 'Kansas', value: 'ks' },
      { name: 'Kentucky', value: 'ky' },
      { name: 'Louisiana', value: 'la' },
      { name: 'Maine', value: 'me' },
      { name: 'Maryland', value: 'md' },
      { name: 'Massachusetts', value: 'ma' },
      { name: 'Michigan', value: 'mi' },
      { name: 'Minnesota', value: 'mn' },
      { name: 'Mississippi', value: 'ms' },
      { name: 'Missouri', value: 'mo' },
      { name: 'Montana', value: 'mt' },
      { name: 'Nebraska', value: 'ne' },
      { name: 'Nevada', value: 'nv' },
      { name: 'New Hampshire', value: 'nh' },
      { name: 'New Jersey', value: 'nj' },
      { name: 'New Mexico', value: 'nm' },
      { name: 'New York', value: 'ny' },
      { name: 'North Carolina', value: 'nc' },
      { name: 'North Dakota', value: 'nd' },
      { name: 'Ohio', value: 'oh' },
      { name: 'Oklahoma', value: 'ok' },
      { name: 'Oregon', value: 'or' },
      { name: 'Pennsylvania', value: 'pa' },
      { name: 'Rhode Island', value: 'ri' },
      { name: 'South Carolina', value: 'sc' },
      { name: 'South Dakota', value: 'sd' },
      { name: 'Tennessee', value: 'tn' },
      { name: 'Texas', value: 'tx' },
      { name: 'Utah', value: 'ut' },
      { name: 'Vermont', value: 'vt' },
      { name: 'Virginia', value: 'va' },
      { name: 'Washington', value: 'wa' },
      { name: 'West Virginia', value: 'wv' },
      { name: 'Wisconsin', value: 'wi' },
      { name: 'Wyoming', value: 'wy' },
    ],
  },
  { name: 'min_discharges', display: 'Min Discharges', type: 'number' },
  { name: 'max_discharges', display: 'Max Discharges' },
  {
    name: 'min_average_covered_charges',
    display: 'Min Average Covered Charges',
    type: 'number',
  },
  {
    name: 'max_average_covered_charges',
    display: 'Max Average Covered charges',
    type: 'number',
  },
  {
    name: 'min_average_medicare_payments',
    display: 'Min Average Medicare Payments',
    type: 'number',
  },
  {
    name: 'max_average_medicare_payments',
    display: 'Max Average Medicare Payments',
    type: 'number',
  },
  {
    name: 'return_fields',
    display: 'Return Fields',
    type: 'multiple-select',
    options: [
      { name: 'Provider ID', value: 'providerId' },
      { name: 'Provider Name', value: 'providerName' },
      { name: 'DRG Definition', value: 'drgDefinition' },
      { name: 'Provider Street Address', value: 'providerStreetAddress' },
      { name: 'Provider City', value: 'providerCity' },
      { name: 'Provider State', value: 'providerState' },
      { name: 'Provider Zip Code', value: 'providerZipCode' },
      {
        name: 'Hospital Referral Region Description',
        value: 'hospitalReferralRegionDescription',
      },
      { name: 'Total Discharges', value: 'totalDischarges' },
      { name: 'Average Covered Charges', value: 'averageCoveredCharges' },
      { name: 'Average Total Payments', value: 'averageTotalPayments' },
      { name: 'Average Medicare Payments', value: 'averageMedicarePayments' },
    ],
  },
];

export default function filterSettings(state = initialState) {
  return state;
}
