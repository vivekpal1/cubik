console.log("Helper Script Started");
import { config } from "dotenv";
import { generateSemantic } from "./src/color/semantic";
config();

generateSemantic();
