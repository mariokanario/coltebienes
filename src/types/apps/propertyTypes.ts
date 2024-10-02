export type OtherSpecificationsType = {
  [key: string]: string
}

export type PropertiesType = {
  id: number
  code: string
  quality: string
  type: string
  adviser: string
  status: string

  name: string
  cellphone: string
  email: string
  authorization: string

  department: string
  city: string
  neighborhood: string
  coownershipname: string
  propertytype: string
  charge: string
  canyon: string
  salevalue: string
  adminvalue: string
  adminincluded: string
  builtarea: string
  privatearea: string
  yearconstruction: string
  addressbuild: string

  coveredfinishes?: string[]
  heightmeters?: string
  depthmeters?: string
  frontmeters?: string
  kitchen?: string[]
  propertystatus?: string[]
  energy?: string[]
  others?: string
  winery?: string
  floors?: string[]
  balcony?: string
  terrace?: string
  airconditioning?: string
  centralair?: string
  surveillance?: string[]
  bathroomnum?: string
  garagenum?: string

  industrialpark?: string
  parkingbay?: string
  communalbathrooms?: string
  publictoilets?: string
  leveldock?: string
  depresseddock?: string
  loadingcapacity?: string
  bridgecrane?: string
  usefulroom?: string
  digitalaccess?: string
  facade?: string[]
  amouncapacity?: string
  numberlevels?: string
  onfloor?: string
  otherspecifications?: OtherSpecificationsType
  specificationsAmount?: string
  parking?: string
  unit?: string
  commonzones?: string[]

  surroundings?: string[]
  landmarks?: string
  observations?: string
  collector?: string
  collectionmedium?: string
  collectiodate?: string

  destination?: string // Campo destination opcional
  stratum?: string // Campo stratum opcional
  roomsnum?: string // Campo roomsnum opcional
  closet?: string // Campo closet opcional
  closetcount?: string // Campo closetcount opcional
  linencloset?: string // Campo linencloset opcional
  linenclosetcount?: string // Campo linenclosetcount opcional
  dressingroom?: string // Campo dressingroom opcional
  dressingroomcount?: string // Campo dressingroomcount opcional
  bathtub?: string // Campo bathtub opcional
  jacuzzi?: string // Campo jacuzzi opcional
  chimney?: string // Campo chimney opcional
  dining?: string // Campo dining opcional
  diningroom?: string // Campo diningroom opcional
  lounge?: string // Campo lounge opcional
  deck?: string // Campo deck opcional
  hall?: string // Campo hall opcional
  clotheszone?: string // Campo clotheszone opcional
  yard?: string // Campo yard opcional
  duplex?: string // Campo duplex opcional
  loft?: string // Campo loft opcional
  penthouse?: string // Campo penthouse opcional
  securitydoor?: string // Campo securitydoor opcional

  exposedbrick?: string // Campo exposedbrick opcional
  loadingcapacitycount?: string // Campo loadingcapacitycount opcional
}
