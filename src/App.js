import React from 'react'
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
				<SearchBar />
				<PlantData />
			</div>
		</div>
	)
}
