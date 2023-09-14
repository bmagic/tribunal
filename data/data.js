import emissionsJson from './emissions.json'
import vintagesJson from './vintages.json'
import collectionsJson from './collections.json'
import claviersJson from './claviers.json'
import desktopsS1Json from './desktops-s1.json'
import desktopsS2Json from './desktops-s2.json'
import desktopsS3Json from './desktops-s3.json'

const desktops = {}
const vintages = {}
const collections = {}
const claviers = {}

desktops.emission = emissionsJson
vintages.emission = emissionsJson
collections.emission = emissionsJson
claviers.emission = emissionsJson

vintages.vintage = vintagesJson
collections.collection = collectionsJson
claviers.clavier = claviersJson

desktops.desktop = desktopsS1Json.concat(desktopsS2Json, desktopsS3Json)

export { desktops, vintages, collections, claviers }
