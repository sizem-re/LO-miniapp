import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

type Props = {
  center: { lat: number; lng: number } | null;
};

function ChangeMapCenter({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 13);
    }
  }, [center, map]);
  return null;
}

export function MapView({ center }: Props) {
  const defaultPosition: [number, number] = [47.6062, -122.3321]; // Seattle center

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      key="main-map"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <>
          <Marker position={[center.lat, center.lng]}>
            <Popup>Selected Place!</Popup>
          </Marker>
          <ChangeMapCenter center={center} />
        </>
      )}
    </MapContainer>
  );
}