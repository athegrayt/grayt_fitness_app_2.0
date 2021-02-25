
import React from 'react'
import Button from '../../UI/Button/Button'
import * as classes from './OnboardingPages.module.css'

const OnboardingPage9 =(props)=>{
    const {name,sex,
height,
age,
weight,
activity,
goalWeight,setPage}= props
    return (
			<div className={classes.OnboardingPages}>
				<div className={classes.question}>
					<h3>Let's review your answers!</h3>
					<p>
						If you spot a mistake, click on it to make the correction.
					</p>
				</div>
				<div className={classes.btns}>
					<Button type='button' btnType='Auth' clicked={() => setPage(2)}>
						Name: {name}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(3)}>
						Gender: {sex}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(4)}>
						Height: {height}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(5)}>
						Age: {age}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(6)}>
						Weight: {weight}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(7)}>
						{' '}
						Daily Activity: {activity}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(8)}>
						Goal Weight: {goalWeight}
					</Button>
				</div>
				
			</div>
		);
}

export default OnboardingPage9