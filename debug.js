// import { Render3D } from "../tska/rendering/Render3D";
// import { DARK_GRAY, GREEN } from "./utils/Constants";

// const isInDungeonHub = () => {
//     try {
//         return TabList?.getNames()?.some(a => a.removeFormatting() === "Area: Dungeon Hub");
//     } catch (e) {
//         return false;
//     }
// };

// register("renderWorld", () => {
//     if (!isInDungeonHub()) return;

//     Render3D.renderString(
//         `${DARK_GRAY}[${GREEN}Tank${DARK_GRAY}]`, 
//         -30.5, 122, 5.5, 
//         0xff00ff, 
//         false,  // Shadow
//         0.03,  // Scale
//         false, // seeThrough
//         true,  // Depth
//         true,   // renderThroughBlocks
//     );
// }); 