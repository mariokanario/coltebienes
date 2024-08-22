import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png'

const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png')
});

const MapView = () => {


    return (
        <>
            <MapContainer center={[6.255709, -75.601257]} zoom={18} scrollWheelZoom={false}
                style={{ height: '300px', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[6.255709, -75.601257]} icon={defaultIcon}>
                    {/* <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
                </Marker>
            </MapContainer>
        </>
    )
}

export default MapView
