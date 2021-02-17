export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.isWholeNum){
    isValid = value > 0
  }

  return isValid;
};

export const timeFormatConvert = (str) => {
  const date = new Date(str);
  let hours = date.getHours();
  let min = date.getMinutes();
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === "00" ? 12 : hours;
  min = min <= 9 ? "0" + min : min;
  return `${hours}:${min}${suffix}`;
};

export const calCount = (meal) => {
	if (meal.length) {
		const mealNutritionTotal = meal
			.map((entry) => {
				return {
					calories: entry.nf_calories * entry.serving_qty,
					carbs: entry.nf_total_carbohydrate * entry.serving_qty,
					protein: entry.nf_protein * entry.serving_qty,
					fat: entry.nf_total_fat * entry.serving_qty,
				};
			})
			.reduce((total, cur) => {
				return {
					calories: Math.round(total.calories + cur.calories),
					carbs: Math.round(total.carbs + cur.carbs),
					protein: Math.round(total.protein + cur.protein),
					fat: Math.round(total.fat + cur.fat),
				};
			});
		console.log(mealNutritionTotal);
		return mealNutritionTotal;
	}
	return {
		calories: 0,
		carbs: 0,
		protein: 0,
		fat: 0,
	};
};