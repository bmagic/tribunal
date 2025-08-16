import emissionsJson from "./emissions.json";
import s1Json from "./s1.json";
import s2Json from "./s2.json";
import s3Json from "./s3.json";
import s4Json from "./s4.json";

const dossiers = {};
dossiers.emissions = emissionsJson;
dossiers.data = s1Json.concat(s2Json, s3Json, s4Json);

export { dossiers };
