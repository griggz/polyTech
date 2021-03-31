import cookie from "react-cookies";
import * as d3 from "d3";

// Generic API Connection and Data Fetcher
export function FetchData(endpoint) {
  const lookupOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const csrfToken = cookie.load("csrftoken");
  if (csrfToken !== undefined) {
    lookupOptions.credentials = "include";
    lookupOptions.headers["X-CSRFToken"] = csrfToken;
  }
  return fetch(endpoint, lookupOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      return responseData;
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

// generic filtering function
export function FilterData(data, field, value, operator) {
  if (Array.isArray(value)) {
    if (operator === "equals") {
      return data.filter((d) => {
        return value.includes(d[field]);
      });
    } else if (operator === "not") {
      return data.filter((d) => {
        return !value.includes(d[field]);
      });
    }
  } else {
    if (operator === "equals") {
      return data.filter((d) => {
        return d[field] === value;
      });
    } else if (operator === "not") {
      return data.filter((d) => {
        return d[field] !== value;
      });
    }
  }
}

// Uppercases the first letter of a string
export function UpperFirstLetter(string) {
  // Utility function for upper casing first letters (ex. virginia => Virginia)
  if (typeof string === undefined) return "Undefined";
  if (string.split("_")[1] === "dc") {
    const firstWord = string.split("_")[0];
    const secondWord = string.split("_")[1];

    return (
      firstWord[0].toUpperCase() +
      firstWord.slice(1) +
      " " +
      secondWord.toUpperCase()
    );
  } else if (string.includes("_")) {
    const firstWord = string.split("_")[0];
    const secondWord = string.split("_")[1];

    return (
      firstWord[0].toUpperCase() +
      firstWord.slice(1) +
      " " +
      secondWord[0].toUpperCase() +
      secondWord.slice(1)
    );
  } else {
    const firstLetter = string[0];
    return firstLetter ? firstLetter.toUpperCase() + string.slice(1) : "";
  }
}

// Group By function
export function GroupBy(arr, prop) {
  const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
  arr.forEach((obj) => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
}

// Group by two values
export function GroupBy2(data, key1, key2) {
  const dataRollup = d3
    .nest()
    .key((d) => d[key1])
    .key((d) => d[key2])
    .rollup((v) => ({
      region: v.map((d) => {
        return d.region;
      })[0],
      measurementA: d3.sum(v, (d) => d.rmp),
      measurementB: d3.sum(v, (d) => d.kigali),
      measurementC: d3.sum(v, (d) => d.snap),
      measurementD: d3.sum(v, (d) => d.slcp),
    }))
    .entries(data);
  return dataRollup;
}
