
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
			<div className={classes.summary}>
					<Button type='button' btnType='Auth' clicked={() => setPage(2)}>
						Name: {name}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(3)}>
						Gender: {sex}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(4)}>
						Height: {Math.floor(height / 12)}ft {height % 12}in
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(5)}>
						Age: {age} yrs
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(6)}>
						Weight: {weight} lbs
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(7)}>
						{' '}
						Daily Activity: {activity}
					</Button>
					<Button type='button' btnType='Auth' clicked={() => setPage(8)}>
						Goal Weight: {goalWeight} lbs
					</Button>
			</div>
		);
}

export default OnboardingPage9