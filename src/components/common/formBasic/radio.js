import React, { useState, useEffect } from "react";
import RadioAdvance from "components/@custom/radio/RadioAdvance";

function Radio(props) {
  const { name, btnClicked, getValuesFn, isRequired, options } = props;

  const [value, setValue] = useState(props.value);
  useEffect(() => {
    // for validation check
    // console.log(btnClicked)
  }, [btnClicked]);

  const handleChange = (event) => {
    let checkedValue = "";
    setValue(event.target.value);
    if (event.target.checked) {
      checkedValue = event.target.value;
    } else {
      checkedValue = "";
    }
    const data = {
      value: checkedValue,
      id: name,
    };
    getValuesFn(data);
  };

  return (
    <React.Fragment>
      {options.map((option, k) => {
        return (
          <div
            className={`d-inline-block mr-1 ${
              isRequired && btnClicked && !value && "is-invalid"
            }`}
            key={k}
          >
            <RadioAdvance
              label={option.label}
              defaultChecked={option.isChecked}
              onClick={handleChange}
              name={name}
              value={option.value}
            />
          </div>
        );
      })}

      {isRequired && btnClicked && !value && (
        <p className="invalid-tooltip">please select atleast one</p>
      )}
    </React.Fragment>
  );
}

export default Radio;
