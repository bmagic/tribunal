import emissionsJson from './emissions.json'
import collectionsJson from './collections.json'
import claviersJson from './claviers.json'
import desktopsS1Json from './desktops-s1.json'
import desktopsS2Json from './desktops-s2.json'

const desktops = {}
const collections = {}
const claviers = {}

desktops.emission = emissionsJson
collections.emission = emissionsJson
claviers.emission = emissionsJson

collections.collection = collectionsJson
claviers.clavier = claviersJson

desktops.desktop = desktopsS1Json.concat(desktopsS2Json)

export { desktops, collections, claviers }
