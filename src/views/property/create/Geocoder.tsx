import { useMap } from 'react-leaflet';
import * as ELG from 'esri-leaflet-geocoder';


interface GeocoderProps {
    address: string;
}

const Geocoder: React.FC<GeocoderProps> = ({ address }) => {
    const map = useMap();

    ELG.geocode()
        .text(address)
        .run((err, results, response) => {
            if (err || !results || results.results.length === 0) {
                console.error('Geocoding error:', err);
                return;
            }

            const { lat, lng } = results.results[0].latlng;
            map.setView([lat, lng], 12);
        });

    return null;
};

export default Geocoder;
