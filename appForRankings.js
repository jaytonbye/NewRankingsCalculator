

let competitorList;
fetch("output.json")
  .then((result) => {
    return result.json();
  })
  .then((result) => {
    competitorList = result;

    for (x = 0; x < competitorList.length; x++) {
      $("#wrestlers").append(`
    <option value="${competitorList[x].Name}"></option>
    `);
    }

    $("#theButton").on("click", () => {
      $("#Rankings").remove();
      $("#divForRankings").append(
        `
      <div class="d-flex justify-content-center">
      <table id="Rankings">
        <thead>
          <th>Rank</th>
          <th>Name</th>
          <th>Weight</th>
          <th>Age</th>
          <th>WeightAdjustedRating</th>
          <th>Team</th>
        </thead>
        </table>
        </div>
      `
      );
      let notOverWeightAndAge = [];
      let percentageOfWeightAbove = 1 + $("#weightPercent").val() / 100;
      let percentageOfAgeAbove = 1 + $("#agePercent").val() / 100;

      let getAllOfTheWrestlersDetails = (name) => {
        for (x = 0; x < competitorList.length; x++) {
          if (name === competitorList[x].Name) {
            return competitorList[x];
          }
        }
      };

      let removeOverWeightAndOverAgeCompetitors = (competitor) => {
        for (x = 0; x < competitorList.length; x++) {
          if (competitor) {
            if (
              competitor.Weight * percentageOfWeightAbove >=
                competitorList[x].Weight &&
              competitor.Age * percentageOfAgeAbove >= competitorList[x].Age
            ) {
              notOverWeightAndAge.push(competitorList[x]);
            }
          }
        }
      };

      let removeThenSort = (competitor) => {
        removeOverWeightAndOverAgeCompetitors(competitor);

        //will be mutated (didn't know how not to, I don't think it will matter.)
        notOverWeightAndAge.sort((a, b) => {
          return a.WeightAdjustedRating < b.WeightAdjustedRating ? 1 : -1;
        });
      };

      let competitorWeAreRanking = $("#wrestlerName").val();
      removeThenSort(getAllOfTheWrestlersDetails(competitorWeAreRanking));
      for (x = 0; x < notOverWeightAndAge.length; x++) {
        //some object destructuring for the win!

        let {
          Rank,
          Name,
          Weight,
          Age,
          WeightAdjustedRating,
          Team,
        } = notOverWeightAndAge[x];

        let hyphenatedName = Name.replace(" ", "-");

        $("#Rankings").append(
          `
          <tr id=${hyphenatedName}>
          <td>${x + 1}</td>
          <td>${Name}</td>
          <td>${Weight}</td>
          <td>${Age}</td>
          <td>${WeightAdjustedRating}</td>
          <td>${Team}</td>
          </tr>`
        );
      }
      let otherHyphentatedName = competitorWeAreRanking.replace(" ", "-");
      $(`#${otherHyphentatedName}`).css("background-color", "red");
      $(`#${otherHyphentatedName}`).css("color", "black");
      $(`#${otherHyphentatedName}`).css("border", "2px solid white");
    });
  });
