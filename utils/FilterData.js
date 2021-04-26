// generic filtering function
export default function FilterData(data, field, value, operator) {
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
