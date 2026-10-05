// Internal geometry: metres. Plan coordinates below use feet and convert exactly once.
export const FT = 0.3048;
export const feet = (ft, inches=0) => (ft + inches/12)*FT;
export const P = {
 // ALL values here are ASSUMPTION: neither plan supplies vertical dimensions.
 // ASSUMPTION: finish dimensions in metres; decoration never changes plan openings.
 // ASSUMPTION: surface-mounted facade finish dimensions; no plan geometry changes.
 facadeReveal:.012, facadeAccentDepth:.055, facadeSlatDepth:.09, facadeSlatWidth:.065, facadeSlatPitch:.125,
 roofFasciaHeight:.25, roofFasciaProjection:.12, windowHoodProjection:.34, windowHoodHeight:.105,
 trimWidth:.10, trimDepth:.035, beltHeight:.17, beltDepth:.065, plinthHeight:.22,
 roofCapHeight:.06, roofCapDepth:.08, accentWidth:.55, stripHeight:.018,
 floorHeight:3.2, slabThickness:0.18, wallThickness:0.20, internalWallThickness:0.13,
 doorHeight:2.12, doorWidth:0.90, windowHeight:1.35, windowSill:0.86,
 ventSill:2.12, ventHeight:0.4, windowFrame:0.055, doorLeafThickness:0.045, parapetHeight:0.85, railingHeight:1.05,
 railingPost:0.035, groundElevation:0.28, stairWidth:1.05, stairSteps:24,
 canopyThickness:0.16, canopyProjection:0.48, facadePanelThickness:0.045,
 fixtureHeight:0.25, fixtureWidth:0.13, fixtureMount:2.25, sinkHeight:.8, toiletHeight:.43, slatWidth:0.055, slatDepth:0.09, slatSpacing:0.18, lightIntensity:10,
};
