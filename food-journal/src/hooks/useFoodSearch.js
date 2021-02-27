import {useEffect, useState} from 'react'

const useFoodSearch = (food)=>{

    const [quantity, setQuantity] = useState()
    const [unit, setUnit]= useState()
    const [nutrition, setNutrition] = useState()
    useEffect(()=>{
        if(food){
            (async()=>{
                const endpointSelect = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
                fetch(endpointSelect, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-app-id': '5876afdb',
                        'x-app-key': process.env.REACT_APP_API_KEY1,
                    },
                    body: JSON.stringify({
                        query: food,
                        timezone: 'US/Eastern',
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        const nf = Object.keys(data.foods[0])
                            .filter((key) => {
                                return (
                                    key.match(/nf_*/) ||
                                    key.match(/serving*/) ||
                                    key.match(/consumed*/) ||
                                    key.match(/food*/)
                                );
                            })
                            .reduce(
                                (nfObject, curKey) => ({
                                    ...nfObject,
                                    [curKey]: data.foods[0][curKey],
                                }),
                                {}
                            );
                        nf.consumed_at = new Date().getTime(); 
                        console.log(nf.consumed_at);
                        return nf;
                    })
                    .then((res) =>{
                        setQuantity(res.serving_qty)
                        setUnit(res.serving_unit)
                        setNutrition(res)
                    }
                        // dispatch(updateFoodSearch(food, res.serving_qty, res.serving_unit, res))
                    )
                    .catch((error) => console.log(error));

        })()
        }
    },[food])
        return [quantity, unit, nutrition]
};

export default useFoodSearch