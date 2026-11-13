// Exercise the real selection/download handlers with a minimal DOM and no GPU.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const source=fs.readFileSync(path.join(root,'dist/app.js'),'utf8');
const nodes=[],downloads=[];
function node(attrs={}){
 const n={dataset:{},style:{},hidden:false,textContent:'',offsetHeight:4000,disabled:false,
 classList:{toggle(){},add(){},remove(){}},setAttribute(k,v){this[k]=v},getAttribute(k){return this[k]},
 addEventListener(){},remove(){},click(){downloads.push({href:this.href,filename:this.download})},getContext(){return null},...attrs};
 return n;
}
for(const tag of html.matchAll(/<([a-z][a-z0-9]*)\b[^>]*>/g)){
 const n=node();for(const a of tag[0].matchAll(/([\w-]+)="([^"]*)"/g)){
  n[a[1]]=a[2];if(a[1].startsWith('data-'))n.dataset[a[1].slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=a[2];
 }nodes.push(n);
}
function matches(n,s){if(s[0]==='#')return n.id===s.slice(1);if(s[0]==='.')return (n.class||'').split(' ').includes(s.slice(1));const a=/^\[([^\]]+)\]$/.exec(s);return a&&Object.hasOwn(n,a[1]);}
const all=s=>nodes.filter(n=>matches(n,s));const one=s=>{const found=all(s)[0];if(!found)throw Error('Missing DOM selector: '+s);return found;};
const document={querySelector:one,querySelectorAll:all,fonts:{ready:Promise.resolve()},body:node({append(){}}),createElement:()=>node(),visibilityState:'visible'};
const window={addEventListener(){},scrollTo(){}};
const context={document,window,console,Image:class{complete=true},matchMedia:()=>({matches:true}),scrollY:0,innerHeight:900,requestAnimationFrame(){},URL,Blob,setTimeout(){},atob};
(async()=>{
 await vm.runInNewContext(source,context);
 assert(!one('#status').textContent.includes('could not initialize'),'App initialization failed');
 const poses=['product-front','product-back','model-front','model-back'];
 for(const garment of ['tee','polo','hoodie','bomber'])for(const color of ['ink','cream','orange','gray']){
  all('[data-garment]').find(b=>b.dataset.garment===garment).onclick();
  all('[data-color]').find(b=>b.dataset.color===color).onclick();
  for(const pose of poses){
   all('[data-photo-preview]').find(b=>b.dataset.photoPreview===pose).onclick();
   all('[data-photo-download]').find(b=>b.dataset.photoDownload===pose).onclick();
   const d=downloads.at(-1);
   assert.equal(d.href,one('#photo-display').src,'Downloaded image differs from preview');
   assert(d.filename.includes(color)&&d.filename.includes(pose),'Wrong color/view download');
   assert.equal(d.filename.includes(garment==='tee'?'polo':garment),garment!=='tee','Wrong garment download');
   assert(fs.existsSync(path.join(root,'dist',d.href)),'Missing photo asset');
  }
 }
 for(const bg of ['orange','night','paper']){
  all('[data-bg]').find(b=>b.dataset.bg===bg).onclick();
  assert.equal(document.body.dataset.environment,bg);
  assert.equal(one('#photo-stage').hidden,true,'Background selector should display 3D');
 }
 console.log('Passed: 64 garment/color/view preview-download combinations and 3 background transitions.');
})().catch(e=>{console.error(e);process.exitCode=1});
