const api_url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
// Margarita
const searchInp = document.getElementById("search-inp");
const searchBtn = document.getElementById("search-btn");
const display = document.getElementById("display");

function getInfo() {
  let userInp = searchInp.value;
  console.log(`You have entered : ${userInp}`);
  if (userInp.length == 0) {
    display.innerHTML = `<h1 class="msg">The input field cannot be empty.</h1>`;
  } else {
    display.innerHTML = "";
    searchInp.value = "";
    fetch(`${api_url}${userInp}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((d) => {
        console.log(d);
        // const myDrink = d.drinks[0];

        d.drinks.map((myDrink) => {
          //Printing the name of the drink
          console.log(myDrink.strDrink);

          //Printing the url for image of the drink
          console.log(myDrink?.strGlass);
          console.log(myDrink?.strDrinkThumb);

          let count = 1;
          let ingredients = [];
          for (let i in myDrink) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myDrink[i]) {
              ingredient = myDrink[i];
              // console.log(ingredient);
              if (myDrink[`strMeasure` + count]) {
                measure = myDrink[`strMeasure` + count];
              } else {
                measure = "";
              }
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          //For printing the Ingredients with quantity
          console.log(`**ingredients for ${myDrink.strDrink}**`);
          console.log(ingredients);
          ingredients.map((item) => console.log(item));

          //Printing the recipe instruction
          console.log("Instructions : " + myDrink.strInstructions);

          // Create a new drink container
          let drinkContainer = document.createElement("div");
          drinkContainer.classList.add("drink-container");

          //Synthesizing of the drinks into html
          let html = `
          <h2>${myDrink.strDrink}</h2>
          <div class='details'>
            <img src=${myDrink.strDrinkThumb} alt="Image not available">
            <div class='ing-info'>
              <h3>Ingredients</h3>
              <ul class='ingredients'></ul>
            </div>
            <div class='instruct-info'>
              <h3>Instructions</h3>
              <p>${myDrink.strInstructions}</p>
            </div>
          </div>
          `;
          drinkContainer.innerHTML = html;

          // Select the ingredients container within the current drink container
          let ingredientsCon = drinkContainer.querySelector(".ingredients");
          console.log(ingredientsCon);
          ingredients.forEach((item) => {
            let listItem = document.createElement("li");
            listItem.innerText = item;
            ingredientsCon.appendChild(listItem);
          });
          // Append the drink container to the display
          display.appendChild(drinkContainer);
        });
      });
  }
}
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
