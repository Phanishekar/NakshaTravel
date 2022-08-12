import React, { useState, useEffect } from "react";
import { Input, Label } from "reactstrap";
const TextArea = (props) => {
  const { name, placeholder, btnClicked, getValuesFn, isRequired, row, limit } =
    props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (event) => {
    console.log({ name, placeholder });
    setValue(event.target.value);
    const data = {
      value: event.target.value,
      id: name,
    };
    getValuesFn(data);
  };

  return (
    <React.Fragment>
      <div className="form-label-group mt-2 mb-0">
        <Input
          type="textarea"
          name={name}
          id="exampleText"
          rows={row}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`form-control ${
            isRequired && btnClicked && !value && "is-invalid"
          }`}
        />
        {isRequired && btnClicked && !value && (
          <p className="invalid-tooltip">can't be blank</p>
        )}
        <Label>{placeholder}</Label>
      </div>
      <small
        className={`counter-value float-right ${
          value.length > limit ? "bg-danger" : ""
        }`}
      >
        {`${value.length}/${limit}`}
      </small>
    </React.Fragment>
  );
};

export default TextArea;
