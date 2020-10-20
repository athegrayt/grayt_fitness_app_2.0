// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

// function sleep(delay = 0) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, delay);
// 	});
// }

export default function Asynchronous(props) {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const { food } = props;

	useEffect(() => {
		setLoading(true)
		async function fetchData () {
			const endpoint = `https://trackapi.nutritionix.com/v2/search/instant?query=${food}`;
			const foodIds = await fetch(endpoint, {
				headers: {
					'x-app-id': '5876afdb',
					'x-app-key': process.env.REACT_APP_API_KEY1,
				},
			});
			const foods = await foodIds.json();
			console.log(foods);

			if (foods) {
				setOptions(Object.keys(foods).map((key) => foods[key].item[0]));
			}
		};

		fetchData()

		return () => setLoading(false)
	}, [food]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		} 
	}, [open]);

	return (
		<Autocomplete
			id="asynchronous-demo"
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Asynchronous"
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
