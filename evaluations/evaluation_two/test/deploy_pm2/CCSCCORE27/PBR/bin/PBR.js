
const onerror=(err)=>{
    console.log("出现错误")
    console.log(err)
}
i=10
let url=''
let add=''
let ABI=[]
let func=''
let promise=[]
let times=[]
let totaltime=0
let totalsignletime=0
let scnums=60
const main= async ()=>{
    while(i--){
        promise=[]
        let begintime = new Date().getTime();
        for (let j = 0; j < scnums; j++) {
            url=pbrconfig[0].host+':'+pbrconfig[0].port
            add=pbrconfig[0].SCAddr
            func=pbrconfig[0].func
            ABI=pbrconfig[0].ABI
            promise.push(getresult(url,add,ABI,func))
        }
        await Promise.all(promise)
            .then((res)=>{
                totaltime+=new Date().getTime() - begintime
                times.push(new Date().getTime() - begintime)
                totalsignletime=0;
                for (let j = 0; j < res.length; j++) {
                    totalsignletime+=res[j].costtime
                }
                console.log("单条的平均时延",totalsignletime/res.length)
            },onerror)
        // console.log("第一次")
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log(totaltime/times.length)
}

main()

