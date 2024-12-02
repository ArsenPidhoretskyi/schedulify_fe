/* global google */
import React, { useState, useRef } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete from "react-places-autocomplete";
import environment from "../../environment";
import MDInput from "../MDInput";
import MDBox from "../MDBox";
import Icon from "@mui/material/Icon";
import MDButton from "../MDButton";

// eslint-disable-next-line react/prop-types
const LocationSearchInput = ({ onPlaceChanged, onSaveClick }) => {
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState(null);
  const placesService = new window.google.maps.places.PlacesService(document.createElement("div"));

  // Handle input change
  const handleChange = (address) => {
    setAddress(address);
  };

  // Handle place selection
  const handleSelect = (address, placeId) => {
    setAddress(address);

    const request = {
      placeId: placeId,
      fields: ["name", "geometry"],
    };

    placesService.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        onPlaceChanged(place);
        setPlace(place);
      }
    });
  };

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <MDBox mb={2} style={{ width: "100%" }}>
          <MDBox mb={2} style={{ width: "100%" }} display="flex">
            <MDInput
              {...getInputProps({
                type: "text",
                fontWeight: "regular",
                color: "text",
                placeholder: "Search Places...",
                fullWidth: true,
              })}
            />
            <MDButton variant="text" color="dark" onClick={() => onSaveClick(place, address)}>
              <Icon>save</Icon>Choose
            </MDButton>
          </MDBox>
          <MDBox mb={2} style={{ width: "100%" }}>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };

              return (
                <MDBox
                  style={{ width: "100%" }}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={suggestion.placeId}
                >
                  <span>{suggestion.description}</span>
                </MDBox>
              );
            })}
          </MDBox>
        </MDBox>
      )}
    </PlacesAutocomplete>
  );
};

// eslint-disable-next-line react/prop-types
const MapContainer = ({ google, center, onSaveClick }) => {
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  // Handler for when a new place is selected
  const showPlace = (place) => {
    setPlaces((prevPlaces) => [place]);

    if (mapRef.current) {
      mapRef.current.map.setCenter(place.geometry.location);
    }
  };
  return (
    <MDBox mb={2} style={{ width: "100%" }}>
      <LocationSearchInput onPlaceChanged={showPlace} onSaveClick={onSaveClick} />
      <Map
        ref={mapRef}
        google={google}
        className={"map"}
        zoom={10}
        initialCenter={center}
        style={{ width: "98%", height: "90%" }}
      >
        {places.map((place, index) => (
          <Marker key={index} position={place.geometry.location} />
        ))}
      </Map>
    </MDBox>
  );
};

export default GoogleApiWrapper({
  apiKey: environment.GOOGLE_API_KEY,
  libraries: ["places"],
})(MapContainer);
