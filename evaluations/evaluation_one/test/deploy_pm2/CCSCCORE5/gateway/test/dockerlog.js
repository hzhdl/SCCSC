var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
let id='ed21fd1b63e0'
var container = docker.getContainer(id);

// query API for container info
const main = async () => {
    await container.stats(function (err, stream) {
        docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(err, output) {
            //output is an array with output json parsed objects
            //...
            // console.log(output)
        }
        function onProgress(event) {
            //...
            // console.log("used_memory ",event.memory_stats.usage - event.memory_stats.stats.cache)
            console.log('-----------------------------')
            console.log(event)
            console.log("available_memory  ",event.memory_stats.limit)
            console.log("Memory usage % ",(event.memory_stats.usage / event.memory_stats.limit) * 100.0)
            console.log("cpu_delta  ",event.cpu_stats.cpu_usage.total_usage - event.precpu_stats.cpu_usage.total_usage)
            console.log("system_cpu_delta  ",event.cpu_stats.system_cpu_usage - event.precpu_stats.system_cpu_usage)
            console.log("number_cpus  ",event.cpu_stats.online_cpus)
            console.log("CPU usage % ",(
                (event.cpu_stats.cpu_usage.total_usage - event.precpu_stats.cpu_usage.total_usage) /
                (event.cpu_stats.system_cpu_usage - event.precpu_stats.system_cpu_usage)) * event.cpu_stats.online_cpus * 100.0)

        }
    })
}
main()

