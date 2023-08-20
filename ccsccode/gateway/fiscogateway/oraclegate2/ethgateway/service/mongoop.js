const mongoose = require('mongoose');
const gatewayconfig = require('../config/gateconfig.js')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://'+gatewayconfig.mongodb.host+':'+gatewayconfig.mongodb.port+'/'+gatewayconfig.mongodb.schema)
    .then(() => console.log('Connected!'));

const schema0 = new Schema({
    ChainHash: String,
    Address: String,
    ChainName: String,
    ChainID: String,
    "pk":String,
    "sk":String,
    "Spk":String,
    data:JSON
});
mongoose.model('Chain', schema0);
const schema1 = new Schema({
    ChainHash: String,
    CCSChash: String,
    Address: String,
    FunctionName: String,
    Flag: String,
    ParamList: JSON,
    pk: String,
    sk: String,
    Spk: String,
    data:JSON
});
mongoose.model('CCSC', schema1);

const Chain = mongoose.model('Chain');
const CCSC = mongoose.model('CCSC');



module.exports = {mongoose,Chain,CCSC}
