# House 3D — Facade revision 3 (2026-10-04-r3)

Visual, parameterised reconstruction of the supplied Ground Floor and First Floor plans. This is not precise CAD/BIM or construction documentation. Unspecified dimensions, vertical heights, openings, floor registration and stairs require architectural confirmation.

## Start locally

1. Extract the complete ZIP.
2. Windows: double-click `START-HOUSE-3D.bat`. Python 3 must be installed (Add Python to PATH).
3. macOS/Linux: run `python3 serve.py` from this folder.
4. Use the browser tab opened by the launcher. Check **FACADE REVISION 3** at the top. Keep the server window open.

The server binds successfully before opening the browser. If port 8080 is occupied by an older copy or another app, it chooses a free port without stopping that service. The exact **Open:** URL is printed in the console. All assets use the release path `/house-3d-2026-10-04-r3/` and no-store headers, preventing reuse of older module URLs.

Do not open `index.html` directly. On a phone, connect to the same Wi-Fi as the computer and use the exact **Phone on the same Wi-Fi:** URL printed in the server window. Find the computer's IPv4 with `ipconfig`. The computer must remain on. Allow firewall access only for your trusted private network if prompted. Set `HOUSE_3D_PORT` to change the port. No Node/npm or internet connection is needed to use the project. Three.js 0.180.0 is bundled locally.

## Controls

Drag to orbit; scroll/pinch to zoom. Right mouse drag or two fingers pan.

- Whole House: both floors, decorations and optional roof.
- Ground Floor: lower floor and labels; Roof is disabled and marked N/A.
- First Floor: upper floor at its existing elevation, labels and incoming stairs; Roof On/Off works.
- Roof On/Off: preserves your selected roof preference across views; pressed state reflects actual roof visibility.
- Day / Evening: daylight or warm emissive facade strips and existing architectural lights.
- Top View / Reset View: existing camera controls are preserved.
- Geometry: hides finish layers, slats and canopy decoration and simplifies stone/wood materials.
- Plans & assumptions: source plans and this documentation.

The interface is English and carries `translate="no"` plus a no-translate meta tag to discourage automatic browser translation.

## Sources and units

`reference/ground-floor.jpg` and `reference/first-floor.jpg` are the only architectural sources. `reference/facade.jpg` supplies finish/style cues only. Its embedded additional plan is completely excluded. No rooms, openings, stairs or floor proportions have been imported from that plan. Architecture/camera/stair generators remain byte-identical to the previous working version.

Plan coordinates are feet; `FT = 0.3048` converts once to metres. Inches are fractions of a foot: `feet(10,3)` = 3.1242 m. All heights and finish dimensions are metres.

Dimensions transcribed from the plans, stored in `measured` in `src/parameters.js`:

| Floor | Element | Plan dimension |
|---|---|---|
| Ground | West bedroom | 12′ × 11′ |
| Ground | Study | 10′3″ × 11′ |
| Ground | East bedroom | 12′ × 11′ |
| Ground | Toilet | 6′ × 7′ |
| Ground | Lobby | 34′3″ × 11′ |
| Ground | Verandah | 17′6″ × 7′ |
| Ground | Stair zone width | 16′ |
| Ground | Left / rear returns | 13′7″ / 18′2″ |
| Ground | Store annotated edges | 14′11″ / 11′3″ / 6′6″ |
| First | West bedroom | 13′ × 11′ |
| First | Front bedroom | 12′ × 11′ |
| First | Rear toilet | 6′1″ × 7′ |
| First | Front toilet | 5′ × 7′ |
| First | Lobby width / depth | 35′4″ / 10′7½″ |
| First | Stair zone width / depth | 17′ / 20′6″ |
| First | Car porch width | 16′ |
| First | Left / rear returns | 13′7″ / 18′2″ |

These are nominal plan spans, not verified clear internal dimensions. Wall datum/registration is ambiguous. Store edge labels and porch/stair dimensions do not imply that every model edge satisfies every source dimension exactly. Existing approximate positions remain unchanged in this refinement.

## Assumptions and editing

- `P` in `src/parameters.js`: all vertical and construction/finish dimensions are ASSUMPTION. Includes floorHeight, slabThickness, wallThickness, doorHeight, windowHeight/windowSill, parapetHeight, railings, frame/trim dimensions, belts, roof caps, slats and fixture sizes.
- `A` in the same file: estimated unlabelled plan positions, skew store/terrace corners, staircase registration and opening defaults.
- `src/architecture.js`: floor descriptions, rooms, wall endpoints, D/W/V-derived openings, roof and terrace polygons. Unlabelled positions, opening widths and swing directions remain assumptions.
- `src/stair-paths.js` and `src/stairs.js`: existing provisional stair routes and connecting slab hole. Exact landings/headroom and structural feasibility are not certified.

The shared floor datum is the rear toilet/O.T.S. corner, with x to the right and z toward the front. Original O.T.S. and main stair slab openings are retained. Do not use facade styling to resolve architectural uncertainty.

## Facade refinements

Light textured masonry; graphite/slate accents on existing closed exterior wall segments; timber-textured door leaves and existing slats; light opening surrounds and sills; dark frames and tinted glass; stone base courses avoiding doorway thresholds; shallow horizontal cornices; timber canopy soffit; tiled terrace/roof finishes; parapet caps and graphite roof fascia; warm emissive cornice/parapet strips in Evening. Existing glass terrace railing remains.

All finishes follow existing surfaces. No new window, door, balcony or room is introduced. Reference-like broad balconies, additional glazing, garden/boundary walls and exact ornamental screens are not reproduced because the authoritative plans do not justify them. Trim profiles, cladding divisions, texture scale, slat spacing, rail construction and lighting positions remain stylistic approximations with no supplied dimensions.

Textures are generated locally at 512 × 512, with metre-based wall UVs. Masonry joints and colour variation are visible at the default distance. Facade layers are mounted beyond the external wall face; they do not sit inside the wall thickness. No additional runtime dependency, photographic texture downloads, transmission renderer, bloom or extra shadow-casting light is introduced. Rendering still caps pixel ratio at 1.75 and uses a 1024 shadow map. Actual mobile performance needs device verification.

## Structure

`src/parameters.js` — dimensions and assumptions; `architecture.js`/`floors.js` — floor data; `walls.js`/`openings.js` — walls and openings; `stairs.js`/`stair-paths.js` — stairs; `facade.js` — finish layers and railings; `materials.js` — procedural materials; `lighting.js` — Day/Evening; `model.js` — assembly; `labels.js` — room labels; `ui.js` — mode state; `main.js` — unchanged scene/camera/orbit loop.

## Verification

See `DIAGNOSIS.md` for the delivered-archive audit and `VALIDATION.md` for actual checks and limitations. Current WebGL screenshots and the runtime-resource hash audit are in `previews/`.

- `python3 tests/server.py`: occupied-port, serving-root, exact runtime bytes and cache-header regression checks.
- `node tests/geometry.mjs`: architectural data checks.
- `node --experimental-loader ./tests/three-resolver.mjs tests/state.mjs`: real Three.js model construction and UI-state regression checks in a DOM harness; does not create WebGL.
- `node tests/browser.cjs`: expanded optional Playwright/Chrome suite. Install Playwright separately and supply `CHROME_BIN` if needed; optionally set `PLAYWRIGHT_MODULE` and `HOUSE_TEST_URL`. Starts this release server itself and produces current browser screenshots. For restricted Linux headless environments only, set `HOUSE_HEADLESS_SINGLE_PROCESS=1`; normal end-user browsers do not need this flag.
