import React, { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Points interface

interface Point{
    id: number; 
    name: string; 
    position: [number, number];
}


export default function Map() {
	const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
	const [loading, setLoading] = useState(true);

	const paris: [number, number] = [48.8566, 2.3522];
	const lyon: [number, number] = [45.764, 4.8357];

	useEffect(() => {
		// Utilisation de l'API OSRM (Open Source Routing Machine)
		fetchRoute();
	}, []);

	const fetchRoute = async () => {
		try {
			// Format: lon,lat (attention à l'ordre !)
			const start = `${paris[1]},${paris[0]}`; // lon,lat
			const end = `${lyon[1]},${lyon[0]}`; // lon,lat

			const response = await fetch(
				`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
			);

			const data = await response.json();

			if (data.routes && data.routes[0]) {
				// Conversion des coordonnées GeoJSON [lon, lat] vers [lat, lon]
				const coordinates = data.routes[0].geometry.coordinates.map(
					(coord: [number, number]) => [coord[1], coord[0]] as [number, number]
				);

				setRoutePoints(coordinates);
			}
		} catch (error) {
			console.error('Erreur lors du chargement de la route:', error);
			// En cas d'erreur, on utilise une ligne droite
			setRoutePoints([paris, lyon]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ height: '100vh', width: '100%', position: 'relative' }}>
			{loading && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						backgroundColor: 'white',
						padding: '20px',
						borderRadius: '5px',
						zIndex: 1000,
					}}
				>
					Chargement de la route...
				</div>
			)}

			<MapContainer
				center={[47.5, 3.5]}
				zoom={7}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker position={paris}>
					<Popup>Paris - Départ</Popup>
				</Marker>

				<Marker position={lyon}>
					<Popup>Lyon - Arrivée</Popup>
				</Marker>

				{routePoints.length > 0 && (
					<Polyline
						pathOptions={{
							color: 'blue',
							weight: 4,
							opacity: 0.8,
							lineCap: 'round',
							lineJoin: 'round',
						}}
						positions={routePoints}
					/>
				)}
			</MapContainer>
		</div>
	);
}

