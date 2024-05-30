import Popup from "reactjs-popup";
import { Component } from "react";

export default class ControlledPopup extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isOpen: false,
    }; // state to control the state of popup
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <Popup
          content={<button onClick={this.handleClose}>click to close</button>}
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
          {...this.props}
        />
      </div>
    );
  }
}
