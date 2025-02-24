// @mui material components
import Grid from "@mui/material/Grid";

// Schedulify React components
import MDBox from "components/MDBox";

// Schedulify React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import DashboardController from "./controller";

function Dashboard() {
  const [statistic, setStatistic] = useState({
    users: 0,
    allEvents: 0,
    myEvents: 0,
  });

  useEffect(() => {
    DashboardController.getStatistic().then((response) => setStatistic(response));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="My Events"
                count={statistic.myEvents}
                percentage={{
                  color: "success",
                  amount: "+60%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Users"
                count={statistic.users}
                percentage={{
                  color: "success",
                  amount: "+33%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="All Events"
                count={statistic.allEvents}
                percentage={{
                  color: "success",
                  amount: "+35%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          {/*<Grid item xs={12} md={6} lg={3}>*/}
          {/*  <MDBox mb={1.5}>*/}
          {/*    <ComplexStatisticsCard*/}
          {/*      color="primary"*/}
          {/*      icon="person_add"*/}
          {/*      title="Followers"*/}
          {/*      count="+91"*/}
          {/*      percentage={{*/}
          {/*        color: "success",*/}
          {/*        amount: "",*/}
          {/*        label: "Just updated",*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </MDBox>*/}
          {/*</Grid>*/}
        </Grid>
        {/*<MDBox mt={4.5}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={12} md={6} lg={4}>*/}
        {/*      <MDBox mb={3}>*/}
        {/*        <ReportsBarChart*/}
        {/*          color="info"*/}
        {/*          title="website views"*/}
        {/*          description="Last Campaign Performance"*/}
        {/*          date="campaign sent 2 days ago"*/}
        {/*          chart={reportsBarChartData}*/}
        {/*        />*/}
        {/*      </MDBox>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} md={6} lg={4}>*/}
        {/*      <MDBox mb={3}>*/}
        {/*        <ReportsLineChart*/}
        {/*          color="success"*/}
        {/*          title="daily sales"*/}
        {/*          description={*/}
        {/*            <>*/}
        {/*              (<strong>+15%</strong>) increase in today sales.*/}
        {/*            </>*/}
        {/*          }*/}
        {/*          date="updated 4 min ago"*/}
        {/*          chart={sales}*/}
        {/*        />*/}
        {/*      </MDBox>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} md={6} lg={4}>*/}
        {/*      <MDBox mb={3}>*/}
        {/*        <ReportsLineChart*/}
        {/*          color="dark"*/}
        {/*          title="completed tasks"*/}
        {/*          description="Last Campaign Performance"*/}
        {/*          date="just updated"*/}
        {/*          chart={tasks}*/}
        {/*        />*/}
        {/*      </MDBox>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</MDBox>*/}
        {/*<MDBox>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={12} md={6} lg={8}>*/}
        {/*      <Projects />*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} md={6} lg={4}>*/}
        {/*      <OrdersOverview />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</MDBox>*/}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
