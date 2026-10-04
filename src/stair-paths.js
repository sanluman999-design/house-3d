import {FT,P} from './parameters.js';
export function stairPath(s){const x=s.x*FT,z=s.z*FT,w=s.width*FT,d=s.depth*FT,t=P.stairWidth;
 if(s.kind==='roof')return [[x+w,z+d/2],[x+.5*FT,z+d/2],[x+.5*FT,z+4.5*FT]];
 if(s.kind==='external')return [[x+t/2,z+d],[x+t/2,z+t/2],[x+w,z+t/2]];
 return [[x+t/2,z],[x+t/2,z+d-t/2],[x+w-2.4*FT-t/2,z+d-t/2],[x+w-t/2,z+d-2.4*FT-t/2],[x+w-t/2,z]];
}
export function mainStairHole(s){const x=s.x,z=s.z,w=s.width,d=s.depth;return [[x+.1,z+.1],[x+w-.1,z+.1],[x+w-.1,z+d-2.6],[x+w-2.6,z+d-.1],[x+.1,z+d-.1]]}
