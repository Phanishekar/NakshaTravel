import React, { useState, useEffect } from "react";

const Input = (props) => {
  const {
    name,
    placeholder,
    type,
    btnClicked,
    getValuesFn,
    isRequired,
    readOnly,
  } = props;
  const [value, setValue] = useState(props.value);
  const [inputClassName, setInoutClassName] = useState("form-control");

  const [validEmail, setValidEmail] = useState(props.value ? true : false);
  const [validPhone, setValidPhone] = useState(props.value ? true : false);
  const [validFile, setValidFile] = useState(props.value ? true : false);
  const [validUrl, setValidUrl] = useState(props.value ? true : false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    let ErrorClassName = "";
    switch (type) {
      case "text":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !value && "is-invalid"
        }`;

        break;
      case "password":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !value && "is-invalid"
        }`;

        break;
      case "number":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !value && "is-invalid"
        }`;

        break;
      case "email":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !validEmail && "is-invalid"
        }`;
        break;
      case "tel":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !validPhone && "is-invalid"
        }`;
        break;
      case "file":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !validFile && "is-invalid"
        }`;
        break;
      case "url":
        ErrorClassName = `form-control ${
          isRequired && btnClicked && !validUrl && "is-invalid"
        }`;
        break;
      default:
        ErrorClassName = "form-control";
    }
    setInoutClassName(ErrorClassName);
  }, [value, btnClicked]);

  function ValidateUrl(inputText) {
    //eslint-disable-next-line
    var linkformat =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (linkformat.test(inputText)) {
      return true;
    } else {
      return false;
    }
  }

  function ValidateEmail(inputText) {
    //eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/;
    if (mailformat.test(inputText)) {
      return true;
    } else {
      return false;
    }
  }

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
    if (type === "file") {
      console.log(event.target.files[0].name);
      if (event.target.files.length > 0) {
        setValue(event.target.files[0].name);
      }
    } else {
      setValue(event.target.value);
    }

    const setDataFn = (type) => {
      let fieldValue = "";
      if (type === "file") {
        fieldValue = event.target.files[0];
      } else {
        fieldValue = event.target.value;
      }
      const data = {
        value: fieldValue,
        id: name,
      };

      getValuesFn(data);
    };

    const setDataEmptyFn = () => {
      const data = {
        value: "",
        id: name,
      };

      getValuesFn(data);
    };

    if (type === "email") {
      if (ValidateEmail(event.target.value)) {
        setValidEmail(true);
        setDataFn(type);
      } else {
        setValidEmail(false);
        setDataEmptyFn();
      }
    } else if (type === "tel") {
      if (event.target.value.length !== 10) {
        setValidPhone(false);
        setDataEmptyFn();
      } else {
        setValidPhone(true);
        setDataFn(type);
      }
    } else if (type === "url") {
      if (ValidateUrl(event.target.value)) {
        setValidUrl(true);
        setDataFn(type);
      } else {
        setValidUrl(false);
        setDataEmptyFn();
      }
    } else if (type === "file") {
      if (ValidateFileCv(event.target.files)) {
        setValidFile(true);
        setDataFn(type);
      } else {
        setValidFile(false);
        setDataEmptyFn();
      }
    } else {
      setDataFn(type);
    }
  };

  return (
    <React.Fragment>
      <input
        type={type}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        className={inputClassName}
        readOnly={readOnly ? readOnly : false}
        value={type == "file" ? "" : value}
      />
      {isRequired && btnClicked && type === "text" && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
      {isRequired && btnClicked && type === "password" && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
      {isRequired && btnClicked && type === "number" && !value && (
        <p className="invalid-tooltip">can't be blank</p>
      )}
      {isRequired && btnClicked && type === "email" && !validEmail && (
        <p className="invalid-tooltip">must be a valid email</p>
      )}
      {isRequired && btnClicked && type === "tel" && !validPhone && (
        <p className="invalid-tooltip">must be of 10 digits</p>
      )}
      {isRequired && btnClicked && type === "file" && !validFile && (
        <p className="invalid-tooltip">
          can't be blank, file size must be upto 10mb
        </p>
      )}
      {isRequired && btnClicked && type === "url" && !validUrl && (
        <p className="invalid-tooltip">can't be blank, must be valid url</p>
      )}
    </React.Fragment>
  );
};

export default Input;
