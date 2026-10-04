// ARCHITECTURE CONFIG: all unlabelled endpoint coordinates and opening positions below are ASSUMPTION. Feet.
// Measured room spans come from parameters.js; these are nominal plan spans, wall datum ambiguity remains.
import {A,measured} from './parameters.js';
// Only ground-floor.jpg and first-floor.jpg define topology. Facade collage is never read here.
const wall=(a,b,openings=[],outer=false)=>({a,b,openings,outer});
const D=(center,width=3)=>({type:'door',center,width,source:'D mark; size ASSUMPTION'});
const W=(center,width=5)=>({type:'window',center,width,source:'W mark; size ASSUMPTION'});
const V=(center)=>({type:'vent',center,width:2.5,source:'V mark; size ASSUMPTION'});
const room=(name,x,z,w,d)=>({name,polygon:[[x,z],[x+w,z],[x+w,z+d],[x,z+d]],dimension:[w,d]});
const g=measured.ground,f=measured.first;
export const ground={id:'ground',
 outline:[[0,0],[34.25,0],...A.storeCorners.slice(1),...A.rightBoundary.slice(1),[34,29.1],[31.6,31.5],[17.5,31.5],[17.5,29],[0,29],[0,18.167],[-13.583,18.8],[-15,44],...A.frontTerraceNotch.slice().reverse(),[17.5,31.5],[17.5,29],[0,29]],
 // Separate closed polygon avoids self intersections from open terrace/site boundary.
 slabs:[[[0,3.4],[6,3.4],[6,0],[34.25,0],[38.9,-11.25],[53.3,-7.2],[46.1,17.4],[34,17.4],[34,29.1],[31.6,31.5],[17.5,31.5],[17.5,29],[0,29]],[[0,18.167],[-13.583,18.8],[-15,44],[1,44],[1,38],[4,38],[4,34],[17.5,34],[17.5,29],[0,29]]],
 rooms:[room('BEDROOM · 12′ × 11′',6,0,...g.bedroomWest),room('STUDY · 10′3″ × 11′',18,0,...g.study),room('BEDROOM · 12′ × 11′',28.25,0,...g.bedroomEast),room('TOILET · 6′ × 7′',0,3.4,...g.toilet),room('O.T.S.',0,0,6,3.4),room('LOBBY · 34′3″ × 11′',0,11,...g.lobby),room('VERANDAH · 17′6″ × 7′',0,22,...g.verandah),{name:'STORE · skew outline',polygon:A.storeCorners},{name:'TERRACE',polygon:[[-13.5,22],[-14.5,43],[0,43],[0,29]]}],
 walls:[wall([0,0],[40.25,0],[D(38.5)],true),wall(A.storeCorners[0],A.storeCorners[1],[],true),wall(A.storeCorners[1],A.storeCorners[2],[],true),wall(A.storeCorners[2],A.storeCorners[3],[],true),wall([40.25,0],[51.2,0],[V(4)],true),wall([51.2,0],[46.1,17.4],[],true),wall([46.1,17.4],[34.25,17.4],[],true),wall([0,0],[0,22],[],true),wall([0,3.4],[6,3.4],[V(3)]),wall([6,0],[6,11]),wall([0,10.4],[6,10.4],[D(4.7,2.6)]),wall([6,11],[18,11],[D(10.5)]),wall([18,0],[18,11]),wall([18,11],[28.25,11],[D(8.3)]),wall([28.25,0],[28.25,11]),wall([28.25,11],[40.25,11],[D(1.5),W(8)]),wall([40.25,0],[40.25,11],[],true),wall([34.25,14.4],[34.25,29.1],[W(5)],true),wall([0,22],[17.5,22],[D(3),W(7,4),W(13,5)],true),wall([17.5,22],[17.5,31.5]),wall([17.5,31.5],[31.6,31.5],[W(7,6)],true),wall([31.6,31.5],[34,29.1],[],true)],
 stairs:[{kind:'main',x:A.groundMainStairLeft,z:A.stairLandingZ,width:16,depth:A.stairFrontZ-A.stairLandingZ},{kind:'external',x:A.exteriorStairX,z:A.exteriorStairZ,width:13.583,depth:11}],
 terraces:[{polygon:[[-13.583,18.8],[-15,44],[1,44],[1,38],[4,38],[4,34],[17.5,34]],open:true}],
 ots:[[0,0],[6,0],[6,3.4],[0,3.4]]};
export const first={id:'first',slabs:[[[0,3.4],[6.083,3.4],[6.083,0],...A.upperTerraceCorners.slice(1,7),[35.333,21],[35.333,28.4],[29.6,34],[18,34],[18,33.625],[6,33.625],[6,29.167],[0,29.167],[-13,29.167],[-13,18.167],[0,18.167]]],
 rooms:[room('BEDROOM · 13′ × 11′',-13,18.167,...f.bedroomWest),room('BEDROOM · 12′ × 11′',6,22.625,...f.bedroomFront),room('TOILET · 6′1″ × 7′',0,3.4,...f.toiletRear),room('O.T.S.',0,0,6.083,3.4),room('TOILET · 5′ × 7′',-13,29.167,...f.toiletFront),room('LOBBY · 35′4″ / 10′7½″',0,12,35.333,10.625),{name:'TERRACE',polygon:A.upperTerraceCorners},room('CAR PORCH · 16′ WIDE',-8,29.167,14,9)],
 walls:[wall([0,0],[6.083,0],[],true),wall([0,0],[0,18.167],[],true),wall([0,3.4],[6.083,3.4],[V(3)]),wall([6.083,0],[6.083,10.4],[],true),wall([0,10.4],[6.083,10.4],[D(4.7,2.6)]),wall([0,12],[35.333,12],[D(10.5)],true),wall([0,18.167],[-13,18.167],[],true),wall([-13,18.167],[-13,36.167],[],true),wall([-13,29.167],[0,29.167],[D(3.5),W(9,5)],true),wall([0,29.167],[0,22.625]),wall([0,22.625],[0,18.167],[D(2)]),wall([-13,36.167],[-8,36.167],[V(2.5)],true),wall([-8,29.167],[-8,36.167],[],true),wall([6,22.625],[6,33.625],[D(1.6)]),wall([6,33.625],[18,33.625],[W(4.5,5)],true),wall([18,33.625],[18,22.625]),wall([6,22.625],[18,22.625],[D(2)]),wall([35.333,12],[35.333,28.4],[],true),wall([35.333,28.4],[29.6,34],[],true),wall([29.6,34],[18,34],[W(6,6)],true),wall([18,34],[18,18.7]),wall([18,18.7],[35.333,18.7],[D(15)])],
 terraces:[{polygon:A.upperTerraceCorners}],
 roofPolygons:[[[0,3.4],[6.083,3.4],[6.083,12],[9,12],[9,13.5],[12,13.5],[12,12],[35.333,12],[35.333,28.4],[29.6,34],[18,34],[18,33.625],[6,33.625],[6,29.167],[-8,29.167],[-8,36.167],[-13,36.167],[-13,18.167],[0,18.167]]],
 stairs:[{kind:'roof',x:10,z:9,width:17,depth:3}],ots:ground.ots};
