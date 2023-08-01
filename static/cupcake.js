"use strict";
const CUPCAKE_API_BASE_URL = "http://localhost:5001/api/cupcakes";


/** Conductor function which is called on pageload
 * fetches all cupcake from cupcake API and create html for each cupcake
 * append each html to the webpage
 */
async function fetchAllCupcakeAndDisplay() {
  displayCupcake(await getCupcakes());

}

/** Conductor function which is called on form submission
 * calls cupcake API to create cupcake
 * create html for the cupcake and append html to webpage
 */
function addCupcakeAndDisplay() {

}


/** Handle form submission and call cupcake creation endpoint
 * return the new cupcake's JSON
*/
async function createCupcake() {

}

/** Accepts array of cupcake JSON
 * create html and append to our cupcake list div
*/
async function displayCupcake(cupcakes) {
  console.log("cupcakes display here:", cupcakes);
  for (let cupcake of cupcakes) {

    const $div = $("<div>");

    for (let key in cupcake) {
      console.log("key is:", key, "value is :", cupcake[key]);
      $div.append($(`<p> ${key}: ${cupcake[key]} </p>`));
    }
    $("#cupcakeList").append($div);
  }

}

/** Get all cupcakes and returns JSON representing array of cupcakes */
async function getCupcakes() {
  const response = await axios.get(CUPCAKE_API_BASE_URL);
  const cupcakes = response.data.cupcakes;
  return cupcakes;
}

fetchAllCupcakeAndDisplay();