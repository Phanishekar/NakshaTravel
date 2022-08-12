export const REACT_APP_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : process.env.REACT_APP_API_URL;

export const PER_PAGE_DATA = 5;
export const REACT_APP_FILE_PATH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/uploads/"
    : "https://codesquarry.com/api/uploads/";
