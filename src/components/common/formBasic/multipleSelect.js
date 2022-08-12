import React, { useState } from "react";
import Select from "react-select";

const MultipleSelect = (props) => {
  const { name, options, btnClicked, getValuesFn, isRequired } = props;
  const [value, setValue] = useState(props.selectedValue);

  const handleChange = (event) => {
    console.log(event);
    setValue(event);

    if (event) {
      let arr = [];
      event.forEach((e) => arr.push(e.value));
      const data = {
        value: arr,
        id: name,
      };

      getValuesFn(data);
    } else {
      const data = {
        value: [],
        id: name,
      };

      getValuesFn(data);
    }
  };

  return (
    <React.Fragment>
      <Select
        onChange={handleChange}
        name={name}
        defaultValue={value}
        isMulti
        name="colors"
        options={options}
        className={`React ${
          isRequired && btnClicked && !value && "is-invalid"
        }`}
        classNamePrefix="select"
      />

      {isRequired && btnClicked && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
    </React.Fragment>
  );
};

export default MultipleSelect;
