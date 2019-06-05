const mongoose = require('mongoose');

const { Schema } = mongoose;

const Provider = new Schema({
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

const init = () => {
  if (mongoose.models.Provider) {
    return mongoose.model('providers');
  }

  return mongoose.model('providers', Provider);
};

module.exports = init();
