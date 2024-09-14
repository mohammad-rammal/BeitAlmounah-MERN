import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet'; // Import icon from leaflet library
import { useTranslate } from "../../translate/LanguageContext";

const MapView = ({ userData }) => {

    const translate = useTranslate();
    // Define marker icon
    const customMarkerIcon = icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'), // Use require for image path
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const makeCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <MapContainer center={[33.8938, 35.5018]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userData.map((user, index) => (
                <Marker key={index} position={user.coordinates} icon={customMarkerIcon}>
                    <Popup>
                        {user.username}


                        {user.username === 'Beit Almona' && <p>beitalmonah@gmail.com</p>}

                        {user.username === 'Workshop 1' && (
                            <p onClick={() => makeCall('81764986')} style={{ cursor: 'pointer', color: 'blue' }}>
                                81764986 ({translate('call')})
                            </p>
                        )}
                        {user.username === 'Workshop 2' && (
                            <p onClick={() => makeCall('71456357')} style={{ cursor: 'pointer', color: 'blue' }}>
                                71456357 ({translate('call')})
                            </p>
                        )}
                        {user.username === 'Workshop 3' && (
                            <p onClick={() => makeCall('70452376')} style={{ cursor: 'pointer', color: 'blue' }}>
                                70452376 ({translate('call')})
                            </p>
                        )}
                        {user.username === 'Beit Almona' && (
                            <p onClick={() => makeCall('03458246')} style={{ cursor: 'pointer', color: 'blue' }}>
                                03458246 ({translate('call')})
                            </p>
                        )}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
