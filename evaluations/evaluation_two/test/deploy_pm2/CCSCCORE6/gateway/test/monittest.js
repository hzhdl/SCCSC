const tx2 = require('tx2')
var http = require('http')
const sleep = require('sleep')

const pm2 = require('pm2')

pm2.connect(function(err) {
    if (err) {
        console.error(err)
        process.exit(2)
    }

    pm2.start({
        script    : 'monit.js',
        name      : 'monit'
    }, async function(err, apps) {
        if (err) {
            console.error(err)
            return pm2.disconnect()
        }

        pm2.list((err, list) => {
            console.log(err)

            // pm2.restart('www', (err, proc) => {
            //     // Disconnects from PM2
            //     pm2.disconnect()
            // })
        })
        const count=10000
        for (let i = 0; i <count; i++) {
            sleep.msleep(500);
            // console.log("------------")
            await new Promise(((resolve, reject) => {
                    pm2.describe("monit", (err, res)=>{
                        console.log(res[0].monit)
                        resolve("成功")
                    })
            }))
        }

    })
})
