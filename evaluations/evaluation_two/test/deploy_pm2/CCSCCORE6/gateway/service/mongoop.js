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
    ENFlag: String,
    Topic: Array,
    ParamList: JSON,
    ABI: String,
    pk: String,
    sk: String,
    Spk: String,
    data:JSON
});
mongoose.model('CCSC', schema1);
const schema2 = new Schema({
    ChainHash: String,
    CCSChash: String,
    SrcChainHash: String,
    Flag: String,
    Result:  JSON,
    Tchainresponse: JSON,
    Time:JSON
});
mongoose.model('Invocation', schema2);
const schema3 = new Schema({
    Address: String,
    SetFunctionName: String,
    GetFunctionName: Array,
    Flag: String,
    // ENFlag: String,
    Topic: Array,
    // SetParamList: JSON,
    ABI: String,
    data:JSON
});
mongoose.model('OC', schema3);

const Chain = mongoose.model('Chain');
const CCSC = mongoose.model('CCSC');
const Invocation = mongoose.model('Invocation');
const OC = mongoose.model('OC');



module.exports = {mongoose,Chain,CCSC,Invocation,OC}
