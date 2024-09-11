import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from '@/components/context/FormContext'

const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
})

interface MapViewProps {
    address: string
}

const MapView: React.FC<MapViewProps> = ({ address }) => {
    const [coordinates, setCoordinates] = React.useState<{ lat: number, lon: number } | null>(null)
    const [resolvedAddress, setResolvedAddress] = React.useState<string | null>(null)
    const { formData } = useForm()

    useEffect(() => {
        const fetchCoordinates = async () => {
            const result = await getCoordinatesFromAddress(address, formData)
            if (result && result.lat && result.lon) {
                setCoordinates({ lat: parseFloat(result.lat), lon: parseFloat(result.lon) })
                setResolvedAddress(result.display_name)
            }
        }

        fetchCoordinates()
    }, [address])

    return (
        <>
            {coordinates ? (
                <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={18} scrollWheelZoom={false}
                    style={{ height: '300px', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[coordinates.lat, coordinates.lon]} icon={defaultIcon}>
                        <Popup>
                            {resolvedAddress ? resolvedAddress : 'Cargando dirección...'}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>{coordinates ? "Cargando mapa..." : "Dirección no disponible"}</p>
            )}
        </>
    )
}

export default MapView

async function getCoordinatesFromAddress(address: string, formData: any) {
    function removeAccents(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const city = removeAccents(formData.city)

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                street: address,
                format: 'json',
                addressdetails: 1,
                limit: 1,
                country: "Colombia",
                city: city
            }
        })

        if (response.data.length > 0) {
            return response.data[0]
        } else {
            console.error('No se encontraron resultados para la dirección proporcionada.')
            return null
        }
    } catch (error) {
        console.error('Error al obtener coordenadas:', error)
        return null
    }
}
