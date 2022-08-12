import React, { useState, useEffect } from "react";
import Select from "react-select";

const SingleSelect = (props) => {
  const { name, options, btnClicked, getValuesFn, isRequired } = props;
  const [value, setValue] = useState(props.selectedValue);

  useEffect(() => {
    if (props.selectedValue !== "") {
      let obj = options.find((item) => item.value == props.selectedValue);
      setValue(obj);
    }
  }, [props.selectedValue, options]);

  //const setValuesFn = () => {};

  const handleChange = (event) => {
    setValue(event.value);

    if (event.value&&event.email&&event.passport&&event.dob) {
      const data = {
        value: event.value,
        email:event.email,
        passport:event.passport,
        dob:event.dob,
        id: name,
      };

      getValuesFn(data);
      
    } 
   else if (event.value&&event.meal&&event.bed) {
      const data = {
        value: event.value,
        meal:event.meal,
        bed:event.bed,
        id: name,
      };

      getValuesFn(data);
      
    } 
   else if (event.value&&event.cname) {
      const data = {
        value: event.value,
        cname:event.cname,
        id: name,
      };

      getValuesFn(data);
      
    } 
   else if (event.value&&event.destination) {
      const data = {
        value: event.value,
        destination:event.destination,
        id: name,
      };

      getValuesFn(data);
      
    } 
   else if (event.value&&event.id_value) {
      const data = {
        value: event.value,
        id_value:event.id_value,
        id: name,
      };

      getValuesFn(data);
      
    } 
    else if(event.value)
    {
      const data = {
        value: event.value,
        id: name,
      };

      getValuesFn(data);
    }
    
    else {
      const data = {
        value: "",
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
