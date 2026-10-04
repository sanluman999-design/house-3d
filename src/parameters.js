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
// ASSUMPTION: plan proportions used only for unlabelled positions/lengths.
// Shared registration: rear toilet/O.T.S. left corner (0,0); +x right, +z toward front.
export const A = {
 groundRearRowDepth:11, groundLobbyDepth:11, groundToiletX:6,
 otsDepth:3.4, groundToiletDepth:7, upperToiletX:6+1/12,
 upperRearLobbyZ:12, upperLobbyFrontZ:22+7.5/12,
 upperBedroomX:6, upperBedroomFrontZ:33+7.5/12,
 upperLeftBedroomBackZ:18+2/12, upperLeftBedroomX:-13,
 groundMainStairLeft:18, groundMainStairRight:34,
 stairFrontZ:31.5, stairLandingZ:22, stairChamfer:2.4,
 leftTerraceRearZ:18+2/12,leftTerraceFrontZ:44,
 storeCorners:[[34.25,0],[38.9,-11.25],[53.3,-7.2],[51.2,0]],
 rightBoundary:[[51.2,0],[46.1,17.4],[34.25,17.4]],
 upperTerraceFrontZ:9,upperTerraceCorners:[[6.1,0],[34.25,0],[38.9,-11.25],[53.3,-7.2],[46.1,17.4],[38.5,17.4],[38.5,21],[35.333,21],[35.333,12],[27,12],[27,9],[6.1,9]],
 exteriorStairX: -13.583, exteriorStairZ:18.167, exteriorStairLandingZ:21.5,
 upperRoofStair:[[10,12],[27,12]],
 // Opening centre/width annotations are estimated from D/W/V marks, not facade.
 defaultWindowWidthFt:5, ventWidthFt:2.5, exteriorDoorWidthFt:3,
 frontTerraceNotch:[[17.5,34],[4,34],[4,38],[1,38],[1,44]],
};
export const measured = {
 ground:{bedroomWest:[12,11],study:[10.25,11],bedroomEast:[12,11],toilet:[6,7],lobby:[34.25,11],verandah:[17.5,7],stairZoneWidth:16,leftReturn:13+7/12,rearReturn:18+2/12,storeEdges:[14+11/12,11.25,6.5]},
 first:{bedroomWest:[13,11],bedroomFront:[12,11],toiletRear:[6+1/12,7],toiletFront:[5,7],lobbyWidth:35+4/12,lobbyDepth:10+7.5/12,stairZoneWidth:17,stairZoneDepth:20.5,carPorchWidth:16,leftReturn:13+7/12,rearReturn:18+2/12}
};
