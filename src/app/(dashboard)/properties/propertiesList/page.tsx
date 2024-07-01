// Component Imports
import PropertyList from '@views/property/list'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/property-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const PropertyListApp = async () => {
  // Vars
  //const data = await getData()

  // console.log(data);


  return <PropertyList propertyData={[]} />
}

export default PropertyListApp
