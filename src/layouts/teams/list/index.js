// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { Component } from "react";
import environment from "environment";
import Link from "@mui/material/Link";
import responseHandler from "auth";
import avatars from "avatars";
import Icon from "@mui/material/Icon";
import MDButton from "../../../components/MDButton";
import TeamController from "../controller";

const axios = require("axios");

export default class Teams extends Component {
  state = {
    isLoading: true,
    teams: [],
    offset: 0,
    pageSize: 10,
    error: null,
  };

  constructor(props) {
    super(props);
  }

  getTeams(parameters) {
    TeamController.getTeams(parameters)
      .then((data) => this.setState({ teams: data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onPageChange(event) {
    const { offset } = event;
    this.getTeams({ offset: this.offset });
  }

  onPerPageChange(event) {}

  componentDidMount() {
    this.getTeams({ offset: this.offset });
  }

  getColumns() {
    return [
      { Header: "Name", accessor: "name", width: "20%", align: "center" },
      { Header: "Description", accessor: "description", width: "40%", align: "center" },
      { Header: "Owner", accessor: "owner", width: "5%", align: "center" },
      { Header: "Members", accessor: "members", width: "25%", align: "center" },
      { Header: "Actions", accessor: "action", width: "10%", align: "center" },
    ];
  }

  getRows() {
    return this.state.teams.map((team) => {
      return {
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {team.name}
          </MDTypography>
        ),
        description: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {team.description}
          </MDTypography>
        ),
        owner: (
          <MDBox display="flex" py={1}>
            {avatars([team.owner])}
          </MDBox>
        ),
        members: (
          <MDBox display="flex" py={1}>
            {avatars(team.members || [])}
          </MDBox>
        ),
        action: (
          <MDButton component="a" color="dark" href={`/teams/${team.id}`} variant="text">
            <Icon>edit</Icon>&nbsp;edit
          </MDButton>
        ),
      };
    });
  }

  render() {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Teams
                  </MDTypography>

                  <Link href="/teams/add" textAlign="right" display="block">
                    <MDTypography variant="button" fontWeight="regular" color="white">
                      Create Team
                    </MDTypography>
                  </Link>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: this.getColumns(), rows: this.getRows() }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}
