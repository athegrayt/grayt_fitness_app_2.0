import React from 'react';
import logo from '../../../assets/images/logo2.png';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Button from '../../../components/UI/Button/Button'
import * as classes from './Registration.module.css';

const Registration = (props) => {
	const {
		name,
		page,
		setPage,
		birthdate,
		sex,
		height,
		weight,
		goalWeight,
		activity,
		submit,
	} = props;

	let showRight = false;
	if (page === 1) {
		showRight = true;
	}
	if (page === 2 && name) {
		showRight = true;
	}
	if (page === 3 && sex) {
		showRight = true;
	}
	if (page === 4 && height) {
		showRight = true;
	}
	if (page === 5 && birthdate) {
		showRight = true;
	}
	if (page === 6 && weight) {
		showRight = true;
	}
	if (page === 7 && activity) {
		showRight = true;
	}
	if (page === 8 && goalWeight) {
		showRight = true;
	}
	return (
		<div className={classes.layout}>
			{/* <Link
				to={{
					pathname: '/dashboard',
					icon: 'home',
				}}> */}
			<img className={classes.logo} src={logo} alt='logo'></img>
			{/* </Link> */}
			<main className={classes.content}>{props.children}</main>
			{(
				<div className={classes.registration}>
					<div className={classes.icons}>
						{page > 1 && page !==9 &&(
							<div onClick={() => setPage(page - 1)} className={classes.left}>
								<FaAngleLeft color='#9b9b9b' size='2rem' />
							</div>
						)}
						{showRight && (
							<div onClick={() => setPage(page + 1)} className={classes.right}>
								<FaAngleRight color='#9b9b9b' size='2rem' />
							</div>
						)}
					</div>
					{page === 9 && (
						<div className={classes.submit}>
							<Button type='submit' btnType='Success' clicked={submit}>
								Submit
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Registration;
