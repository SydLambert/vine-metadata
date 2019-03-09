const https=require("https");

/**
* Retrieves data about a video from Vine.co
* @param {string} location The location of a Vine video. Will accept video URL or ID.
* @throws Will throw an error for invalid video location format, network error, or invalid JSON.
* @returns {Object} The video's metadata from archive.vine.co
*/
module.exports=location=>new Promise((resolve,reject)=>{
    let videoId;

    //Test for URL
    if(/^https?:\/\/(www.)?vine.co\/v\/.+$/g.test(location.trim())){
        videoId=/\/v\/(\w+)\W?/g.exec(location.trim())[1];
    }
    //Test for video id
    else if(/^\w+$/g.test(location.trim())){
        videoId=location.trim();
    }
    else{
        reject("Invalid video location format");
        return;
    }

    https.get(`https://archive.vine.co/posts/${videoId}.json`, res=>{
        let data="";

        res.on("data",d=>data+=d);

        res.on("end",()=>{
            try{
                resolve(Object.assign(JSON.parse(data),{
                    videoId:videoId,
                }));
            }
            catch(e){
                reject(e);
            }
        });

        if(res.statusCode!=200){
            reject(res.statusCode);
        }
    }).on("error",e=>{
        reject(e);
    });
});