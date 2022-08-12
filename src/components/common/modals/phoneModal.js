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

const PhoneModal = (props) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [phone, setPhone] = useState("");

  const getValuesFn = (data) => {
    console.log("changing2", { data });
    setPhone(data.value);
  };

  const handleSubmit = () => {
    setBtnClicked(true);
    if (phone.length) {
      props.addMorePhones(phone);
      props.toggleModal();
      setPhone("");
      setBtnClicked(false);
    }
  };

  return (
    <Modal
      isOpen={props.showPhoneModal}
      toggle={props.toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={props.toggleModal}>Add Extra Phone No.</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="extra_phone">Phone No.:</Label>
          <Input
            type="tel"
            name="extra_phone"
            isRequired={true}
            getValuesFn={getValuesFn}
            btnClicked={btnClicked}
            value={phone}
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
export default PhoneModal;
