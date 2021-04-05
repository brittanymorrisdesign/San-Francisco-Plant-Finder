import React from 'react'
import useAxios from 'axios-hooks'
import {
	makeStyles,
	CircularProgress,
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardContent,
	Button,
	ListItemText,
	List,
	ListItem,
	ListItemAvatar,
	CardActions,
	Avatar,
} from '@material-ui/core'
import EcoIcon from '@material-ui/icons/Eco'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import OpacityIcon from '@material-ui/icons/Opacity'
import PlantImages from '../util/plantImage'

const useStyles = makeStyles(theme => ({
	cardImage: {
		maxWidth: 500,
		margin: '20px',
		display: 'flex',
	},
	listIcons: {
		display: 'flex',
	},
	card: {
		display: 'inline',
		margin: '20px',
	},
	thumbnail: {
		height: '350px',
		width: '100%',
	},
}))

export default function PlantData() {
	const classes = useStyles()

	const [{ data: plantData, loading: loadingPlantData }] = useAxios(
		'https://data.sfgov.org/resource/vmnk-skih.json?$select=*'
	)
	const plantList = plantData
		?.filter((e, index) => index < 12)
		.map(plants => (
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
							<Typography gutterBottom variant='h5' component='h2'>
								{plants.common_name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
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
		))

	return (
		<div>
			{loadingPlantData ? (
				<CircularProgress style={{ marginLeft: '70px', marginTop: '20px' }} />
			) : (
				<>
					<Grid item xs={6} className={classes.card}>
						{plantList}
					</Grid>
				</>
			)}
		</div>
	)
}
