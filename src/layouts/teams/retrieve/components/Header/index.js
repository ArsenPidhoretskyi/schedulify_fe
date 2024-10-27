import { useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Schedulify React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

// PopUp
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TeamController from "../../../controller";
import MDInput from "components/MDInput";
import ErrorNotification from "../../../../notifications/error";

function Header({ children, team, setTeam }) {
  const [email, setEmail] = useState("");

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const errorNotificationSendInvite = ErrorNotification({
    errorSB: errorSB,
    closeErrorSB: closeErrorSB,
    title: "Error",
    message: "An error occurred while sending invite.",
    dateTime: "now",
  });
  const showErrorNotification = (error) => openErrorSB();

  const changeTeam = () => {
    window.location = `/teams/${team.id}/edit`;
  };

  const sendInvite = () => {
    TeamController.sendInvite(team.id, email, showErrorNotification).then(() =>
      TeamController.getTeam(team.id).then((data) => setTeam(data))
    );
  };
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item color={"dark"}>
            <MDAvatar
              src={team?.image}
              bgColor={darkMode ? "white" : "dark"}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {team?.name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {team?.description}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item display="block" textAlign="right">
            <MDBox display="flex" alignItems="center">
              <Icon>people</Icon>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {team?.members?.length}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={9} display="block" textAlign="right">
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              <MDBox mr={1}>
                <MDButton variant="text" color="error" onClick={TeamController.deleteTeam}>
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
                <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={changeTeam}>
                  <Icon>edit</Icon>&nbsp;edit
                </MDButton>
                <Popup
                  trigger={
                    <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                      <Icon>send</Icon>&nbsp;invite
                    </MDButton>
                  }
                  modal
                  nested
                >
                  <MDBox m={3}>
                    <MDInput
                      type="text"
                      label="Email"
                      name="email"
                      style={{ width: "80%" }}
                      variant="standard"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    <MDButton
                      variant="text"
                      color={darkMode ? "white" : "dark"}
                      onClick={sendInvite}
                    >
                      <Icon>send</Icon>&nbsp;invite
                    </MDButton>
                  </MDBox>
                </Popup>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
      {errorNotificationSendInvite}
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  team: {},
  children: "",
  setTeam: (team) => {},
};

// Typechecking props for the Header
Header.propTypes = {
  team: PropTypes.object.isRequired,
  children: PropTypes.string,
  setTeam: PropTypes.func.isRequired,
};

export default Header;
