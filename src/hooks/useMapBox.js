import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoicmljYXJkb25hamFyIiwiYSI6ImNpcXpwdzRodTAybWdmc2txOTAwZm15MjQifQ.X82mZc3RwYfG6es1LZZAlg";


export const useMapBox = ({longitud=0, latitud=0}) =>{
    // 27.916801944775134, -110.90857546098636 guaymas
  const mapContainer = useRef(null);
  const map = useRef(null);
  const {selected} = useSelector( state => state.sucursales );
  const {sucursal:sucursalactivo} = useSelector( state => state.stateWizard );
  

  //iniciamos con coordenadas de las ciudad
  const [coordenadas, setcoordenadas] = useState({
    initial : 1,
    longitud: -110.90857546098636,
    latitud : 27.916801944775134,
    zoom: 12
  });
  
  const changeCoordinates = (cordinadas)=> {
      setcoordenadas({
        initial : cordinadas.initial,
        longitud: cordinadas.longitud,
        latitud : cordinadas.latitud,
        zoom : cordinadas.zoom 
      })
  }


   useEffect(() => {
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coordenadas.longitud,coordenadas.latitud],
        zoom: coordenadas.zoom
      });
      //si "initial es igual a 1, no necesitamos poner marcador"
      coordenadas.initial == 0 //marcamos la sucursal
      && new mapboxgl.Marker().setLngLat([coordenadas.longitud,coordenadas.latitud]).addTo(map.current);
    },[]);

    useEffect(() => {
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordenadas.longitud,coordenadas.latitud],
      zoom:  coordenadas.zoom
    });

    //si "initial es igual a 1, no necesitamos poner marcador"
    coordenadas.initial == 0 //marcamos la sucursal
    && new mapboxgl.Marker().setLngLat([coordenadas.longitud,coordenadas.latitud]).addTo(map.current);
  },[coordenadas.latitud]);


 return {
  mapContainer,
  coordenadas,
  changeCoordinates
 }
}