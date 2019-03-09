# vine-metadata
An NPM module get metadata about videos on Vine.co, working in Vine archival mode.

## Installation
This package has no external dependencies, it uses the native Node.JS HTTPS library. Install with npm:
```sh
npm install vine-metadata
```

## Usage
This module will retrieve information about a particular video from Vine, given its location (URL or video id). The location can be in any of the following formats, plus any other permutations of their differences:
- eF1z2H2U01e
- https://vine.co/v/eF1z2H2U01e
- http://vine.co/v/eF1z2H2U01e/
- https://vine.co/v/eF1z2H2U01e?key=value
- https://www.vine.co/v/eF1z2H2U01e/anything
- http://www.vine.co/v/eF1z2H2U01e#id

### Javascript module
The module only consists of one function, returning a promise to allow asynchronous network access. The only argument is the location of the video.
```javascript
const vineMetadata=require("vine-metadata");

(async ()=>{
  let location="https://vine.co/v/eF1z2H2U01e";
  try{
    console.log(await vineMetadata(location));
  }
  catch(e){
    console.log(e);
  }
})();
```

This example will return the following object:
```json
{
  "username": "Zach King",
  "userIdStr": "933563038118858752",
  "postId": 1254511813748785200,
  "verified": 1,
  "description": "Is this stealing?",
  "created": "2015-09-12T15:52:18.000000",
  "permalinkUrl": "https://vine.co/v/eF1z2H2U01e",
  "userId": 933563038118858800,
  "profileBackground": "0x6db0f2",
  "vanityUrls": [
    "Zach.King"
  ],
  "entities": [],
  "postIdStr": "1254511813748785152",
  "comments": 1714,
  "reposts": 13382,
  "videoLowURL": "http://v.cdn.vine.co/r/videos_r2/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=wBsiUzb0ZrvaAj9P4wp_lx3zb9WkN1mX",
  "loops": 5379827,
  "videoUrl": "http://v.cdn.vine.co/r/videos/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=8ZlDriSUYzhefhySkR2BHijekY32XbuK",
  "videoDashUrl": "http://v.cdn.vine.co/r/videos_h264dash/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=RyZBG6okijmsHd.CnnN2oL64cNLwAqDM",
  "thumbnailUrl": "http://v.cdn.vine.co/r/videos/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4.jpg?versionId=tSzEpgEqGrWFeOHEGouJxYDYFoX9m3G7",
  "explicitContent": 0,
  "likes": 99174,
  "videoId": "eF1z2H2U01e"
}
```

`vineMetadata` will throw an exception if the video location is supplied in an invalid/unsupported format, or if the video does not exist. It can also throw network errors, or a JSON parse error if Vine supplies the data in an invalid format.

### CLI
This module also comes with a CLI component. It can be used either with an argument:
```sh
vine-metadata eF1z2H2U01e
```
Or with stdin from a POSIX pipe:
```sh
echo eF1z2H2U01e | vine-metadata
```
Both commands result in a stringified JSON object sent to stdout:
```json
{"username":"Zach King","userIdStr":"933563038118858752","postId":1254511813748785200,"verified":1,"description":"Is this stealing?","created":"2015-09-12T15:52:18.000000","permalinkUrl":"https://vine.co/v/eF1z2H2U01e","userId":933563038118858800,"profileBackground":"0x6db0f2","vanityUrls":["Zach.King"],"entities":[],"postIdStr":"1254511813748785152","comments":1714,"reposts":13382,"videoLowURL":"http://v.cdn.vine.co/r/videos_r2/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=wBsiUzb0ZrvaAj9P4wp_lx3zb9WkN1mX","loops":5379827,"videoUrl":"http://v.cdn.vine.co/r/videos/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=8ZlDriSUYzhefhySkR2BHijekY32XbuK","videoDashUrl":"http://v.cdn.vine.co/r/videos_h264dash/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4?versionId=RyZBG6okijmsHd.CnnN2oL64cNLwAqDM","thumbnailUrl":"http://v.cdn.vine.co/r/videos/4B1BC6F25F1254511771919233024_412080db124.0.2.4244536461089371410.mp4.jpg?versionId=tSzEpgEqGrWFeOHEGouJxYDYFoX9m3G7","explicitContent":0,"likes":99174,"videoId":"eF1z2H2U01e"}
```
Piping example for getting the number of loops a video has:
```sh
$ echo eF1z2H2U01e | vine-metadata | grep -Eo "loops\":([0-9]+)\W"
loops":5379827,
```

## Links
- [View on NPM](https://www.npmjs.com/package/vine-metadata)
- [View on Github](https://github.com/SydLambert/vine-metadata)