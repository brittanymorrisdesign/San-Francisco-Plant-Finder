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
	Dialog,
	DialogContent,
	IconButton,
	withStyles,
} from '@material-ui/core'
import EcoIcon from '@material-ui/icons/Eco'
import CloseIcon from '@material-ui/icons/Close'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import OpacityIcon from '@material-ui/icons/Opacity'
import PlantImages from './util/plantImage'
import Pagination from '@material-ui/lab/Pagination'

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
	closeButton: {
		position: 'absolute',
		float: 'right',
		marginTop: '5px',
	},
	pagination: {
		margin: '10px',
	},
}))

export default function App() {
	const classes = useStyles()
	const [searchValue, setSearchValue] = useState('')
	const [open, setOpen] = useState(false)
	const itemsPerPage = 9
	const [page, setPage] = useState(1)

	const [{ data: plantData, loading: loadingPlantData }] = useAxios(
		'https://data.sfgov.org/resource/vmnk-skih.json?$select=*'
	)

	const [noOfPages] = useState(
		Math.ceil(plantData && plantData.length / itemsPerPage)
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

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const DialogTitle = withStyles()(props => {
		const { children, classes, onClose } = props
		return (
			<div>
				<Typography variant='h6'>{children}</Typography>
				{onClose ? (
					<IconButton
						aria-label='close'
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</div>
		)
	})

	const plantInfo = (
		<div>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Open dialog
			</Button>
			<Dialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
			>
				<DialogTitle id='customized-dialog-title' onClose={handleClose}>
					Modal title
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
						ac consectetur ac, vestibulum at eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
						Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
						auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
						cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
						dui. Donec ullamcorper nulla non metus auctor fringilla.
					</Typography>
				</DialogContent>
			</Dialog>
		</div>
	)

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
								plantData
									.filter(filterNames)
									.slice((page - 1) * itemsPerPage, page * itemsPerPage)
									.map(plants => {
										return (
											<div key={plants.id} className={classes.plantCard}>
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
																	<Button
																		size='small'
																		onClick={handleClickOpen}
																		className={classes.learnMoreBtn}
																		value={plants.homeNewsId}
																	>
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
							{open && plantInfo}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
