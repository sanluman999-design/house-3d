# House 3D — final plans, Facade Revision 3

Build: **2026-10-05-final-plans-r3**

Public site: **https://sanluman999-design.github.io/house-3d/**

The site opens on desktop and mobile through HTTPS; no Python or local server is needed for the public version. This release retains the existing Three.js application, English controls and Facade Revision 3 materials, with geometry rebuilt from the two final plans confirmed by the client.

## Authoritative plans

- `reference/ground-floor.jpg`: supplied **1000027739.jpg**, WITHOUT the large terrace at the upper right. This is Ground Floor / Piano Terra.
- `reference/first-floor.jpg`: supplied **1000027742.jpg**, WITH the large upper-right terrace. This is First Floor.

Both images may say GROUND FLOOR PLAN. The client's explicit floor assignment takes precedence. No older plan or plan embedded in a facade reference supplies geometry.

Ground Floor includes Drawing Room, Kitchen, two bedrooms, two toilets, central and angled Stores, Lobby, Verandah, stair block, side yard and Main Gate. First Floor includes two bedrooms, Kitchen, Store, two toilets, Lobby, the continuing stairs, and the two open terraces.

## Roof and stairs

The dotted strip immediately east of the First Floor Store is **roof**, as confirmed by the client. It is part of the continuous upper roof and has the same elevation, thickness and material. It is not modelled as an open terrace.

First Floor stairs continue upward along the same three-flight U route and direction as Ground Floor. The roof has an intentional stair-access opening and an unobstructed arrival edge. No rooftop room, headhouse or hatch has been invented. Its lightweight edge guards reuse the existing railing materials. Their detailed dimensions, riser count and roof-opening clearance remain provisional.

The actual OTS stays open through the floors and roof. Both terraces remain open. The only roof voids are the OTS and the deliberate stair opening; remote/outside hole contours are rejected before roof triangulation.

## Controls

- **Whole House / Ground Floor / First Floor** select the view.
- **Roof On/Off** works in Whole House and First Floor. It is disabled for Ground Floor.
- **Day / Evening** changes the existing lighting.
- **Top View / Reset View** use the existing camera functions.
- Mouse drag or touch drag rotates; wheel or pinch zooms; right drag or two-finger drag pans.
- **Geometry** simplifies finishes for inspection.
- **Plans & assumptions** opens the two final plans and documentation.

No changes were made to the camera, OrbitControls, UI event handlers, CSS layout or material definitions. The JavaScript module URLs carry a release query through the import map so a browser does not mix old cached geometry modules with the new release.

## Accuracy and assumptions

This is a **visual 3D reconstruction**, not precise CAD/BIM, structural design or construction documentation. Labelled dimensions are prioritised. Wall datums/thicknesses, unlabelled opening positions, skew angles and incomplete dimension chains still require architectural confirmation. See [FINAL-PLANS.md](FINAL-PLANS.md) for specific dimensional residuals and assumptions.

Existing assumed storey height is 3.2 m; slab/roof thickness is 0.18 m. Existing door/window heights, parapets, facade materials and Day/Evening intensities are retained. The supplied floor plans do not certify these vertical dimensions.

## Local use

For a complete local checkout with the launcher files, install Python 3 and run `START-HOUSE-3D.bat` on Windows, or `python3 serve.py` on macOS/Linux. The server opens the specific release URL after binding successfully. If port 8080 is occupied it chooses a free port. `HOUSE_3D_PORT` can set the requested port; `--no-browser` suppresses browser launch. Opening `index.html` directly is not supported because JavaScript modules need HTTP(S).

The online Pages site uses relative resource URLs under `/house-3d/`. Three.js 0.180.0 is bundled locally. No external texture service, CDN library or new runtime dependency is required.
