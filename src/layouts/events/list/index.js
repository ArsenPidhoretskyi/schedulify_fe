// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Schedulify React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Schedulify React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { Component, useEffect, useState } from "react";
import parseDatetime, { parseDate } from "../../../commons";
import Link from "@mui/material/Link";
import EventController from "../controller";
import avatars from "../../../avatars";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const axios = require("axios");

export default class Events extends Component {
  state = {
    isLoading: true,
    events: [],
    offset: 0,
    pageSize: 10,
    error: null,
    tabValue: 0,
  };

  constructor(props) {
    super(props);
  }

  getEvents(parameters) {
    EventController.getEvents(parameters)
      .then((data) => this.setState({ events: data.results }))
      .catch((error) => {
        this.setState({
          error,
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  onPageChange(event) {
    const { offset } = event;
    this.getEvents({ offset: this.offset });
  }

  onPerPageChange(event) {}

  componentDidMount() {
    this.getEvents({ offset: this.offset });
  }

  getColumns() {
    return [
      { Header: "Title", accessor: "title", width: "20%", align: "center" },
      { Header: "Description", accessor: "description", width: "30%", align: "center" },
      { Header: "Start", accessor: "start", width: "5%", align: "center" },
      { Header: "End", accessor: "end", width: "5%", align: "center" },
      { Header: "Owner", accessor: "owner", width: "5%", align: "center" },
      { Header: "Participants", accessor: "participants", width: "25%", align: "center" },
      { Header: "Actions", accessor: "action", width: "10%", align: "center" },
    ];
  }

  getEventParticipants(event) {
    let participants = event.attendees || [];
    for (let team of event.teams) {
      for (let member of team.members) {
        if (member.id !== event.owner.id) {
          participants.push(member);
        }
      }
    }

    return [...new Map(participants.map((item) => [item.id, item])).values()];
  }

  getRows() {
    return this.state.events.map((event) => {
      return {
        title: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {event.title}
          </MDTypography>
        ),
        description: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {event.description}
          </MDTypography>
        ),
        start: parseDatetime(event.start),
        end: parseDatetime(event.end),
        owner: (
          <MDBox display="flex" py={1}>
            {avatars([event.owner])}
          </MDBox>
        ),
        participants: (
          <MDBox display="flex" py={1}>
            {avatars(this.getEventParticipants(event))}
          </MDBox>
        ),
        action: (
          <MDTypography
            component="a"
            href={`/events/${event.id}/edit`}
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      };
    });
  }

  setTabValue(value) {
    this.setState({ tabValue: value });
  }

  render() {
    const handleSetTabValue = (event, newValue) => {
      this.setTabValue(newValue);
      let parameters = {
        start: "",
        end: "",
      };

      let start = new Date();
      let end = new Date();

      if (newValue === "2") {
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 1);
      } else if (newValue === "3") {
        start.setDate(start.getDate() - start.getDay());
        end.setDate(start.getDate() + 6);
      } else if (newValue === "4") {
        start = null;
        end = null;
      }

      parameters.start = start ? parseDate(start, false) : "";
      parameters.end = end ? parseDate(end, false) : "";
      this.getEvents(parameters);
    };

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
                    Events
                  </MDTypography>

                  <Link href="/events/add" textAlign="right" display="block">
                    <MDTypography variant="button" fontWeight="regular" color="white">
                      Schedule Event
                    </MDTypography>
                  </Link>
                </MDBox>

                <Grid item>
                  <AppBar position="static">
                    <Tabs
                      orientation={"horizontal"}
                      value={this.state.tabValue}
                      onChange={handleSetTabValue}
                    >
                      <Tab label="Today" value="1" />
                      <Tab label="Tomorrow" value="2" />
                      <Tab label="Week" value="3" />
                      <Tab label="Custom" value="4" />
                    </Tabs>
                  </AppBar>
                </Grid>

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
