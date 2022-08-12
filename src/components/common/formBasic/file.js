import React, { useState, useEffect } from "react";
import { REACT_APP_FILE_PATH } from "configs/index";

const File = (props) => {
  const {
    name,
    placeholder,
    btnClicked,
    getValuesFn,
    isRequired,
    readOnly,
    min,
  } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function ValidateFileCv(file) {
    if (file.length) {
      let fsize;
      for (let i = 0; i < file.length; i++) {
        fsize = file[0].size;
      }

      let ext = file[0].name.split(".").pop();

      if (
        (ext === "pdf" ||
          ext === "docx" ||
          ext === "xlsx" ||
          ext === "xls" ||
          ext === "doc" ||
          ext === "png" ||
          ext === "jpeg" ||
          ext === "jpg") &&
        fsize <= 10000000
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      setValue(event.target.files[0].name);
    }
    const data = {
      value: event.target.files[0],
      id: name,
    };
    getValuesFn(data);
  };
  console.log("file", value);
  return (
    <React.Fragment>
      <input
        type="file"
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        className={`form-control ${
          isRequired && btnClicked && !value && "is-invalid"
        }`}
      />
      {isRequired && btnClicked && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
      {typeof value === "object" || value == "" ? null : (
        <a
          href={REACT_APP_FILE_PATH + value}
          target="_blank"
          className="font-bold mt-1 d-block text-warning"
        >
          View File
        </a>
      )}
    </React.Fragment>
  );
};

export default File;
