import * as T from 'three';
// Local deterministic textures. UV scale is in metres, assigned by primitives.js.
function texture(kind){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d');let seed=1703;
 const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
 c.fillStyle={stone:'#706858',wood:'#9e5d2c',tile:'#807c72',slate:'#30363b'}[kind];c.fillRect(0,0,512,512);
 if(kind==='stone')for(let row=0;row<4;row++){
  let x=row%2?-130:0;while(x<512){const width=145+Math.floor(random()*95),v=Math.floor(random()*20);
   c.fillStyle=`rgb(${165+v},${150+v},${125+v})`;c.fillRect(x+2,row*128+2,width-4,124);
   c.fillStyle='#f3e5c344';c.fillRect(x+2,row*128+2,width-4,2);x+=width;
  }
 }
 if(kind==='tile'){c.fillStyle='#b1aa9b';c.fillRect(3,3,506,506)}
 for(let i=0;i<17000;i++){c.fillStyle=i%2?'#ffffff12':'#00000013';c.fillRect(random()*512,random()*512,kind==='wood'?1:2,kind==='wood'?35:1)}
 if(kind==='wood')for(let i=0;i<90;i++){c.strokeStyle=i%2?'#4b281c55':'#e0a56150';c.lineWidth=.6+random();c.beginPath();const x=random()*512;c.moveTo(x,0);c.bezierCurveTo(x+12,160,x-12,350,x,512);c.stroke()}
 if(kind==='slate')for(let i=0;i<14;i++){c.strokeStyle='#a6aca31b';c.lineWidth=.8;c.beginPath();const x=random()*512;c.moveTo(x,0);c.lineTo(x+50,190);c.lineTo(x-70,512);c.stroke()}
 const t=new T.CanvasTexture(canvas);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;
}
const stone=texture('stone'),wood=texture('wood'),tile=texture('tile'),slate=texture('slate');
const textured=(options,scale)=>{const m=new T.MeshStandardMaterial(options);m.userData.textureMetres=scale;return m};
export const M={
 stone:textured({color:0xffffff,map:stone,bumpMap:stone,bumpScale:.018,roughness:.92},[1.6,.8]),
 inner:new T.MeshStandardMaterial({color:0xf1eee5,roughness:.9}),
 slab:new T.MeshStandardMaterial({color:0xb9b3a6,roughness:.85}),
 floor:new T.MeshStandardMaterial({color:0xe0dacf,roughness:.8}),
 terrace:textured({color:0xe6dac5,map:tile,roughness:.87},[.8,.8]),
 roof:textured({color:0xadada6,map:tile,roughness:.95},[.8,.8]),
 dark:new T.MeshStandardMaterial({color:0x242c32,roughness:.55,metalness:.16}),
 accent:textured({color:0xffffff,map:slate,roughness:.72},[1.2,2.8]),
 wood:textured({color:0xffffff,map:wood,roughness:.64},[.5,2.6]),
 glass:new T.MeshStandardMaterial({color:0x759ca8,transparent:true,opacity:.35,roughness:.12,metalness:.3,depthWrite:false,side:T.DoubleSide}),
 ground:new T.MeshStandardMaterial({color:0xa8b3a5,roughness:1}),
 light:new T.MeshStandardMaterial({color:0xffdeb3,emissive:0xffac49,emissiveIntensity:0}),
 white:new T.MeshStandardMaterial({color:0xece6d9,roughness:.75})
};
export function geometryMode(on){M.stone.map=on?null:stone;M.stone.bumpMap=on?null:stone;M.stone.color.set(on?0xe6e9e7:0xffffff);M.stone.needsUpdate=true;M.wood.map=on?null:wood;M.wood.color.set(on?0xaaaaaa:0xffffff);M.wood.needsUpdate=true}
