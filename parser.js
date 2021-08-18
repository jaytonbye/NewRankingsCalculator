const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "input.json");
const outputFile = path.join(__dirname, "output.json");

console.log("hi");

fs.readFile(inputFile, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  const parsedJson = JSON.parse(data);

  const cleanedData = parsedJson.map((wrestler) => {
    return {
      Rank: wrestler.Rank,
      Name: wrestler.Name,
      Weight: Number(wrestler.Weight),
      Age: wrestler.Age,
      WeightAdjustedRating: wrestler["Weight-Adjusted Rating"],
      Team: wrestler.Team,
    };
  });
  console.log(cleanedData);
  fs.writeFile(outputFile, JSON.stringify(cleanedData), (error) => {
    if (error) {
      console.log(error);
    }
  });
});
