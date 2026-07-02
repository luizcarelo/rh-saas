import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Ajuste para o ícone padrão do Leaflet funcionar no Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Colaborador {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  status: string;
}

export function MapComponent({ colaboradores }: { colaboradores: Colaborador[] }) {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border">
      <MapContainer center={[-22.9068, -43.1729]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {colaboradores.map((colab) => (
          <Marker key={colab.id} position={[colab.lat, colab.lng]}>
            <Popup>
              <div className="font-bold">{colab.nome}</div>
              <div>Status: {colab.status}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
