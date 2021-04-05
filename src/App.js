import React, { useEffect, useState } from 'react'
import BackgroundImage from './assets/background-01.jpg'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { SearchBar, PlantData } from './components/'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#78935d',
		color: 'white',
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
		fontWeight: 600,
	},
	paperTitle: {
		flexGrow: 1,
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
		top: '30vh',
		left: '0px',
		color: '#78935d',
		fontSize: '3.5vw',
		fontWeight: 'semi-bold',
	},
	paperSubTitle: {
		flexGrow: 1,
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
		top: '45vh',
		left: '0px',
		color: '#707066',
		fontSize: '1.20vw',
	},
	superHeroImg: {
		width: '100%',
	},
}))

export default function App() {
	const classes = useStyles()
	const PLANT_API_URL =
		'https://data.sfgov.org/resource/vmnk-skih.json?$select=*'

	const [loading, setLoading] = useState(true)
	const [plantState, setPlantState] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		fetch(PLANT_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				setPlantState(jsonResponse.Search)
				setLoading(false)
			})
	}, [])

	const search = searchValue => {
		setLoading(true)
		setErrorMessage(null)

		fetch(
			`https://data.sfgov.org/resource/vmnk-skih.json?common_name=${searchValue}`
		)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === 'True') {
					setPlantState(jsonResponse.Search)
					setLoading(false)
				} else {
					setErrorMessage(jsonResponse.Error)
					setLoading(false)
				}
			})
	}

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						San Francisco Plant Finder
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.root}>
				<Typography className={classes.paperTitle}>Plant Finder</Typography>
				<Typography className={classes.paperSubTitle}>
					A resource for gardeners, designers, ecologists <br /> and anyone who
					is interested in greening neighborhoods, <br /> enhancing our urban
					ecology and surviving the drought.
				</Typography>
				<img
					src={BackgroundImage}
					className={classes.superHeroImg}
					alt='plantImage'
				/>
				<SearchBar search={search} />
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className='errorMessage'>{errorMessage}</div>
				) : (
					plantState &&
					plantState.map((plant, index) => (
						<PlantData key={`${index}-${plant.common_name}`} plant={plant} />
					))
				)}
			</div>
		</div>
	)
}
