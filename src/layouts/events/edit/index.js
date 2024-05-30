// react-router-dom components
import { Link, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import { useEffect, useRef, useState } from "react";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import TeamController from "../../teams/controller";
import EventController from "../controller";
import useDebounce from "../../../debounce";
import UserController from "../../profile/controller";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import DataTable from "../../../examples/Tables/DataTable";
import parseDatetime from "../../../commons";
import ControlledPopup from "../../../components/ControlledPopup";

export default function ChangeEvent() {
  const params = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    attendees: [],
    teams: [],
  });

  useEffect(() => {
    EventController.getEvent(params.id).then((event) => {
      setFormData({
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        attendees: event.attendees,
        teams: event.teams,
      });
      setSelectedTeams(event.teams);
      setSelectedUsers(event.attendees);
    });
  }, []);

  const [searchEmail, setSearchEmail] = useState("");
  const [foundedUsers, setFoundedUsers] = useState([]);
  const [isSearchEmail, setIsSearchEmail] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(formData.attendees);
  const debouncedSearchEmail = useDebounce(searchEmail, 500);
  useEffect(() => {
    if (debouncedSearchEmail) {
      setIsSearchEmail(true);
      UserController.searchUsers(debouncedSearchEmail).then((response) => {
        setIsSearchEmail(false);
        setFoundedUsers(response);
      });
    } else {
      setFoundedUsers([]);
    }
  }, [debouncedSearchEmail]);

  const [searchTeam, setSearchTeam] = useState("");
  const [foundedTeams, setFoundedTeams] = useState([]);
  const [isSearchTeam, setIsSearchTeam] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const debouncedSearchTeam = useDebounce(searchTeam, 500);

  const popupRef = useRef();

  useEffect(() => {
    if (debouncedSearchTeam) {
      setIsSearchTeam(true);
      TeamController.searchTeams(debouncedSearchTeam).then((response) => {
        setIsSearchTeam(false);
        setFoundedTeams(response.results);
      });
    } else {
      setFoundedUsers([]);
    }
  }, [debouncedSearchTeam]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [availableSlotsForm, setAvailableSlotsForm] = useState({
    duration: 15,
    after: new Date(),
    teams: selectedTeams,
    participants: selectedUsers,
    timeStart: "10:00",
    timeEnd: "20:00",
  });

  const handleChangeAvailableSlots = (event) => {
    const { name, value } = event.target;
    setAvailableSlotsForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [availableSlots, setAvailableSlots] = useState([]);
  const searchSlots = (event) => {
    EventController.getAvailableSlots(availableSlotsForm).then((response) =>
      setAvailableSlots(response)
    );
  };

  const slotChosen = (slot) => {
    setFormData((prevState) => ({
      ...prevState,
      start: parseDatetime(slot[0], false),
      end: parseDatetime(slot[1], false),
    }));
    console.log(popupRef);
    popupRef.current.handleClose();
  };

  const availableSlotsColumns = [
    { Header: "Start", accessor: "start", width: "20%", align: "center" },
    { Header: "End", accessor: "end", width: "20%", align: "center" },
    { Header: "Action", accessor: "action", width: "10%", align: "center" },
  ];

  const availableSlotsRows = availableSlots.map((slot) => {
    return {
      start: parseDatetime(slot[0]),
      end: parseDatetime(slot[1]),
      action: (
        <MDButton variant="text" color="dark" onClick={(event) => slotChosen(slot)}>
          <Icon>check</Icon>
        </MDButton>
      ),
    };
  });

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
          Enter event properties
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Title"
              name="title"
              variant="standard"
              fullWidth
              value={formData.title}
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

          <MDBox mb={2} display="flex" justifyContent="space-between">
            <MDBox mb={2} style={{ width: "100%" }}>
              <MDTypography display="block" variant="button" color="dark" my={1}>
                Participants
              </MDTypography>

              <MDBox mt={2} mb={2} pr={1}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={foundedUsers}
                  value={selectedUsers}
                  sx={{ width: "100%" }}
                  onChange={(event, value) => setSelectedUsers(value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      value={searchEmail}
                      label="Participant Email"
                      onChange={(event) => setSearchEmail(event.target.value)}
                    />
                  )}
                  getOptionLabel={(option) => option.email || ""}
                />
              </MDBox>
            </MDBox>

            <MDBox mb={2} style={{ width: "100%" }}>
              <MDTypography display="block" variant="button" color="dark" my={1}>
                Teams
              </MDTypography>

              <MDBox mt={2} mb={2} pr={1}>
                <Autocomplete
                  multiple
                  freeSolo
                  value={selectedTeams}
                  options={foundedTeams}
                  sx={{ width: "100%" }}
                  onChange={(event, value) => setSelectedTeams(value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      value={searchTeam}
                      label="Team Name"
                      onChange={(event) => setSearchTeam(event.target.value)}
                    />
                  )}
                  getOptionLabel={(option) => option.name || ""}
                />
              </MDBox>
            </MDBox>
          </MDBox>

          <ControlledPopup
            ref={popupRef}
            trigger={
              <MDBox mt={2} mb={2}>
                <MDButton variant="gradient" color="info" fullWidth>
                  Find Available Slots
                </MDButton>
              </MDBox>
            }
            modal
            nested
            contentStyle={{ width: "800px" }}
          >
            <MDBox m={3} borderRadius="lg">
              <MDBox m={3}>
                <MDInput
                  type="number"
                  label="Duration in minutes"
                  name="duration"
                  fullWidth
                  variant="standard"
                  value={availableSlotsForm.duration}
                  onChange={handleChangeAvailableSlots}
                />
                <MDInput
                  type="datetime-local"
                  label="Events After"
                  name="after"
                  fullWidth
                  variant="standard"
                  value={availableSlotsForm.after}
                  onChange={handleChangeAvailableSlots}
                />

                <MDBox
                  mt={2}
                  mb={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDInput
                    type="time"
                    label=""
                    name="timeStart"
                    variant="standard"
                    fullWidth
                    value={availableSlotsForm.timeStart}
                    onChange={handleChangeAvailableSlots}
                  />
                  <MDInput
                    type="time"
                    label=""
                    name="timeEnd"
                    variant="standard"
                    fullWidth
                    value={availableSlotsForm.timeEnd}
                    onChange={handleChangeAvailableSlots}
                  />
                </MDBox>
              </MDBox>

              <MDBox m={3} textAlign="center">
                <MDButton variant="gradient" color="success" onClick={searchSlots}>
                  <Icon>search</Icon>&nbsp;find
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns: availableSlotsColumns, rows: availableSlotsRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </MDBox>
          </ControlledPopup>

          <MDBox mt={2} mb={2} display="flex">
            <MDInput
              type="datetime-local"
              label=""
              name="start"
              variant="standard"
              fullWidth
              value={parseDatetime(formData.start, false)}
              onChange={handleChange}
            />
            <MDInput
              type="datetime-local"
              label=""
              name="end"
              variant="standard"
              fullWidth
              value={parseDatetime(formData.end, false)}
              onChange={handleChange}
            />
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={() =>
                EventController.updateEvent(params.id, {
                  ...formData,
                  attendees: selectedUsers.map((user) => user.id),
                  teams: selectedTeams.map((team) => team.id),
                })
              }
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
