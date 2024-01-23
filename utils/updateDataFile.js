import fs from "fs";

export const updateDataFile = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
