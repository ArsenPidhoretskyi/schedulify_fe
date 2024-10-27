// @mui material components
import Grid from "@mui/material/Grid";

// Schedulify React components
import MDBox from "components/MDBox";

// Schedulify React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/teams/retrieve/components/Header";

// Images
import environment from "environment";
import { Component, useEffect, useState } from "react";
import responseHandler from "auth";
import DataTable from "../../../examples/Tables/DataTable";
import MDTypography from "../../../components/MDTypography";
import avatars from "avatars";
import Card from "@mui/material/Card";
import TeamController from "../controller";
import MDButton from "../../../components/MDButton";
import Icon from "@mui/material/Icon";
import ErrorNotification from "../../notifications/error";
import MDSnackbar from "../../../components/MDSnackbar";

export default function Team() {
  const [team, setTeam] = useState({});

  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const errorNotificationRemoveTeamMember = ErrorNotification({
    errorSB: errorSB,
    closeErrorSB: closeErrorSB,
    title: "Error",
    message: "An error occurred while deleting the team member.",
    dateTime: "now",
  });
  const showErrorNotification = (error) => openErrorSB();

  const getColumns = () => {
    return [
      { Header: "First Name", accessor: "firstName", width: "25%", align: "center" },
      { Header: "Last Name", accessor: "lastName", width: "25%", align: "center" },
      { Header: "Email", accessor: "email", width: "25%", align: "center" },
      { Header: "Avatar", accessor: "avatar", width: "10%", align: "center" },
      { Header: "Actions", accessor: "action", width: "15%", align: "center" },
    ];
  };

  const getRows = () => {
    const deleteTeamMember = (memberId) => {
      TeamController.deleteTeamMember(team?.id, memberId, showErrorNotification).then(() =>
        TeamController.getTeam(team.id).then((data) => setTeam(data))
      );
    };

    return (
      team.members?.map((member) => {
        return {
          avatar: (
            <MDBox display="flex" py={1}>
              {avatars([member])}
            </MDBox>
          ),
          firstName: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {member.first_name}
            </MDTypography>
          ),
          lastName: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {member.last_name}
            </MDTypography>
          ),
          email: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {member.email}
            </MDTypography>
          ),
          action: (
            <MDButton color="dark" variant="text" onClick={() => deleteTeamMember(member.id)}>
              <Icon>delete</Icon>&nbsp;Remove
            </MDButton>
          ),
        };
      }) || []
    );
  };

  const teamId = window.location.pathname.split("/").pop();
  useEffect(() => {
    TeamController.getTeam(teamId).then((data) => setTeam(data));
  }, [teamId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header team={team} setTeam={setTeam}>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: getColumns(), rows: getRows() }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Grid item xs={12} sm={6} lg={3}>
        {errorNotificationRemoveTeamMember}
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}
