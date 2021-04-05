import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { SearchBar } from './components/'
import BackgroundImage from './assets/background-01.jpg'
import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	CircularProgress,
	Button,
	CardActions,
	Card,
	CardContent,
	CardActionArea,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from '@material-ui/core'
import EcoIcon from '@material-ui/icons/Eco'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import OpacityIcon from '@material-ui/icons/Opacity'
import PlantImages from './util/plantImage'

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
	plantImage: {
		width: '100%',
	},
	loading: {
		marginLeft: '50%',
		marginTop: '20px',
		color: '#707066',
	},
	cardImage: {
		maxWidth: 500,
		margin: '20px',
	},
	listIcons: {
		display: 'flex',
	},
	card: {
		display: 'inline-block',
		margin: '20px',
	},
	thumbnail: {
		height: '350px',
		width: '100%',
	},
}))

export default function App() {
	const classes = useStyles()
	const [searchValue, setSearchValue] = useState('')

	const [{ data: plantData, loading: loadingPlantData }] = useAxios(
		'https://data.sfgov.org/resource/vmnk-skih.json?$select=*'
	)

	const filterNames = ({ common_name }) => {
		return (
			common_name &&
			common_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
		)
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
					className={classes.plantImage}
					alt='plantImage'
				/>
				<SearchBar onSearch={setSearchValue} value={searchValue} />

				<div>
					{loadingPlantData ? (
						<CircularProgress className={classes.loading} />
					) : (
						<>
							{plantData &&
								plantData.filter(filterNames).map(plants => {
									return (
										<div key={plants.id}>
											<Card className={classes.cardImage}>
												<CardActionArea>
													<img
														alt='plantImage'
														key={plants.id}
														src={
															PlantImages[plants.common_name]
																? PlantImages[plants.common_name].image
																: 'https://i.imgur.com/VRaN8uw.jpg'
														}
														className={classes.thumbnail}
													/>
													<CardContent>
														<Typography
															gutterBottom
															variant='h5'
															component='h2'
														>
															{plants.common_name}
														</Typography>
														<Typography
															variant='body2'
															color='textSecondary'
															component='p'
														>
															<List className={classes.listIcons}>
																<ListItem>
																	<ListItemAvatar>
																		<Avatar>
																			<EcoIcon />
																		</Avatar>
																	</ListItemAvatar>
																	<ListItemText
																		primary='Type'
																		secondary={plants.plant_type}
																	/>
																</ListItem>
																<ListItem>
																	<ListItemAvatar>
																		<Avatar>
																			<ColorLensIcon />
																		</Avatar>
																	</ListItemAvatar>
																	<ListItemText
																		primary='Color'
																		secondary={plants.flower_color}
																	/>
																</ListItem>
																<ListItem>
																	<ListItemAvatar>
																		<Avatar>
																			<OpacityIcon />
																		</Avatar>
																	</ListItemAvatar>
																	<ListItemText
																		primary='Water Needs'
																		secondary={plants.water_needs}
																	/>
																</ListItem>
															</List>
															<CardActions>
																<Button size='small' color='primary'>
																	Learn More
																</Button>
															</CardActions>
														</Typography>
													</CardContent>
												</CardActionArea>
											</Card>
										</div>
									)
								})}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
