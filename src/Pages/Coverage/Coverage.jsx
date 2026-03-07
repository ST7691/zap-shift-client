import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapFly from "./MapFly";


const Coverage = () => {
    const districts = useLoaderData();
    console.log(districts)

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);

  const handleSearch = () => {
    const found = districts.find((d) =>
      d.district.toLowerCase().includes(search.toLowerCase()),
    );

    if (found) {
      setLocation([found.latitude, found.longitude]);
    }
  };

  return (
    <div className="py-16 bg-base-200">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="lg:text-4xl font-extrabold">We are available in 64 districts</h2>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-10">
        <div className="join">
          <input
            type="text"
            placeholder="Search district"
            className="input input-bordered join-item w-72"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch} className="btn btn-primary text-secondary join-item">
            Search
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="h-[600px] w-full rounded-xl overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          className="h-full w-full"
        >
          <MapFly location={location} />

          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {districts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <h3 className="font-bold">{district.district}</h3>
                <p>{district.region}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
