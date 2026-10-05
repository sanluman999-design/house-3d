import {FT,P} from './parameters.js';
import {box,along} from './primitives.js';
import {M} from './materials.js';

export function railing(group,polygon,y){const posts=new Set();for(let i=0;i<polygon.length-1;i++){const a=polygon[i],b=polygon[i+1],len=Math.hypot(b[0]-a[0],b[1]-a[1])*FT;along(group,a,b,0,len,y+.12,y+P.railingHeight,M.glass,.025);along(group,a,b,0,len,y+P.railingHeight,y+P.railingHeight+.04,M.dark,.05);for(const p of [a,b]){const key=p.join(',');if(!posts.has(key)){box(group,P.railingPost,P.railingHeight,P.railingPost,p[0]*FT,y+P.railingHeight/2,p[1]*FT,M.dark);posts.add(key)}}}}

function inside(point,polygon){let result=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])result=!result}return result}
function outward(w,data){if(w.facadeNormal)return w.facadeNormal;const dx=w.b[0]-w.a[0],dz=w.b[1]-w.a[1],length=Math.hypot(dx,dz);let n=[dz/length,-dx/length];const middle=[(w.a[0]+w.b[0])/2,(w.a[1]+w.b[1])/2];const occupied=sign=>(data.enclosed||data.slabs).some(poly=>inside([middle[0]+sign*n[0],middle[1]+sign*n[1]],poly));if(occupied(1)&&!occupied(-1))n=n.map(v=>-v);return n}

// The old decorative panels were embedded in the wall centreline. Every new finish
// is explicitly offset beyond the exterior wall face, including half its own depth.
function surface(group,w,data,start,end,low,high,material,depth=P.facadeAccentDepth){
 start=Math.max(start,(w.facadeStart||0)*FT);
 const n=outward(w,data),offset=(w.thickness??P.wallThickness)/2+P.facadeReveal+depth/2;
 const shift=p=>[p[0]+n[0]*offset/FT,p[1]+n[1]*offset/FT];
 const mesh=along(group,shift(w.a),shift(w.b),start,end,low,high,material,depth);
 if(mesh){mesh.userData.facadeFinish=true;mesh.userData.wallFaceClearance=P.facadeReveal;mesh.userData.sourceWall=[w.a,w.b]}
 return mesh;
}

export function finishWalls(group,data,y){const wallTop=y+P.floorHeight-P.slabThickness;for(const w of data.walls.filter(w=>w.outer)){
 const len=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1])*FT;
 surface(group,w,data,0,len,wallTop-P.beltHeight,wallTop,M.white,P.beltDepth);
 surface(group,w,data,0,len,wallTop-P.beltHeight-P.stripHeight,wallTop-P.beltHeight,M.light,P.beltDepth+.003);
 // Split the base course at doors; no raised doorway thresholds.
 let start=0;for(const o of [...w.openings].filter(o=>o.type==='door').sort((a,b)=>a.center-b.center)){
 const left=(o.center-o.width/2)*FT;surface(group,w,data,start,left,y,y+P.plinthHeight,M.accent);start=(o.center+o.width/2)*FT;
 }surface(group,w,data,start,len,y,y+P.plinthHeight,M.accent);
 for(const o of w.openings){const l=(o.center-o.width/2)*FT,r=(o.center+o.width/2)*FT;
 const low=o.type==='door'?0:o.type==='vent'?P.ventSill:P.windowSill,high=o.type==='door'?P.doorHeight:o.type==='vent'?P.ventSill+P.ventHeight:P.windowSill+P.windowHeight;
 surface(group,w,data,Math.max(0,l-P.trimWidth),l,y+low,y+high+P.trimWidth,M.white,P.trimDepth);
 surface(group,w,data,r,Math.min(len,r+P.trimWidth),y+low,y+high+P.trimWidth,M.white,P.trimDepth);
 surface(group,w,data,Math.max(0,l-P.trimWidth),Math.min(len,r+P.trimWidth),y+high,y+high+P.trimWidth,M.white,P.trimDepth);
 if(o.type!=='door')surface(group,w,data,l,r,y+low-P.trimWidth,y+low,M.white,P.trimDepth+.04);
 if(o.type==='window'){
  surface(group,w,data,Math.max(0,l-P.trimWidth),Math.min(len,r+P.trimWidth),y+high+P.trimWidth,y+high+P.trimWidth+P.windowHoodHeight,M.dark,P.windowHoodProjection);
  surface(group,w,data,Math.max(0,l-P.trimWidth),Math.min(len,r+P.trimWidth),y+high+P.trimWidth-.025,y+high+P.trimWidth,M.wood,P.windowHoodProjection-.01);
 }
 }
 // Clad the existing chamfered stair-front wall, not a new tower or opening.
 const chamfer=w.a[0]>w.b[0]&&w.b[1]>w.a[1]&&w.a[1]>25;
 if(chamfer)surface(group,w,data,P.trimWidth,len-P.trimWidth,y+P.plinthHeight,wallTop-P.beltHeight-.04,M.accent);
 // Timber fluting occupies only the closed jamb zone beside the existing front window.
 const front=w.a[1]===w.b[1]&&w.a[1]>=31&&w.openings.some(o=>o.type==='window');
 if(front){
  const windows=w.openings.filter(o=>o.type==='window'),reverse=w.b[0]<w.a[0];
  const a=reverse?Math.max(...windows.map(o=>(o.center+o.width/2)*FT))+P.trimWidth:P.trimWidth;
  const b=reverse?len-P.trimWidth:Math.min(...windows.map(o=>(o.center-o.width/2)*FT))-P.trimWidth;
  if(b-a>P.facadeSlatPitch){
   surface(group,w,data,a,b,y+P.plinthHeight,wallTop-P.beltHeight-.04,M.dark);
   // Depth includes backing thickness so the slats are visible beyond it.
   for(let x=a;x+P.facadeSlatWidth<=b;x+=P.facadeSlatPitch)surface(group,w,data,x,x+P.facadeSlatWidth,y+P.plinthHeight+.06,wallTop-P.beltHeight-.1,M.wood,P.facadeSlatDepth);
  }
 }
}}

export function finishRoof(group,polygons,y){for(const poly of polygons)for(let i=0;i<poly.length;i++){
 const a=poly[i],b=poly[(i+1)%poly.length],len=Math.hypot(b[0]-a[0],b[1]-a[1])*FT;
 along(group,a,b,0,len,y+P.parapetHeight,y+P.parapetHeight+P.roofCapHeight,M.white,P.wallThickness+P.roofCapDepth*2);
 // Distinct height and depth from the wall belt eliminate the old coplanar flicker.
 along(group,a,b,0,len,y+.012,y+P.roofFasciaHeight,M.dark,P.wallThickness+P.roofFasciaProjection*2);
 along(group,a,b,0,len,y+P.parapetHeight-P.stripHeight,y+P.parapetHeight,M.light,P.wallThickness+.035);
}}
