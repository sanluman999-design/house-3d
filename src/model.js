import * as T from 'three';
import {P,FT} from './parameters.js';
import {ground,first} from './floors.js';
import {polygon,along,box} from './primitives.js';
import {buildWalls} from './walls.js';
import {buildStairs,mainStairHole} from './stairs.js';
import {M} from './materials.js';
import {railing,finishWalls,finishRoof} from './facade.js';
import {labels} from './labels.js';
function inside(p,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function surface(group,shape,y,material,extra=[]){
 const holes=[...shape.holes,...extra];
 for(const h of holes)if(!h.every(p=>inside(p,shape.polygon)))throw new Error('Invalid hole outside final-plan surface');
 const mesh=polygon(group,shape.polygon,y-P.slabThickness,P.slabThickness,material,holes);
 mesh.name=material===M.roof?'roof-surface':'floor-surface';mesh.userData.holes=holes;return mesh;
}
export function createHouse(scene){
 const groups={ground:new T.Group(),first:new T.Group(),roof:new T.Group(),decor:new T.Group(),groundDecor:new T.Group(),firstDecor:new T.Group(),connectionStairs:new T.Group(),groundLabels:new T.Group(),firstLabels:new T.Group()};
 for(const [name,g] of Object.entries(groups)){g.name=name;scene.add(g)}
 for(const [data,group,y] of [[ground,groups.ground,P.groundElevation],[first,groups.first,P.groundElevation+P.floorHeight]]){
  const stairHole=mainStairHole(ground.stairs[0]);
  for(const shape of data.slabShapes)surface(group,shape,y,M.floor,data===first&&stairHole.every(p=>inside(p,shape.polygon))?[stairHole]:[]);
  buildWalls(group,data,y);finishWalls(data===ground?groups.groundDecor:groups.firstDecor,data,y);
  for(const terrace of data.terraces)polygon(group,terrace.polygon,y+.006,.012,M.terrace);
  for(const s of data.stairs)buildStairs(group,s,y);
  if(data===first)for(const path of data.railingPaths)railing(group,path,y);
  labels(data===ground?groups.groundLabels:groups.firstLabels,data.rooms,y);
 }
 const ry=P.groundElevation+P.floorHeight*2;
 for(const shape of first.roofShapes){
  // Same flight direction as Ground Floor; the roof opening clears the steps.
  // No enclosed rooftop room or hatch is added.
  const stairHole=mainStairHole(first.stairs[0]);
  surface(groups.roof,shape,ry,M.roof,[stairHole]);
  // Leave the arrival edge (hole[0] -> hole[1]) open, so the exit is unobstructed.
  railing(groups.roof,[...stairHole.slice(1),stairHole[0]],ry);
  for(const ring of [shape.polygon,...shape.holes])for(let i=0;i<ring.length;i++){
   const a=ring[i],b=ring[(i+1)%ring.length],l=Math.hypot(b[0]-a[0],b[1]-a[1])*FT;
   along(groups.roof,a,b,0,l,ry,ry+P.parapetHeight,M.stone);
  }
  finishRoof(groups.roof,[shape.polygon,...shape.holes],ry);
 }
 for(const [a,b] of ground.boundary){const len=Math.hypot(b[0]-a[0],b[1]-a[1])*FT;along(groups.ground,a,b,0,len,P.groundElevation,P.groundElevation+1.15,M.stone);along(groups.ground,a,b,0,len,P.groundElevation+1.15,P.groundElevation+1.21,M.dark,.23)}
 const gateA=[-8.7,50],gateB=[2,50];const gl=(gateB[0]-gateA[0])*FT;
 along(groups.ground,gateA,gateB,0,gl,P.groundElevation,P.groundElevation+1.6,M.dark,.06);
 const site=box(scene,27,.15,29,5,-.13,6,M.ground);site.castShadow=false;
 groups.groundLabels.visible=groups.firstLabels.visible=false;
 return groups;
}
