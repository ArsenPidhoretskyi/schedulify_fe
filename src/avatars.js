import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "./components/MDAvatar";

const avatars = (participants) =>
  participants.map((participant) => (
    <Tooltip
      key={participant.email}
      title={`${participant.first_name} ${participant.last_name}(${participant.email})`}
      placeholder="bottom"
    >
      <MDAvatar
        src={participant.image}
        alt="name"
        size="xs"
        bgColor="dark"
        sx={{
          border: ({ borders: { borderWidth } }) => `${borderWidth[2]} solid`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));

export default avatars;
