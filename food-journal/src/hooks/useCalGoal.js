import { useEffect, useState } from 'react';

 const useCalGoal = (weight, height, age, goalWeight, activity, sex) => {
		const [calGoal, setCalGoal] = useState();
		let userInfo = {};
		if (weight && height && age && goalWeight && activity && sex) {
			userInfo = { weight, height, age, goalWeight, activity, sex };
		}
		useEffect(() => {
			let curCalIntake = 0;
			let activityNum = 1.25;
			if (userInfo.activity === 'Moderate') {
				activityNum = 1.4;
			}
			if (userInfo.activity === 'High') {
				activityNum = 1.65;
			}
			if (userInfo.sex === 'male') {
				curCalIntake =
					(userInfo.weight * 6.23 +
						userInfo.height * 12.7 -
						userInfo.age * 6.8 +
						66) *
					activityNum;
			} else {
				curCalIntake =
					(userInfo.weight * 4.36 +
						userInfo.height * 4.32 -
						userInfo.age * 4.7 +
						665) *
					activityNum;
			}
			if (userInfo.weight > userInfo.goalWeight) {
				setCalGoal(Math.round(curCalIntake - 500));
			} else if (userInfo.weight < userInfo.goalWeight) {
				setCalGoal(Math.round(curCalIntake + 500));
			} else {
				setCalGoal(Math.round(curCalIntake));
			}
		}, [userInfo]);
		return calGoal;
 };

export default useCalGoal;