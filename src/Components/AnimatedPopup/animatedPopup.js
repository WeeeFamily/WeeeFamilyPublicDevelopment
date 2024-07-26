import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../Map/animatedPopup.css';
import map from "../Map/map"; // CSS файл для кастомных стилей

const AnimatedMap = () => {
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2VlZWZhbWlseSIsImEiOiJjbHlwd3VxcHEwZnNkMmtzZ2UzZ2I4NTFpIn0.QG4FgBUfdah0c6Ed4iJkog';

        const monument = [41.64, 41.6395];
         const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: monument,
            zoom: 15
        });


        const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false,
            className: 'animated-popup' // Добавляем класс для кастомной анимации
        }).setText('Construction on the Washington Monument began in 1848.');

        const el = document.createElement('div');
        el.id = 'marker';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg)';


        markerRef.current = new mapboxgl.Marker(el)
            .setLngLat(monument)
            .setPopup(popup)
            .addTo(map);




    }, []);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default AnimatedMap;
