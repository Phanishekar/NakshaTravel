import React, { useState, useEffect } from "react";

const Date = (props) => {
  const { name, placeholder, btnClicked, getValuesFn, isRequired, readOnly, min} = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (event) => {
    setValue(event.target.value);
    const data = {
      value: event.target.value,
      id: name,
    };
    getValuesFn(data);
  };

  return (
    <React.Fragment>
      <input
        type="date"
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        className={`form-control ${
          isRequired && btnClicked && !value && "is-invalid"
        }`}
        min={min ? min: ""}
        value={value}
        readOnly={readOnly ? readOnly : false}

      />
      {isRequired && btnClicked && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
    </React.Fragment>
  );
};

export default Date;
