// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Schedulify React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Schedulify React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import MDInput from "../../../../components/MDInput";
import { useEffect, useState } from "react";
import environment from "../../../../environment";
import GoogleMapsAutocomplete from "../../../../components/GoogleAutocomplete";

function saveProfile(formData) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      first_name: formData.firstName,
      last_name: formData.lastName,
      mobile: formData.mobile,
      location: formData.location,
      location_display: formData.locationDisplay,
    }),
  };

  fetch(`${environment.API_BASE_URL}/api/v1/accounts/me/`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .catch((error) => {
      if (error.status === 401) {
        window.location = "/authentication/sign-in";
      }
    });
}

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  const [isEdit, setIsEdit] = useState(false);

  const [actionTooltip, setActionTooltip] = useState(isEdit ? "Save Profile" : "Edit Profile");
  const [actionIcon, setActionIcon] = useState(isEdit ? "save" : "edit");

  const [formData, setFormData] = useState(info);

  useEffect(() => setFormData(info), [info]);

  const handleLocationSave = (place, location) => {
    setFormData((prevState) => ({
      ...prevState,
      locationDisplay: location,
      location: place.geometry.location,
    }));
  };

  useEffect(() => {
    setActionTooltip(isEdit ? "Save Profile" : "Edit Profile");
    setActionIcon(isEdit ? "save" : "edit");
  }, [isEdit]);

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  function saveOrEditProfile() {
    if (isEdit) {
      saveProfile(formData);
    }

    setIsEdit(!isEdit);
  }

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={actionTooltip} placement="top">
            <Icon onClick={saveOrEditProfile}>{actionIcon}</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          <MDBox key="First Name" display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              First Name: &nbsp;
            </MDTypography>
            <MDInput
              type="text"
              fontWeight="regular"
              color="text"
              fullWidth
              value={formData.firstName}
              disabled={!isEdit}
              onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
            />
          </MDBox>

          <MDBox key="Last Name" display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Last Name: &nbsp;
            </MDTypography>
            <MDInput
              type="text"
              fontWeight="regular"
              color="text"
              fullWidth
              value={formData.lastName}
              disabled={!isEdit}
              onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
            />
          </MDBox>

          <MDBox key="Email" display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Email: &nbsp;
            </MDTypography>
            <MDInput
              type="text"
              fontWeight="regular"
              color="text"
              fullWidth
              value={formData.email}
              disabled={true}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
          </MDBox>

          <MDBox key="Mobile" display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Mobile: &nbsp;
            </MDTypography>
            <MDInput
              type="text"
              fontWeight="regular"
              color="text"
              fullWidth
              value={formData.mobile}
              disabled={!isEdit}
              onChange={(event) => setFormData({ ...formData, mobile: event.target.value })}
            />
          </MDBox>

          <MDBox key="Location" display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Location: &nbsp;
            </MDTypography>
            <MDBox mb={2}>
              <GoogleMapsAutocomplete
                showLabel={false}
                onSaveClick={handleLocationSave}
                boundedField={formData.locationDisplay}
              />
            </MDBox>
          </MDBox>

          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
  isEdit: PropTypes.bool,
};

export default ProfileInfoCard;
