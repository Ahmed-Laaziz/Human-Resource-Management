const mongoose = require('mongoose');
const Demande = require('./demande');
const Schema = mongoose.Schema;

const demandeAttestationTravail = new Schema({
    date_expiration: {
        type: String,
        default: '2024'
    },
    }
)

const DemandeAttestationTravail = Demande.discriminator('DemandeAttestationTravail', demandeAttestationTravail);
module.exports = DemandeAttestationTravail;