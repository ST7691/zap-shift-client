import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapFly = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 12, {
        duration:1.5,
      });
    }
  }, [location, map]);

  return null;
};

export default MapFly;
