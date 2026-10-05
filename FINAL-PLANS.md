# Final-plan reconstruction — 2026-10-05

The two client-confirmed images supplied on 2026-10-05 are the only plan sources:

- `reference/ground-floor.jpg` = uploaded `1000027739.jpg`, WITHOUT the large upper-right terrace. Ground Floor / Piano Terra.
- `reference/first-floor.jpg` = uploaded `1000027742.jpg`, WITH the large upper-right terrace. First Floor.

The printed GROUND FLOOR PLAN title on both images is deliberately disregarded. The facade collage supplies no geometry. Facade Revision 3 materials, UI, camera/OrbitControls, Three.js and lighting behaviour are retained; facade and fixture positions follow the new walls.

## Geometry prepared

Ground Floor: rear toilet / OTS, 12 × 11 bedroom, 10 × 11 Store (not Study), 12 × 11 east bedroom, angled rear Store, central lobby, 13 × 11 Drawing Room, 12 × 10 ft 3 in Kitchen, front 4 × 7 toilet, Verandah, side yard, Main Gate and boundary segments.

First Floor: same rear toilet / OTS registration, rear 12 × 11 bedroom and 10 × 11 Store, 13 × 11 west bedroom, 11 × 8 ft 3 in Kitchen, front 4 × 7 toilet, central lobby, common stair block, rear/right terrace and stepped front terrace. The obsolete front bedroom, external west stair, car-porch interpretation and stair chamfer are removed.

Both storeys share the same three-flight U stair coordinates and direction. The upper slab has a U-shaped stair opening preserving the central landing/lobby. Duplicate coplanar landing plates are removed. Roof and slabs are generated from polygon unions/differences, not overlapping rectangular patches. A hole-containment guard rejects outside holes before triangulation. The real OTS is present in both floors and roof. Front and rear terraces are excluded from the roof.

## Client-confirmed clarifications

1. The narrow strip immediately east of Store 10 × 11, ending at the dotted edge, is ROOF. It is integrated into the continuous roof outline with the same height, thickness and material. It is excluded from terrace paving.
2. The First Floor stair continues upward with the same U-shaped route and direction as Ground Floor. No rooftop room, headhouse or hatch is added. An intentional stair opening in the roof clears the continuing flights. Its arrival edge is left unobstructed; lightweight guards use the existing facade railing materials. Opening width/guards/riser count remain provisional construction details, not dimensions supplied by the client.

The only roof voids are the actual OTS and this intentional stair-access opening. Neither belongs to the Store-side roof strip. Open terraces retain their final-plan outlines.

## Dimensional limits / explicit assumptions

Room labels and dimension strings are transcribed from the new plans. The 34 ft 1 in upper core width and 32 ft 10 in lobby width imply two 7.5 in exterior walls. Other wall thicknesses and datums are not consistently dimensioned: 6 in partitions and approximately 9.5 in kitchen/stair partitions are working assumptions. They require confirmation, not CAD-level certification. The 13 ft 6 in Ground Floor kitchen external note versus clear room/partition widths leaves a roughly 1 in fit residual. The west 13 ft bedroom/drawing span and 13 ft 7 in return also do not uniquely fix the wall datums. No dimension has been silently relabelled to hide these residuals.

The angled Store outer sides labelled 12 ft 2.5 in and 16 ft 5 in are used. Their directions, the unlabelled terrace notch and yard/gate vertices are traced estimates because no survey bearings/complete chain dimensions are supplied. The Store's individual clear side dimensions cannot all be certified against that provisional exterior outline. The Verandah's 16 ft WIDE note has no unambiguous dimension endpoints; its drawn outline is traced rather than forcing an arbitrary rectangle.

OTS depth, most unlabelled door/window widths and offsets, roof opening clearances/guards, riser count and all vertical dimensions are provisional. Existing storey height 3.2 m, slab/roof thickness 0.18 m, parapets, window/door heights and facade materials remain unchanged. This is a visual reconstruction, not CAD/BIM, structural design or construction documentation.

## Release

Public URL remains https://sanluman999-design.github.io/house-3d/ . Build identifier: `2026-10-05-final-plans-r3-entry-windows`. Source-module URLs are versioned through the import map to avoid mixing cached old geometry with the new release. No new runtime dependency is added. See README.md for the release checks and usage.

## Central entry and kitchen correction

The central Ground Floor opening under the front balcony now contains the main entrance door. The matching First Floor opening has a balcony door on exactly the same horizontal axis. Both use closed leaves, existing wood/frame materials and the unchanged door height. The Ground Floor plan marks the entrance as 4 ft wide; the upper door uses the same opening width to register with it. Only the missing doorway wall/jambs were added at the existing corridor mouths.

The Ground Floor kitchen has two separate windows in its west and east side walls, within the front projection beyond the staircase enclosure. They do not wrap around the corners. The former inferred west kitchen door and front-centre window are replaced by this client-confirmed arrangement; the kitchen-to-lobby passage remains unchanged. The side-window widths are not separately dimensioned on the raster: the available existing exposed side-wall run sets each opening to 1.1875 ft (14.25 in), leaving solid corner connections. These widths remain provisional and are not claimed as architect-certified dimensions. Existing sill, head heights, glazing and frame materials are retained.

All room polygons, wall axes outside the two new doorway infills, stairs, Store-side roof, slabs, terraces and OTS match the preceding r3 geometry. The left kitchen window's exterior trim has an explicit outward normal so its surround is outside. No general facade, camera, controls, lighting, material or UI redesign was made.
