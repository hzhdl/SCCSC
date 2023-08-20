const {DockerMoit,DockerMoits,sleep} = require("./dockermonit.js")


const test = async () => {
    let name="ccscethchain1"
    let dockerMoits = new DockerMoits();
    await dockerMoits.add(name)

    dockerMoits.startcachedata(name)

    await sleep(10000)

    console.log(dockerMoits.stopcachedata(name))

    process.exit(0)
}
test()
