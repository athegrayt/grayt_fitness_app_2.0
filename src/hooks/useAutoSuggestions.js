import {useState, useEffect} from 'react'

const useAutoSuggestions = (search) => { 
    const [hints, setHints] = useState([])
	
	useEffect(()=>{
		autoSuggestions(search);
	}, [search])

const autoSuggestions = async(search)=>{
	try {
		if (search) {
			const query = `?query=${search}`;
			const endpoint = `https://trackapi.nutritionix.com/v2/search/instant${query}`;
			fetch(endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-app-id': '5876afdb',
					'x-app-key': process.env.REACT_APP_API_KEY2,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					const hintList = [];
					for (let name in data.common) {
						hintList.push(data.common[name].food_name);
					}
					setHints(hintList);
				});
		}else{
			return []
		}
	} catch (err) {
		console.log(err);
	}
};
	return hints
};

export default useAutoSuggestions;