import React, { useState, useEffect } from "react";
import CheckboxAdvance from "components/@custom/checkbox/CheckboxesAdvance";
import { Check } from "react-feather";

function Checkbox(props) {
  const { name, btnClicked, getValuesFn, isRequired, options } = props;

  const [valueArr, setValueArr] = useState([]);

  useEffect(() => {
    // for validation check
    // console.log(btnClicked)
  }, [btnClicked, props.value]);

  const handleChange = (event) => {
    const setDataFn = (arr) => {
      const data = {
        value: arr,
        id: name,
      };

      getValuesFn(data);
    };

    if (event.target.checked) {
      console.log("checked");
      setValueArr([...valueArr, event.target.value]);

      const arrValue = [...valueArr, event.target.value];

      // setDataFn(arrValue.toString());
      setDataFn(arrValue);
    } else {
      console.log("unchecked");

      const removeArr = valueArr.filter(
        (value) => value === event.target.value
      );

      const filterArr = valueArr.filter((value) =>
        removeArr.indexOf(value) == -1 ? true : false
      );

      setValueArr(filterArr);

      // setDataFn(filterArr.toString());
      setDataFn(filterArr);
    }
  };
  return (
    <React.Fragment>
      {options.map((option, k) => {
        return (
          <div
            className={`d-inline-block mr-1 ${
              isRequired && btnClicked && valueArr.length === 0 && "is-invalid"
            }`}
            key={k}
          >
            <CheckboxAdvance
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label={option.label}
              name={name}
              onClick={handleChange}
              defaultChecked={option.isChecked}
              checked={option.isChecked}
              value={option.value}
            />
          </div>
        );
      })}

      {isRequired && btnClicked && valueArr.length === 0 && (
        <p className="invalid-tooltip">please select atleast one</p>
      )}
    </React.Fragment>
  );
}

export default Checkbox;
