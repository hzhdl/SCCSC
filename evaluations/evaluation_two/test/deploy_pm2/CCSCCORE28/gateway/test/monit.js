const tx2 = require('tx2')
var http = require('http')

const pm2 = require('pm2')

// pm2.connect(function(err) {
//     if (err) {
//         console.error(err)
//         process.exit(2)
//     }
//
//     pm2.start({
//         script    : '../bin/www.js',
//         name      : 'www'
//     }, function(err, apps) {
//         if (err) {
//             console.error(err)
//             return pm2.disconnect()
//         }
//
//         pm2.list((err, list) => {
//             console.log(err, list)
//
//             // pm2.restart('www', (err, proc) => {
//             //     // Disconnects from PM2
//             //     pm2.disconnect()
//             // })
//         })
//         pm2.describe("www", (res)=>{
//             console.log(res)
//         })
//     })
// })

var meter = tx2.meter({
    name      : 'req/sec',
    samples   : 1,
    timeframe : 60
})

http.createServer(function (req, res) {
    meter.mark()
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('Hello World!')
    res.end()
}).listen(6001)
// Allocating process module
const process = require('process');

// Calling process.cpuUsage() method
var usage = process.cpuUsage();
// Printing returned value
console.log("cpu usage before:", usage);

// Current time
const now = Date.now();

// Loop to delay almost 100 miliseconds
while (Date.now() - now < 100);

// After using the cpu for nearly equal to
// 100 miliseconds
// Calling process.cpuUsage() method
usage = process.cpuUsage(usage);

// Printing returned value
console.log("Cpu usage by this process:", usage);
