import * as T from 'three';import {P,FT} from './parameters.js';import {ground,first} from './floors.js';import {polygon,along,box} from './primitives.js';import {buildWalls} from './walls.js';import {buildStairs,mainStairHole} from './stairs.js';import {M} from './materials.js';import {dress,railing,finishWalls,finishRoof} from './facade.js';import {labels} from './labels.js';
export function createHouse(scene){const groups={ground:new T.Group(),first:new T.Group(),roof:new T.Group(),decor:new T.Group(),groundDecor:new T.Group(),firstDecor:new T.Group(),connectionStairs:new T.Group(),groundLabels:new T.Group(),firstLabels:new T.Group()};for(const [name,g] of Object.entries(groups)){g.name=name;scene.add(g)}
 for(const [data,group,y] of [[ground,groups.ground,P.groundElevation],[first,groups.first,P.groundElevation+P.floorHeight]]){
 const holes=[data.ots];if(data===first)holes.push(mainStairHole(ground.stairs[0]));for(const poly of data.slabs){ // Only punch holes contained in a particular slab.
 const inside=p=>{let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0]))c=!c}return c};const valid=holes.filter(h=>h.every(inside));polygon(group,poly,y-P.slabThickness,P.slabThickness,M.floor,valid)}buildWalls(group,data,y);finishWalls(data===ground?groups.groundDecor:groups.firstDecor,data,y);
 for(const terrace of data.terraces)polygon(group,terrace.polygon,y+.002,.012,M.terrace);for(const s of data.stairs)buildStairs(data===ground?groups.connectionStairs:group,s,y);
 if(data===first)railing(group,data.terraces[0].polygon.slice(1,8),y);
 labels(data===ground?groups.groundLabels:groups.firstLabels,data.rooms,y)}
 // Porch area explicitly shown on First Floor: open void rather than another room.
 polygon(groups.first,[[-13,29.167],[-8,29.167],[-8,36.167],[-13,36.167]],P.groundElevation+P.floorHeight-P.slabThickness,P.slabThickness,M.floor);
 const ry=P.groundElevation+P.floorHeight*2;
 for(const poly of first.roofPolygons){polygon(groups.roof,poly,ry-P.slabThickness,P.slabThickness,M.roof);for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],l=Math.hypot(b[0]-a[0],b[1]-a[1])*FT;along(groups.roof,a,b,0,l,ry,ry+P.parapetHeight,M.stone)}}
 finishRoof(groups.roof,first.roofPolygons,ry);
 dress(groups.groundDecor,P.groundElevation);
 const site=box(scene,24,.15,24,5,-.13,5,M.ground);site.castShadow=false;
 groups.groundLabels.visible=groups.firstLabels.visible=false;
 return groups}
