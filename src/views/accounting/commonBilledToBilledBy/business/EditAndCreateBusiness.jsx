import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import BusinessForm from "./businessForm";

class EditAndCreateBusiness extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.props.openClose(this.state.modal);
  };
  
  componentDidMount = () => {
    if (this.props.open == true) {
      this.setState((prevState) => ({
        modal: !prevState.modal,
      }));
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggleModal}></ModalHeader>
          <ModalBody>
            <BusinessForm
              modal={this.toggleModal}
              editBusinessData={this.props.editBusinessData}
              createNewFormOpen = {this.props.createNewFormOpen}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default EditAndCreateBusiness;
