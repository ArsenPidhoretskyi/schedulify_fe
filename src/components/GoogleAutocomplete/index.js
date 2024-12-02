import { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import environment from "../../environment";
import MDInput from "../MDInput";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "../../context";
import ControlledPopup from "../ControlledPopup";
import MDTypography from "../MDTypography";
import GoogleMap from "../GoogleMap";

const loadGoogleMapScript = (callback) => {
  if (typeof window.google === "object" && typeof window.google.maps === "object") {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

// eslint-disable-next-line react/prop-types
export default function GoogleMapsAutocomplete({ onSaveClick, boundedField, showLabel = true }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [loadMap, setLoadMap] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  const { ref } = usePlacesWidget({
    apiKey: environment.GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });

  return (
    <MDBox mb={2} style={{ width: "100%" }}>
      {showLabel ? (
        <MDTypography display="block" variant="button" color="dark" my={1}>
          Location
        </MDTypography>
      ) : null}
      <MDBox mb={2} display="flex" justifyContent="space-between">
        <MDBox mb={2} style={{ width: "100%" }}>
          <MDInput fullWidth ref={ref} value={boundedField} />
        </MDBox>

        <ControlledPopup
          ref={popupRef}
          trigger={
            <MDBox mb={2} style={{ width: "100%" }}>
              <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                <Icon>map</Icon> Show Map
              </MDButton>
            </MDBox>
          }
          modal
          nested
          contentStyle={{ width: "610px", height: "700px" }}
        >
          {!loadMap ? <div>Loading...</div> : <GoogleMap onSaveClick={onSaveClick} />}
        </ControlledPopup>
      </MDBox>
    </MDBox>
  );
}
