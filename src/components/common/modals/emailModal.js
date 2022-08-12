import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from "reactstrap";
import Input from "../formBasic/input.js";

const EmailModal = (props) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [email, setEmail] = useState("");

  const getValuesFn = (data) => {
    console.log("changing2", { data });
    setEmail(data.value);
  };

  const handleSubmit = () => {
    setBtnClicked(true);
    if (email.length) {
      props.addMoreEmails(email);
      props.toggleModal();
      setEmail("");
      setBtnClicked(false);
    }
  };

  return (
    <Modal
      isOpen={props.showEmailModal}
      toggle={props.toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={props.toggleModal}>Add Extra Email Id</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="extra_email">Email:</Label>
          <Input
            type="email"
            name="extra_email"
            isRequired={true}
            getValuesFn={getValuesFn}
            btnClicked={btnClicked}
            value={email}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default EmailModal;
