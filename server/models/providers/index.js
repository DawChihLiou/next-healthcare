const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Provider = new schema({
  drgDefinition: String,
  providerId: Number,
  providerName: String,
  providerStreetAddress: String,
  providerCity: String,
  providerState: String,
  providerZipCode: Number,
  hospitalReferralRegionDescription: String,
  totalDischarges: Number,
  averageCoveredCharges: Number,
  averageTotalPayments: Number,
  averageMedicarePayments: Number,
});

module.exports = mongoose.model('providers', Provider);
