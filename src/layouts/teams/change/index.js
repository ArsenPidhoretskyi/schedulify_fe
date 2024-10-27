// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Schedulify React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import { useEffect, useState } from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TeamController from "../controller";

export default function ChangeTeam() {
  const teamId = window.location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    TeamController.getTeam(teamId).then((team) =>
      setFormData({
        name: team.name,
        description: team.description,
      })
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography display="block" variant="button" color="white" my={1}>
          Edit team name and description
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Name"
              name="name"
              variant="standard"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Description"
              name="description"
              variant="standard"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={(event) => TeamController.changeTeam(teamId, formData)}
            >
              Save
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
