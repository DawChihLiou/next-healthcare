const { send } = require('micro');

module.exports = async (req, res) => {
  const statusCode = 200;
  const data = [
    {
      _id: '5cf3a362a9ba5155484480fb',
      drgDefinition: '281 - ACUTE MYOCARDIAL INFARCTION, DISCHARGED ALIVE W CC',
      providerId: 520193,
      providerName: 'AURORA BAYCARE MED CTR',
      providerStreetAddress: '2845 GREENBRIER RD PO BOX 8900',
      providerCity: 'GREEN BAY',
      providerState: 'WI',
      providerZipCode: 54311,
      hospitalReferralRegionDescription: 'WI - Green Bay',
      totalDischarges: 16,
      averageCoveredCharges: 23273.18,
      averageTotalPayments: 6884.56,
      averageMedicarePayments: 5902.06,
    },
    {
      _id: '5cf3a362a9ba5155484480fc',
      drgDefinition:
        '287 - CIRCULATORY DISORDERS EXCEPT AMI, W CARD CATH W/O MCC',
      providerId: 520193,
      providerName: 'AURORA BAYCARE MED CTR',
      providerStreetAddress: '2845 GREENBRIER RD PO BOX 8900',
      providerCity: 'GREEN BAY',
      providerState: 'WI',
      providerZipCode: 54311,
      hospitalReferralRegionDescription: 'WI - Green Bay',
      totalDischarges: 20,
      averageCoveredCharges: 23466.75,
      averageTotalPayments: 6976.5,
      averageMedicarePayments: 5470.4,
    },
  ];
  send(res, statusCode, data);
};
