import emissionsJson from './emissions.json';
import vintagesJson from './vintages.json';
import collectionsJson from './collections.json';
import claviersJson from './claviers.json';
import salonsJson from './salons.json';
import desktopsS1Json from './desktops-s1.json';
import desktopsS2Json from './desktops-s2.json';
import desktopsS3Json from './desktops-s3.json';
import desktopsS4Json from './desktops-s4.json';

const desktops = {};
const vintages = {};
const collections = {};
const claviers = {};
const salons = {};

desktops.emission = emissionsJson;
vintages.emission = emissionsJson;
collections.emission = emissionsJson;
claviers.emission = emissionsJson;
salons.emission = emissionsJson;

vintages.vintage = vintagesJson;
collections.collection = collectionsJson;
claviers.clavier = claviersJson;
salons.salon = salonsJson;

desktops.desktop = desktopsS1Json.concat(desktopsS2Json, desktopsS3Json, desktopsS4Json);

export { desktops, vintages, collections, claviers, salons };
