import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
	Dialog,
	DialogContent,
	IconButton,
} from '@material-ui/core'
import PlantImages from './util/plantImage'
import Pagination from '@material-ui/lab/Pagination'
import {
	LocalFlorist,
	EmojiNature,
	WbSunny,
	Eco,
	Opacity,
	ColorLens,
	Close,
} from '@material-ui/icons'

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
		color: '#78935d',
	},
	cardImage: {
		maxWidth: 500,
		textAlign: 'center',
		boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
		transition:
			'.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
		margin: '10px',
		'&:hover': {
			transform: 'scale(1.03)',
			boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
		},
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
	plantCard: {
		display: 'inline-block',
		marginTop: '20px',
	},
	learnMoreBtn: {
		color: '#78935d',
		fontWeight: 500,
	},
	pagination: {
		margin: '10px',
	},
	dialogTitle: {
		display: 'inline-block',
		margin: '20px',
	},
	closeBtn: {
		float: 'right',
		margin: '10px',
	},
}))

export default function App() {
	const classes = useStyles()
	const [searchValue, setSearchValue] = useState('')
	const [open, setOpen] = useState(false)
	const itemsPerPage = 9
	const [page, setPage] = useState(1)
	const [plantsInfo, setPlantsInfo] = useState([])
	const [loadingData, setLoadingData] = useState(false)
	const [plant, setPlant] = useState(null)

	useEffect(() => {
		const fetchPlantData = async () => {
			setLoadingData(true)
			try {
				const { data } = await axios.get(
					'https://data.sfgov.org/resource/vmnk-skih.json?$select=*'
				)
				setLoadingData(false)
				setPlantsInfo(data)
			} catch (err) {}
		}
		fetchPlantData()
	}, [])

	const [noOfPages] = useState(
		Math.ceil(plantsInfo && plantsInfo.length / itemsPerPage)
	)

	const filterNames = ({ common_name }) => {
		return (
			common_name &&
			common_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
		)
	}

	const handleChange = value => {
		setPage(value)
	}

	const handleClickOpen = (event, item) => {
		setOpen(true)
		setPlant(item)
	}

	const handleClose = () => {
		setOpen(false)
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
			<Typography className={classes.paperTitle}>Plant Finder</Typography>
			<Typography className={classes.paperSubTitle}>
				A resource for gardeners, designers, ecologists <br /> and anyone who is
				interested in greening neighborhoods, <br /> enhancing our urban ecology
				and surviving the drought.
			</Typography>
			<img
				src={BackgroundImage}
				className={classes.plantImage}
				alt='plantImage'
			/>
			<SearchBar onSearch={setSearchValue} value={searchValue} />

			{loadingData === true ? (
				<CircularProgress className={classes.loading} />
			) : (
				<>
					{plantsInfo &&
						plantsInfo
							.filter(filterNames)
							.slice((page - 1) * itemsPerPage, page * itemsPerPage)
							.map(plants => {
								return (
									<span key={plants.common_name} className={classes.plantCard}>
										<Card className={classes.cardImage}>
											<CardActionArea>
												<img
													alt='plantImage'
													key={plants.common_name}
													src={
														PlantImages[plants.common_name]
															? PlantImages[plants.common_name].image
															: 'https://i.imgur.com/VRaN8uw.jpg'
													}
													className={classes.thumbnail}
												/>
												<CardContent>
													<Typography gutterBottom variant='h5' component='h2'>
														{plants.common_name}
													</Typography>
													<Typography
														variant='body2'
														color='textSecondary'
														component='p'
													>
														<List className={classes.listIcons}>
															<ListItem key={plants.plant_type}>
																<ListItemAvatar>
																	<Avatar>
																		<Eco />
																	</Avatar>
																</ListItemAvatar>
																<ListItemText
																	primary='Type'
																	secondary={plants.plant_type}
																/>
															</ListItem>
															<ListItem key={plants.flower_color}>
																<ListItemAvatar>
																	<Avatar>
																		<ColorLens />
																	</Avatar>
																</ListItemAvatar>
																<ListItemText
																	primary='Color'
																	secondary={
																		!plants.flower_color === null
																			? plants.flower_color
																			: 'Not Available'
																	}
																/>
															</ListItem>
															<ListItem key={plants.water_needs}>
																<ListItemAvatar>
																	<Avatar>
																		<Opacity />
																	</Avatar>
																</ListItemAvatar>
																<ListItemText
																	primary='Water Needs'
																	secondary={plants.water_needs}
																/>
															</ListItem>
														</List>
														<CardActions>
															<Button
																size='small'
																onClick={event =>
																	handleClickOpen(event, plants)
																}
																className={classes.learnMoreBtn}
															>
																Learn More
															</Button>
														</CardActions>
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</span>
								)
							})}
					<div>
						<Pagination
							count={noOfPages}
							page={page}
							onChange={handleChange}
							defaultPage={1}
							size='large'
							showFirstButton
							showLastButton
							className={classes.pagination}
						/>
					</div>
					{open && plant && (
						<Dialog
							key={plant}
							onClose={handleClose}
							aria-labelledby='customized-dialog-title'
							open={open}
						>
							<div>
								<Typography className={classes.dialogTitle} variant='h6'>
									{plant.common_name}
								</Typography>
								{handleClose ? (
									<IconButton
										className={classes.closeBtn}
										aria-label='close'
										onClick={handleClose}
									>
										<Close />
									</IconButton>
								) : null}
							</div>
							<DialogContent dividers>
								<Typography gutterBottom variant='h5' component='h2'>
									{plant.plant_type}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									<List>
										<ListItem key={plant.plant_type}>
											<ListItemAvatar>
												<Eco />
											</ListItemAvatar>
											<ListItemText
												primary='Type'
												secondary={plant.plant_type}
											/>
										</ListItem>
										<ListItem key={plant.flower_color}>
											<ListItemAvatar>
												<LocalFlorist />
											</ListItemAvatar>
											<ListItemText
												primary='Flower Color'
												secondary={plant.flower_color}
											/>
										</ListItem>
										<ListItem key={plant.associated_wildlife}>
											<ListItemAvatar>
												<EmojiNature />
											</ListItemAvatar>
											<ListItemText
												primary='Associated Wildlife'
												secondary={plant.associated_wildlife}
											/>
										</ListItem>
										<ListItem key={plant.bloom_time}>
											<ListItemAvatar>
												<WbSunny />
											</ListItemAvatar>
											<ListItemText
												primary='Bloom Time'
												secondary={plant.bloom_time}
											/>
										</ListItem>
									</List>
								</Typography>
							</DialogContent>
						</Dialog>
					)}
				</>
			)}
		</div>
	)
}
