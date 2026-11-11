
document.querySelector("form").addEventListener("submit", calculate)


function calculate(event){
    event.preventDefault();

    // Get input values
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;

    // Validate inputs
    if (weight <= 0 || height <= 0 || age <= 0 || !gender) {
        alert("Please enter valid information.");
        return;
    }

    // Calculate BMI
    let bmi = weight / Math.pow(height / 100, 2);

    // Calculate Basic Calories
    let basicCalories;

    if (gender === "men") {
        basicCalories = (weight * 10) + (height * 6.25) - (age * 5) + 5;
    } 
    else {
        basicCalories = (weight * 10) + (height * 6.25) - (age * 5) - 161;
    }

    let calorieTarget;
    let bmiCategory;

    if (bmi >= 30) {
        bmiCategory = "Obese";
        calorieTarget = basicCalories - 750;
    } 
    else if (bmi >= 25) {
        bmiCategory = "Overweight";
        calorieTarget = basicCalories - 500;
    } 
    else {
        bmiCategory = "Normal/Underweight";
        calorieTarget = basicCalories;
    }

    // Display results
    document.getElementById("bmi").textContent = bmi.toFixed(2);
    window.currentCalorieTarget = calorieTarget;

    document.getElementById("category").textContent = bmiCategory;

    document.getElementById("calorieTarget").textContent =
        Math.round(calorieTarget) + " kcal/day";


//changing the images
let bmiImage = document.getElementById("bmiImage");

if (bmi >= 30) {
    bmiImage.setAttribute("src", "img/obese.png");
}
else if (bmi >= 25) {
    bmiImage.setAttribute("src", "img/over.png");
}
else {
    bmiImage.setAttribute("src", "img/normal.png");
}

};


//meal plan
document.getElementById("generateMealPlan").addEventListener("click", mealplan);


function mealplan() {

    if (window.currentCalorieTarget == undefined) {
        alert("Please calculate your BMI first.");
        return;
    }

    let selectedFoods = [];
    let totalCalories = 0;

    // Create a copy of the food database
    let availableFoods = [];

    for (let i = 0; i < foodDatabase.length; i++) {
        availableFoods.push(foodDatabase[i]);
    }

    // Randomly select foods
    while (totalCalories < window.currentCalorieTarget * 0.95
           && availableFoods.length > 0) {

        let random = Math.floor(Math.random() * availableFoods.length);

        let food = availableFoods[random];

        // Remove selected food from available foods
        availableFoods.splice(random, 1);

        if (totalCalories + food.cal <= window.currentCalorieTarget) {

            selectedFoods.push(food);

            totalCalories += food.cal;
        }
    }

    // Display selected foods
    let mealList = document.getElementById("mealList");

    mealList.innerHTML = "";

    for (let i = 0; i < selectedFoods.length; i++) {

        let item = document.createElement("li");

        item.textContent = selectedFoods[i].name + " - " + selectedFoods[i].cal + " kcal";

        mealList.appendChild(item);
    }

    // Display total calories
    document.getElementById("mealCalories").textContent = totalCalories;
}



//dataset
const foodDatabase = [
    { name: "Apple (1 medium)", cal: 95 },
    { name: "Banana (1 medium)", cal: 105 },
    { name: "Orange (1 medium)", cal: 62 },
    { name: "Grapes (1 cup)", cal: 104 },
    { name: "Strawberries (1 cup)", cal: 49 },
    { name: "Broccoli (1 cup)", cal: 55 },
    { name: "Carrots (1 cup)", cal: 52 },
    { name: "Spinach (1 cup)", cal: 7 },
    { name: "Potato (1 medium)", cal: 161 },
    { name: "Sweet Potato (1 medium)", cal: 103 },
    { name: "Avocado (half)", cal: 117 },
    { name: "Chicken Breast (4oz)", cal: 165 },
    { name: "Salmon (4oz)", cal: 235 },
    { name: "Ground Beef 80/20 (4oz)", cal: 287 },
    { name: "Egg (1 large)", cal: 72 },
    { name: "Tofu (1/2 cup)", cal: 94 },
    { name: "Black Beans (1/2 cup)", cal: 114 },
    { name: "Lentils (1/2 cup)", cal: 115 },
    { name: "Plain Greek Yogurt (1 cup)", cal: 100 },
    { name: "Almonds (1 oz)", cal: 164 },
    { name: "Peanuts (1 oz)", cal: 161 },
    { name: "Peanut Butter (2 tbsp)", cal: 188 },
    { name: "Brown Rice (1 cup cooked)", cal: 216 },
    { name: "White Rice (1 cup cooked)", cal: 205 },
    { name: "Quinoa (1 cup cooked)", cal: 222 },
    { name: "Oats (1/2 cup dry)", cal: 150 },
    { name: "Whole Wheat Bread (1 slice)", cal: 69 },
    { name: "White Bread (1 slice)", cal: 75 },
    { name: "Pasta (1 cup cooked)", cal: 220 },
    { name: "Bagel (1 medium)", cal: 245 },
    { name: "Flour Tortilla (8 inch)", cal: 144 },
    { name: "Vanilla Ice Cream (1/2 cup)", cal: 137 },
    { name: "Chocolate Chip Cookie (1 medium)", cal: 148 },
    { name: "Potato Chips (1 oz)", cal: 152 },
    { name: "Pretzels (1 oz)", cal: 108 },
    { name: "Cheddar Cheese (1 oz)", cal: 113 },
    { name: "Butter (1 tbsp)", cal: 102 },
    { name: "Olive Oil (1 tbsp)", cal: 119 },
    { name: "Whole Milk (1 cup)", cal: 149 },
    { name: "Almond Milk (1 cup)", cal: 39 },
    { name: "Orange Juice (1 cup)", cal: 112 },
    { name: "Cola (12 oz)", cal: 140 },
    { name: "Black Coffee (8 oz)", cal: 2 },
    { name: "Bacon (2 slices)", cal: 86 },
    { name: "Pork Sausage (1 link)", cal: 133 },
    { name: "Pancakes (2 medium)", cal: 172 },
    { name: "Waffle (1 large)", cal: 218 },
    { name: "Honey (1 tbsp)", cal: 64 },
    { name: "Maple Syrup (1 tbsp)", cal: 52 },
    { name: "Cheese Pizza (1 slice)", cal: 285 }
];