import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const ContextAlert = React.createContext();

class AlertMessage extends React.Component {
  state = {
    successAlert: true,
    errorAlert: true,
    infoAlert: true,
    warningAlert: true,
    message: "",
    type: "",
    openAlert: false,
  };

  hideAlert = () => {
    this.setState({ openAlert: false });
  };

  showAlert = (type, message) => {
    this.setState({ [type]: type });
    this.setState({ [message]: message });
    this.setState({ openAlert: true });
  };

  render() {
    const { children } = this.props;
    const { message, openAlert, type } = this.state;
    return (
      <ContextAlert.Provider
        value={{
          state: this.state,
          showAlert: this.showAlert,
        }}
      >
        <SweetAlert
          success
          title={message}
          show={openAlert}
          onConfirm={() => this.hideAlert()}
        ></SweetAlert>
        {children}
      </ContextAlert.Provider>
    );
  }
}

export { AlertMessage, ContextAlert };
