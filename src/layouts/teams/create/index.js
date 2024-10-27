// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Schedulify React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import environment from "../../../environment";
import { useState } from "react";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import responseHandler from "../../../auth";

function AddTeam() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  function createTeam(event) {
    const requestOptionsRegister = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    };

    fetch(`${environment.API_BASE_URL}/api/v1/accounts/teams/`, requestOptionsRegister)
      .then((response) => responseHandler(response))
      .then((data) => {
        window.location = `/teams/${data.id}`;
      })
      .catch((error) => console.log({ error }));
  }

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
          Enter your team name to create a new team
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
            <MDButton variant="gradient" color="info" fullWidth onClick={createTeam}>
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddTeam;
