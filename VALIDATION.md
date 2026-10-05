# Final-plan release validation — 2026-10-05

Build `2026-10-05-final-plans-r3`, Facade Revision 3 application retained.

## Geometry

- The two reference JPEGs are byte-identical to the final uploads; floor assignment follows the client's instruction, not the duplicated printed title.
- Both floors share the same U stair route and orientation. Their 24 provisional treads have identical horizontal positions and exactly 3.2 m vertical separation.
- The Store-side dotted strip is covered by the continuous roof.
- OTS and both open terraces are excluded from roof coverage.
- An intentional U-shaped roof stair opening clears the upper flight. The arrival edge has no blocking guard, parapet, room or hatch.
- Actual rendered roof triangles were checked against 14,688 independent footprint samples: zero mismatches. Triangle area 1191.211270 ft² versus expected 1191.211292 ft² (floating-point tolerance).
- Zero stair/roof collision samples, zero duplicate roof meshes, zero crossing or overlapping wall axes. Door/window intervals stay within their walls and do not overlap each other.
- Roof was visually inspected from above in Whole House and First Floor, and from front, rear and right oblique views. No accidental holes or flickering surfaces were observed. Room-centre coverage includes both toilets, bedrooms, Kitchen and Store.
- Facade belts terminate at the slab underside so they do not protrude through the roof. Duplicate guard posts and coplanar stair landing plates are removed.

## Runtime and controls

Local Chromium / WebGL 2.0 (software renderer): no JavaScript or resource errors.

Passed: Whole House, Ground Floor, First Floor; Roof On/Off in Whole House and First Floor; Roof disabled on Ground Floor; Day/Evening; Top View; Reset View; mouse orbit; wheel zoom; Geometry mode; Plans & assumptions.

Mobile emulation, 390 × 844, touch enabled: all floor selectors, roof controls, Day/Evening, Top/Reset, touch orbit, two-finger pinch zoom, information panel. No horizontal overflow. Mobile screenshot visually inspected. This is browser emulation, not a claim of testing every physical phone.

Camera, UI event handlers, CSS, material definitions and bundled Three.js/OrbitControls are byte-identical to the saved pre-edit version. Existing lighting behaviour is retained; fixture coordinates follow the new walls. No new runtime dependencies.

## Local launch and scope

Existing `serve.py` was started on an automatically selected free port and successfully served this exact release. `START-HOUSE-3D.bat` is unchanged and still invokes that server from its own directory. A native Windows environment was not available for executing the BAT itself.

All metric precision limits and inferred construction parameters remain documented in FINAL-PLANS.md. Validation of a visual reconstruction is not structural or construction certification.


## 2026-10-05 final-plans-r3-entry-windows

Local WebGL 2 inspection: both new closed doors viewed from outside and inside; 20 leaf ray checks pass, axes aligned, leaves start at each finished floor and remain below the slab. Both separate kitchen side windows have glass and no opaque blockage through their apertures. Exterior/interior screenshots inspected.

Geometry comparison to r3: all non-wall floor data identical; only three Ground Floor kitchen opening definitions and two new doorway infill walls change. Roof sampling: 14,688 points, no mismatches; no duplicate roof meshes or stair/roof collisions. OTS, open terraces and Store-side roof preserved.

Desktop and 390 × 844 mobile WebGL regressions cover Whole House, both floors, Roof On/Off, Day/Evening, Top View, Reset View, mouse orbit/wheel zoom, touch orbit and two-finger pinch zoom, and the information panel. No JavaScript/resource errors. Mobile testing uses browser touch emulation, not a physical handset. Source UI, camera, CSS, materials, lighting, local server and Windows launcher are unchanged.
