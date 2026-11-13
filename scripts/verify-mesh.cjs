const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
const geometry=src.slice(src.indexOf('function buildGarmentMesh(type)'),src.indexOf('const meshes={}'));
vm.runInNewContext(geometry+`
for(const type of ['tee','polo','hoodie','bomber']){
const {data,bodyEnd,trimEnd}=buildGarmentMesh(type);
let invalid=0,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
for(let i=0;i<data.length;i+=6){for(let j=0;j<3;j++){min[j]=Math.min(min[j],data[i+j]);max[j]=Math.max(max[j],data[i+j]);}const l=Math.hypot(...data.slice(i+3,i+6));if(!Number.isFinite(l)||Math.abs(l-1)>.001)invalid++;}
if(!data.length||invalid||!data.every(Number.isFinite))throw Error('Invalid garment geometry');
if(type==='hoodie'&&!(max[1]>1.45&&trimEnd>bodyEnd))throw Error('Missing folded hood or outerwear trim');
if(type==='bomber'&&!(trimEnd>bodyEnd&&data.length/6>trimEnd))throw Error('Missing bomber collar/trim or zipper');
if(type==='polo'&&!(trimEnd>bodyEnd&&data.length/6>trimEnd))throw Error('Missing polo construction');
console.log(JSON.stringify({type,vertices:data.length/6,bounds:{min,max},invalidNormals:invalid,finite:true}));
}`,{console},{timeout:20000});
