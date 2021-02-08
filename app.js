const container = document.querySelector("#container");
const getFoods = async () => {
	let আমিযেটাখাবো = document.querySelector("#whatIWant").value;
	let api_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${আমিযেটাখাবো}`;
	let response = await fetch(api_url);
	let data = await response.json();
	var meals = data.meals;
	showFoods(meals);
};
const showFoods = (meals) => {
	container.innerHTML = "";
	meals.forEach((meal) => {
		let foodCard = document.createElement("div");
		foodCard.innerHTML = `
        <h2 onclick="foodDetail(${meal.idMeal})">${meal.strMeal}</h2>
        `;
		container.appendChild(foodCard);
	});
};

const foodDetail = async (meal) => {
	let food_url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
	let foodResponse = await fetch(food_url);
	let food = await foodResponse.json();
	var foodItem = food.meals;
	// console.log(fo);
	container.innerHTML = `
    <h2>${foodItem[0].strMeal}</h2>
    <h4>Ingredients:</h4>
    `;
	getIngredients(foodItem[0]);
};
const getIngredients = (foodItem) => {
	let items = new Array();
	for (i = 0; i <= 20; ++i) {
		let a = "strIngredient" + i;
		let b = foodItem[a];
		if (b != " " && b != "" && b != "null" && b != undefined) {
			items.push(b);
		}
	}
	let ingredients = document.createElement("ol");
	container.appendChild(ingredients);
	items.forEach((item) => {
		let listofItems = document.createElement("li");
		listofItems.innerHTML = item;
		ingredients.appendChild(listofItems);
	});
};
