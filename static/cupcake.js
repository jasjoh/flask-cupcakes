"use strict";
const CUPCAKE_API_BASE_URL = "http://localhost:5000/api/cupcakes";
// TODO: Ideally have global variables referring to useful DOM elements


/** Conductor function which is called on page load
 * Fetches all cupcakes from cupcake API
 * Creates the HTML representation of those cupcakes
 * Appends each HTML representation to web page
 */
async function fetchAllCupcakeAndDisplay() {
  // TODO: Ideally don't have function calls inside function params
  displayCupcake(await getCupcakes());
}

/** Conductor function which is called on form submission
 * Gets cupcake data from the form
 * Calls cupcake API to create cupcake
 * Creates html for the cupcake and appends html to web page
 */
async function addCupcakeAndDisplay() {
  // NOTE: Alternative is to assign to variables and then use JS obj creation
  // shorthand to create the object
  const cupcake = {
    "flavor": $("#flavor").val(),
    "rating": $("#rating").val(),
    "size": $("#size").val(),
    "imageUrl": $("#imgUrl").val()
  };
  // TODO: Ideally don't have function calls inside function params
  displayCupcake(await createCupcake(cupcake));
}

$('#addCupcakeForm').on("submit", async function(event) {
  event.preventDefault();
  await addCupcakeAndDisplay();
});


// TODO: Ideally function name is more specific about what it's doing
// The term 'create' is a little ambiguous
/** Accepts a cupcake object to create
 * Returns the newly created cupcake object in an array
*/
async function createCupcake(cupcake) {
  // console.log("createCupcake() asked to create cupcake:", cupcake);
  const response = await axios.post(CUPCAKE_API_BASE_URL, cupcake);
  cupcake = response.data.cupcake;
  // console.log("createCupcake() created cupcake:", cupcake);
  // TODO: Accounting for the need for displayCupcake() to have an array
  // should be handled in conductor, not in here
  return [cupcake]
}

// TODO: Could break out the DOM element creation to a separate function
/** Accepts array of cupcake objects
 * For each cupcake, creates html and appends web page
*/
async function displayCupcake(cupcakes) {
  for (let cupcake of cupcakes) {
    const $div = $("<div>");
    for (let key in cupcake) {
      console.log("displayCupCake adding cupcake:", key, ": ", cupcake[key]);
      if (key === "image_url") {
        $div.append($(`<img src=${cupcake[key]}
          width="200px" height="200px"></img>`));
        continue;
      }
      $div.append($(`<p> ${key}: ${cupcake[key]} </p>`));
    }
    $("#cupcakeList").append($div);
  };
}

/** Gets all cupcakes and returns them as an array of objects */
async function getCupcakes() {
  const response = await axios.get(CUPCAKE_API_BASE_URL);
  const cupcakes = response.data.cupcakes;
  console.log("getCupcakes() found cupcakes:", cupcakes);
  return cupcakes;
}

fetchAllCupcakeAndDisplay();