import faker from "faker";
import States from "../../../apps/data-platform/components/prebuilt/States";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const years = [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028,
        2029,
        2030,
      ];
      const categories = ["rouge", "vert", "bleu", "argent", "jaune", "gris"];
      const lineData = [];
      const radarData = [];
      // LineViz Data
      States.map((d) => {
        years.map((y) => {
          lineData.push({
            state: d.value,
            year: y,
            measurementA: faker.datatype.number(),
            measurementB: faker.datatype.number(),
            measurementC: faker.datatype.number(),
            measurementD: faker.datatype.number(),
          });
        });
      });
      // radar Data
      States.map((d) => {
        years.map((y) => {
          categories.map((c) => {
            radarData.push({
              state: d.value,
              year: y,
              category: c,
              measurementA: faker.datatype.number(),
              measurementB: faker.datatype.number(),
              measurementC: faker.datatype.number(),
              measurementD: faker.datatype.number(),
            });
          });
        });
      });

      res.status(200).send({
        lineDataRaw: lineData,
        radarDataRaw: radarData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: err.response.data.detail,
        data: err.response.data,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
