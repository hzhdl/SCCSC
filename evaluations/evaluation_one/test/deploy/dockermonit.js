var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
// let id='c9133261ffcf'
// var container = docker.getContainer(id);
// let cnames=["ccscethgate2",'ccscethoracle2','ccscfiscooracle1','ccscethoracle1','ccscfiscogate1','ccscethgate1']


function have(namearray, namekey) {
    namearray.forEach((item,index,array)=>{
        if (item===namekey){
            return true
        }
    })
    return false
}
const sleep = async (time) => {
    return new Promise(((resolve, reject) => {
        setTimeout(()=>{
            // console.log(data)
            resolve()
        },time);
    }))
}


const DockerMoit = function (name) {

    //data cache
    this.data={
        name:name
    }
    this.cachedata=[]
    this.CacheFlag=false
    let that = this
    this.setdata = function (event,name) {
        that.data={
            "available_memory":event.memory_stats.limit,
            "usage_memory":event.memory_stats.usage/1000000,
            "Memory_usage":(event.memory_stats.usage / event.memory_stats.limit) * 100.0,
            "cpu_delta":event.cpu_stats.cpu_usage.total_usage - event.precpu_stats.cpu_usage.total_usage,
            "system_cpu_delta":event.cpu_stats.system_cpu_usage - event.precpu_stats.system_cpu_usage,
            "number_cpus":event.cpu_stats.online_cpus,
            "CPU_usage":((event.cpu_stats.cpu_usage.total_usage - event.precpu_stats.cpu_usage.total_usage) /
                (event.cpu_stats.system_cpu_usage - event.precpu_stats.system_cpu_usage)) * event.cpu_stats.online_cpus * 100.0
        }
        that.data.name=name;
        if (this.CacheFlag){
            that.cachedata.push(that.data)
        }
    }

    this.upstatdata = async function () {
        let CID=""
        await docker.listContainers(function (err,res) {
            // console.log("-------------")
            // console.log(err,res)
            if (err==null){
                res.forEach((item,index,array)=>{
                    if (item.Names[0].substr(1)==that.data.name){
                        CID=item.Id.substr(0,12)
                    }
                })
            }
        })
        await sleep(100)
        var container = docker.getContainer(CID);
        console.log(CID)
        await container.stats(async function (err, stream) {
            docker.modem.followProgress(stream, onFinished, onProgress);
            function onFinished(err, output) {
            }
            function onProgress(event) {
                // console.log('-----------------------------')
                // console.log(that)
                that.setdata(event,that.data.name)
            }
        })
    }

    this.getdata= function (){
        return that.data;
    }

    this.startcachedata= function (){
        this.CacheFlag=true
    }
    this.stopcachedata= function (){
        let tmp = that.cachedata;
        that.CacheFlag=false
        that.cachedata=[]
        return tmp;
    }
}

const DockerMoits = function (){
    this.dockermonits={}

    this.add = async function (name){
        if (this.dockermonits[name]!=null&&this.dockermonits[name]!=undefined){
            return this.dockermonits[name]
        }
        else {
            let dockerMoit = new DockerMoit(name);
            dockerMoit.upstatdata()
            this.dockermonits[name]=dockerMoit;
            return this.dockermonits[name]
        }
    }
    this.getdata= function (name){
        return this.dockermonits[name].data
    }
    this.startcachedata= function (name){
        this.dockermonits[name].startcachedata()
    }
    this.stopcachedata= function (name){
        return this.dockermonits[name].stopcachedata()
    }

    this.del = function (name) {
        // let tmp=this.dockermonits[name];
        // this.dockermonits[name]=null
        delete this.dockermonits[name];
    }
}



// const test = async () => {
//     let name="ccscethgate1"
//     let dockerMoits = new DockerMoits();
//     await dockerMoits.add(name)
//
//     for (let i = 0; i < 10; i++) {
//         await sleep(1000).then(()=>{
//             console.log(dockerMoits.getdata(name))
//         })
//     }
//     process.exit(0)
// }
// test()




module.exports = {DockerMoit,DockerMoits,sleep}

