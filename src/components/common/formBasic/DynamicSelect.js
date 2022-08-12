import React, { useState, useEffect } from "react";
import Select from "react-select";

const SingleSelect = (props) => {
  const { name, options, btnClicked, getValuesFn, isRequired,indexValue} = props;
  const [value, setValue] = useState(props.selectedValue);

  useEffect(() => {
    if (props.selectedValue !== "") {
      let obj = options.find((item) => item.value == props.selectedValue);
      setValue(obj);
    }
  }, [props.selectedValue, options]);

  //const setValuesFn = () => {};

  const handleChange = (e) => {
    setValue(e.value);
    
   
    
    
      const data = {
        i:indexValue,
        value: e.value,
        id: name,
      };

      getValuesFn(data);
    
    
   
     
  };
  return (
    <React.Fragment>
      <Select
        onChange={e => handleChange(e)}
        name={name}
        indexValue={indexValue}
        classNamePrefix="select"
        //defaultValue={value}
        value={value}
        getOptionLabel={(x) => x.label}
        getOptionValue={(x) => x.value}
        options={options}
        className={`React ${
          isRequired && btnClicked && !value && "is-invalid"
        }`}
      />
      {isRequired && btnClicked && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
    </React.Fragment>
  );
};

export default SingleSelect;
