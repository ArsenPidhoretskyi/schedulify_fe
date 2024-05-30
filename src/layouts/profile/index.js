// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import environment from "../../environment";
import { Component, useState } from "react";

export default class Profile extends Component {
  state = {
    isLoading: true,
    profile: {},
    error: null,
  };

  getProfileInfo() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    fetch(`${environment.API_BASE_URL}/api/v1/accounts/me/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => this.setState({ profile: data }))
      .catch((error) => {
        this.setState({
          error,
        });
        if (error.status === 401) {
          window.location = "/authentication/sign-in";
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  render() {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header profile={this.state.profile}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4}>
                {/*<PlatformSettings />*/}
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile information"
                  description={this.state.profile?.description || ""}
                  info={{
                    fullName:
                      (this.state.profile?.first_name || "") +
                      " " +
                      (this.state.profile?.last_name || ""),
                    mobile: this.state.profile?.phone_number,
                    email: this.state.profile?.email,
                    location: this.state.profile?.location,
                  }}
                  social={[
                    {
                      link: this.state.profile?.facebook,
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: this.state.profile?.twitter,
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: this.state.profile?.instagram,
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} xl={4}>
                <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
              </Grid>
            </Grid>
          </MDBox>
          {/*<MDBox pt={2} px={2} lineHeight={1.25}>*/}
          {/*  <MDTypography variant="h6" fontWeight="medium">*/}
          {/*    Projects*/}
          {/*  </MDTypography>*/}
          {/*  <MDBox mb={1}>*/}
          {/*    <MDTypography variant="button" color="text">*/}
          {/*      Architects design houses*/}
          {/*    </MDTypography>*/}
          {/*  </MDBox>*/}
          {/*</MDBox>*/}
          {/*<MDBox p={2}>*/}
          {/*  <Grid container spacing={6}>*/}
          {/*    <Grid item xs={12} md={6} xl={3}>*/}
          {/*      <DefaultProjectCard*/}
          {/*        image={homeDecor1}*/}
          {/*        label="project #2"*/}
          {/*        title="modern"*/}
          {/*        description="As Uber works through a huge amount of internal management turmoil."*/}
          {/*        action={{*/}
          {/*          type: "internal",*/}
          {/*          route: "/pages/profile/profile-overview",*/}
          {/*          color: "info",*/}
          {/*          label: "view project",*/}
          {/*        }}*/}
          {/*        authors={[*/}
          {/*          { image: team1, name: "Elena Morison" },*/}
          {/*          { image: team2, name: "Ryan Milly" },*/}
          {/*          { image: team3, name: "Nick Daniel" },*/}
          {/*          { image: team4, name: "Peterson" },*/}
          {/*        ]}*/}
          {/*      />*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</MDBox>*/}
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
}
