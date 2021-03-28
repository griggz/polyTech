// These functions are intended to serve as a basic check on the uploaded dataset
import States from "../../prebuilt/States";

const Header = [
  "state",
  "year",
  "category",
  "measurementA",
  "measurementB",
  "measurementC",
  "measurementD",
];

// checks to see if data set is hfc scenario data or state metrics
const WhichData = (data) => {
  const cols = [];
  Object.keys(data[0]).map((key) => cols.push(key));
  if (cols.includes("bau")) {
    return "hfc";
  } else {
    return "state";
  }
};

// converts non ints to ints
const ShapeData = (d) => {
  return {
    state: d.state ? d.state.toLowerCase().trim().replace(/\s/g, "_") : "",
    year: d.year ? d.year.trim() : "",
    category: d.category
      ? d.category.toLowerCase().trim().replace(/\s/g, "_")
      : "",
    measurementA: d.measurementa ? +d.measurementa : 0,
    measurementB: d.measurementb ? +d.measurementb : 0,
    measurementC: d.measurementc ? +d.measurementc : 0,
    measurementD: d.measurementd ? +d.measurementd : 0,

    errors: false,
  };
};

// CheckCategory
const CheckCategory = (d) => {
  const categoryFields = ["rouge", "argent", "vert", "gris", "bleu"];

  if (categoryFields.includes(d)) {
    return "pass";
  } else {
    return "fail";
  }
};

// CheckYear
const CheckYear = (d) => {
  if (+d > 1999 && +d < 2099) {
    return "pass";
  } else {
    return "fail";
  }
};

const CheckState = (d, stateName) => {
  const states = States.map((option) => option.value);
  const match = d.toLowerCase() === stateName.toLowerCase();
  if (match) {
    if (states.includes(d)) {
      return "pass";
    } else {
      return "fail";
    }
  } else {
    return "fail";
  }
};

// converts invalid col headers to valid col headers
const CleanHeader = (data) => {
  const arr = [];
  data.forEach(function (row) {
    const cleanRow = renameKeys(row.data);
    arr.push(cleanRow);
  });
  return arr;
};

// function to rename keys, removing spaces and lowercasing
const renameKeys = (obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [key.toLowerCase().replace(/\W/, "_")]: obj[key] },
    }),
    {}
  );

// Checks to confirm columns exist
const CheckColumns = ({ data }) => {
  const invalidCols = [];
  const dataCols = [];
  Object.keys(data[0]).forEach((key) => {
    dataCols.push(key);
    if (!Header.includes(key)) {
      invalidCols.push(key);
    }
  });
  return { invalidCols };
};

// Check if State Matches
const CheckUserState = ({ data, user }) => {
  if (user.state === data[0].state) {
    return true;
  } else {
    return false;
  }
};

export {
  CleanHeader,
  WhichData,
  ShapeData,
  CheckColumns,
  Header,
  CheckCategory,
  CheckYear,
  CheckState,
  CheckUserState,
};
