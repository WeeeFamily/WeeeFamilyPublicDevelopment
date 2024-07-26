import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';
import icon from '../img/Point.svg'
import './animatedPopup.css';


const Map = () => {
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderContainerRef = useRef(null);
    const mapRef = useRef(null);

     // Состояние для попапов
    const [popups, setPopups] = useState([
        {
            coordinates: [41.64, 41.6395],
            image: 'https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg',
            title: 'Washington Monument began in 1848.',
            description: 'The Washington Monument is an obelisk within the National Mall in Washington, D.C., built to commemorate George Washington.'
        },
        {
            coordinates: [41.616824, 41.643749],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmebGof4wE9nLpkYlb6e0v0_I9WgmFX_f_g&s',
            title: 'Another Landmark',
            description: 'This is another landmark with its own unique history and significance.'
        }
        // Добавьте дополнительные объекты попапов здесь
    ]);





    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2VlZWZhbWlseSIsImEiOiJjbHlwd3VxcHEwZnNkMmtzZ2UzZ2I4NTFpIn0.QG4FgBUfdah0c6Ed4iJkog';

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [41.62, 41.64],
            zoom: 12,
            pitch: 45,
            bearing: 90.6,
            antialias: true
        });

        mapRef.current = map;
        mapRef.current.addControl(new mapboxgl.NavigationControl());

         // Установка попапов
        popups.forEach(popup => {
            const popupContent = `
                <div class="mapboxgl-popup-content">
                    <img src="${popup.image}" alt="${popup.text}" />
                    <h3>${popup.title}</h3>
                    <p>${popup.description}</p>
                </div>
            `;

            const mapPopup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
                className: 'custom-popup' // Применение класса для кастомного стиля
            }).setHTML(popupContent);


            // Создание кастомного маркера с изображением
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.style.backgroundImage = `url(${popup.image})`;


            new mapboxgl.Marker({ element: markerElement })
                .setLngLat(popup.coordinates)
                .setPopup(mapPopup)
                .addTo(map);

             const labelElement = document.createElement('div');
            labelElement.className = 'marker-label';
            labelElement.textContent = popup.title;
            markerElement.appendChild(labelElement);

        });





        mapRef.current.on('style.load', () => {
            const layers = mapRef.current.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;

            mapRef.current.addLayer(
                {
                    id: 'add-3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 15,
                    paint: {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });
        return () => mapRef.current.remove();


        // Add geocoder control
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: 'Search for a location...',
            marker: true,
        });

        geocoderContainerRef.current.appendChild(geocoder.onAdd(map));

        // Watch user's current location and update the marker in real-time
        const watchId = navigator.geolocation.watchPosition(
            position => {
                const {latitude, longitude} = position.coords;

                if (markerRef.current) {
                    // Update marker position
                    markerRef.current.setLngLat([longitude, latitude]);
                } else {
                    // Create a custom icon
                    const customIcon = document.createElement('div');

                    customIcon.className = 'custom-marker';
                    customIcon.innerHTML = `<img class="pointa" src="${icon}" alt="Custom Icon" />`;

                    // Create marker using the custom icon
                    const marker = new mapboxgl.Marker({element: customIcon})
                        .setLngLat([longitude, latitude])
                        .addTo(map);

                    markerRef.current = marker;
                }
            },
            error => {
                console.error('Error getting location:', error);
            },
            {enableHighAccuracy: true, timeout: 2000}
        );

        // Clean up the watch when the component is unmounted
        return () => {
            navigator.geolocation.clearWatch(watchId);
            map.remove();
        };
    }, []);

    // Function to toggle pitch between 0 and 40
    const togglePitch = () => {
        const map = mapRef.current;
        const currentPitch = map.getPitch();
        map.easeTo({
            pitch: currentPitch === 0 ? 60 : 0,
            duration: 500
        });
        const tg3dElement = document.getElementById("tg3d");
        if (currentPitch === 0) {
            tg3dElement.classList.add("active");
        } else {
            tg3dElement.classList.remove("active");
        }
    };

    // Function to center the map on user's location and set a marker
    const centerOnUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const map = mapRef.current;
                map.flyTo({ center: [longitude, latitude], zoom: 15 });

                // Update or add marker
                if (markerRef.current) {
                    markerRef.current.setLngLat([longitude, latitude]);
                } else {
                    const customIcon = document.createElement('div');
                    customIcon.className = 'custom-marker';
                    customIcon.innerHTML = `<img src="${icon}" alt="Custom Icon" />`;
                    const marker = new mapboxgl.Marker({ element: customIcon })
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                    markerRef.current = marker;
                }
            },
            error => {
                console.error('Error getting location:', error);
            }
        );
    };

    return (
        <div className={"map_conta"}>
            <div className={"toggle3d"} id={"tg3d"} onClick={togglePitch}></div>
            <div className={"locate3d"} onClick={centerOnUserLocation}></div>

            <div ref={geocoderContainerRef} className="geocoder-container"/>

            <div ref={mapContainerRef} style={{width: '100%', height: '100vh'}}/>

        </div>

    );

};


export default Map;