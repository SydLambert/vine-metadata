#! /usr/bin/env node

const vineMetadata = require("./");

const sendData = async location => {
    try{
        console.log(JSON.stringify(await vineMetadata(location)));
    }
    catch(e){
        console.log("ERR: " + e);
    }
};

if(process.argv.length > 2){
    sendData(process.argv[2]);
}
else if(!process.stdin.isTTY){
    let data = "";
    let stdin = process.openStdin();
    stdin.on("data", d=>data+=d);

    stdin.on("end", async ()=>{
        sendData(data);
    });
}
else{
    console.log("ERR: No video location supplied.\n\tUsage: vine-metadata <URL/id>");
}