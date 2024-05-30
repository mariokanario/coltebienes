// Component Imports
import UserList from '@views/user/list'

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
  const data = await getData()

  return <UserList userData={data} />
}

export default PropertyListApp
