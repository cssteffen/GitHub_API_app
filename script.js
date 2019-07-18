function callAPI(userInput) {
  const searchURL = `https://api.github.com/users/${userInput}/repos`;
  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
  console.log("callAPI() ran");
  console.log("displayResults() called.");
  displayResults();
}

function displayResults(responseJson) {
  //clears previous results.
  $("#results-list").empty();
  $("#results-list").append;
  //TEST - comes back undefined
  //(`<p>${responseJson}</p>`);
  /*======*/
  for (let i = 0; i < responseJson.length; i++) {
    // for each repo in array add list item with name and link
    $(`#results-list`).append(`<li><a href="${
      responseJson[i].html_url
    }" target="_blank"><h3>${responseJson[i].name}</h3></a></li><p>${
      responseJson[i].description
    }</p>
    <br>`);
  }
  /*============*/
  $(`#results`).removeClass("hidden");
  console.log("displayResults()ran.");
}

function watchForm() {
  console.log("App ready for submission");
  $("form").submit(event => {
    event.preventDefault();
    const userInput = $("#js-gitHandle").val();
    console.log("watchForm()ran.");

    $(".userInput").text(`GitHub Repositories for ${userInput}`);

    callAPI(userInput);
  });
}

$(watchForm);
