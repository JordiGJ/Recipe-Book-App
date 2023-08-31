// get elements
const body = document.querySelector("body");

// variables
const API_KEY = "user yor own api key here";
const recipesUrl = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;

// fetch API data
async function getRecipes() {
  const response = await fetch(recipesUrl);
  const data = await response.json();
  return data.recipes;
}

// create section title
function createTitle(str) {
  const container = document.createElement("div");
  container.classList.add("title-container");
  const heading2 = document.createElement("h2");
  heading2.textContent = str;
  container.append(heading2);
  return container;
}

// create section img
function createImg(url, alt) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = alt;
  return img;
}

// create section ingredients
function createIngredients(ingredients, spanClassName) {
  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients-container");
  const para = document.createElement("p");
  const newSpan = document.createElement("span");
  newSpan.classList.add(`${spanClassName}`);
  newSpan.textContent = "Ingredients:";
  para.append(newSpan);
  const ingredientsSpan = document.createElement("span");
  para.append(ingredientsSpan);
  [...ingredients].forEach(
    (el) => (ingredientsSpan.textContent += ` ${el.name},`)
  );
  const length = ingredientsSpan.textContent.length;
  const removeLastComma = ingredientsSpan.textContent
    .split("")
    .splice(0, length - 1)
    .join("");
  ingredientsSpan.textContent = removeLastComma;
  ingredientsContainer.append(para);
  return ingredientsContainer;
}

// create section anchor
function createAnchor(str, text) {
  const ancContainer = document.createElement("div");
  ancContainer.classList.add("anc-container");
  const anchor = document.createElement("a");
  anchor.href = str;
  anchor.textContent = "view recipe";
  anchor.target = "_blank";
  ancContainer.append(anchor);
  return ancContainer;
}

// create meal section
function createMealContainer(
  title,
  image,
  extendedIngredients,
  sourceUrl,
  ingredientsSpanClassName,
  sectionClassName
) {
  const section = document.createElement("section");
  const imgAndTitleContainer = document.createElement("div");
  imgAndTitleContainer.classList.add("img-title-container");
  const sectionTitle = createTitle(title);
  const sectionImg = createImg(image, title);
  imgAndTitleContainer.append(sectionImg, sectionTitle);
  const sectionIngredients = createIngredients(
    extendedIngredients,
    ingredientsSpanClassName
  );
  const sectionAnchor = createAnchor(sourceUrl, title);
  section.classList.add(`${sectionClassName}`);
  section.append(imgAndTitleContainer, sectionIngredients, sectionAnchor);
  body.append(section);
}

// call API and render meals list
async function init() {
  const recipes = await getRecipes();
  recipes.forEach((rec) =>
    createMealContainer(
      rec.title,
      rec.image,
      rec.extendedIngredients,
      rec.sourceUrl,
      "ingredients-span",
      "meal",
      "img-container-className"
    )
  );
}

// load page
init();
