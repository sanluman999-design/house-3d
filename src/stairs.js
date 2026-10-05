import {FT,P} from './parameters.js';import {box} from './primitives.js';import {M} from './materials.js';
import {stairPath} from './stair-paths.js';
export {stairPath,mainStairHole} from './stair-paths.js';
export function buildStairs(group,s,y){const path=stairPath(s),segments=path.slice(1).map((b,i)=>({a:path[i],b,len:Math.hypot(b[0]-path[i][0],b[1]-path[i][1])}));let total=segments.reduce((v,s)=>v+s.len,0),count=P.stairSteps,rise=P.floorHeight/count;
 for(let i=0;i<count;i++){let at=(i+.5)*total/count,seg;for(const q of segments){seg=q;if(at<=q.len)break;at-=q.len}const dx=seg.b[0]-seg.a[0],dz=seg.b[1]-seg.a[1],x=seg.a[0]+dx*at/seg.len,z=seg.a[1]+dz*at/seg.len;const m=box(group,total/count-.002,rise,P.stairWidth,x,y+(i+.5)*rise,z,M.terrace);m.rotation.y=-Math.atan2(dz,dx);m.name=group.name+'-stair-step-'+i;m.userData.stairStep=i}
 // The receiving slab provides the landing; no coplanar duplicate landing plate.
}
