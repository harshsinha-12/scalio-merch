const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
const geometry=src.slice(src.indexOf('const data=[]'),src.indexOf('const mesh='));
vm.runInNewContext(geometry+`
let invalid=0,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
for(let i=0;i<data.length;i+=6){for(let j=0;j<3;j++){min[j]=Math.min(min[j],data[i+j]);max[j]=Math.max(max[j],data[i+j]);}const l=Math.hypot(...data.slice(i+3,i+6));if(!Number.isFinite(l)||Math.abs(l-1)>.001)invalid++;}
if(!data.length||invalid||!data.every(Number.isFinite))throw Error('Invalid garment geometry');
console.log(JSON.stringify({vertices:data.length/6,bounds:{min,max},invalidNormals:invalid,finite:true}));`,{console},{timeout:10000});
