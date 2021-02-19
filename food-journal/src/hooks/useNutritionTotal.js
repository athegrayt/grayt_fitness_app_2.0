import {useState, useEffect} from 'react'
import { calCount } from '../shared/utility'; 

const useNutritionTotal = (meals, meal, food, parent)=>{
  console.log(parent);  
  const [nutritionTotal, setNutritionTotal]=useState({})
    const [curTotalCal, setCurTotalCal]=useState(0)
    useEffect(() => {
      let curNutrition = null
      if(meals && !meal && !food){
         console.log('meals && !meal && !food');
          curNutrition = meals
            .map((meal) => {
                return calCount(meal.entries);
            })
            .reduce((total, cur) => {        
                      return {
                              calories: Math.round(total.calories + cur.calories),
                carbs: Math.round(total.carbs + cur.carbs),
                protein: Math.round(total.protein + cur.protein),
                fat: Math.round(total.fat + cur.fat),
              };
            });
          setNutritionTotal(curNutrition)
          setCurTotalCal(curNutrition.calories)
      }else if(meals && meal && !food){
          console.log('meals && meal && !food');
          curNutrition = meals
            .filter((meal) => meal.name === meal)
            .map((meal) => calCount(meal.entries))[0];
            setNutritionTotal(curNutrition)
      }else if (meals && !meal && food){
          console.log('meals && !meal && food');
          curNutrition = {
              calories: food.nf_calories,
              carbs: food.nf_total_carbohydrate,
              protein: food.nf_protein,
              fat: food.nf_total_fat,
          };
          setNutritionTotal(curNutrition)
        }
      },[meal,food])
		
console.log([nutritionTotal, curTotalCal]);    
return [nutritionTotal, curTotalCal];
}

export default useNutritionTotal;