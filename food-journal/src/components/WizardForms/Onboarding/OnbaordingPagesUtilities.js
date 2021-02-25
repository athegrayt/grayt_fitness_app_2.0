export const optionGroupsAge = (range) => {
	let groupValues = { age: [] };
	const numRange = Array.from({ length: range }, (v, k) => k + 1);
	numRange.map((num, i) => {
		groupValues.age.push({ value: num, label: `${num} yrs` });
	});
	return groupValues;
};

export const groupValuesWeight = (range)=>{
	let groupValues = { weight: [] };
	const numRange = Array.from({ length: range }, (v, k) => k + 1);
	numRange.map((num, i) => {
		groupValues.weight.push({ value: num, label: `${num} lbs` });
	});
	return groupValues
}
export const groupValuesGoalWeight = (range)=>{
	let groupValues = { goalWeight: [] };
	const numRange = Array.from({ length: range }, (v, k) => k + 1);
	numRange.map((num, i) => {
		groupValues.goalWeight.push({ value: num, label: `${num} lbs` });
	});
	return groupValues
}