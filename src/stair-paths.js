import {FT,P} from './parameters.js';
// Final plans: right flight UP, transverse flight at front, left flight DN.
// Both storeys use one shared registration; exact riser count remains provisional.
export function stairPath(s){const x=s.x*FT,z=s.z*FT,w=s.width*FT,d=s.depth*FT,t=P.stairWidth;
 return [[x+w-t/2,z],[x+w-t/2,z+d-t/2],[x+t/2,z+d-t/2],[x+t/2,z]];
}
export function mainStairHole(s){const x=s.x,z=s.z,w=s.width,d=s.depth,t=P.stairWidth/FT+.12;
 return [[x,z],[x+t,z],[x+t,z+d-t],[x+w-t,z+d-t],[x+w-t,z],[x+w,z],[x+w,z+d],[x,z+d]];
}
