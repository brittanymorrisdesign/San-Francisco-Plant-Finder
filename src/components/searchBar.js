import React from 'react'
import { InputBase, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
	searchBar: {
		backgroundColor: '#f5f3ec',
		flexBasis: '420px',
		paddingLeft: '30px',
		borderRadius: '30px 30px 30px 30px',
		padding: '15px',
		margin: '0 auto',
		marginTop: '30px',
		width: '70%',
	},
	searchIcon: {
		float: 'right',
		color: '#DDDDDD',
		padding: '5px 5px 10px 10px',
	},
}))

const SearchBar = props => {
	const classes = useStyles()

	return (
		<div className={classes.searchBar}>
			<InputBase
				type='text'
				onChange={e => props.onSearch(e.target.value)}
				value={props.value}
				placeholder='Search for Plants..'
			/>
			<SearchIcon className={classes.searchIcon} />
		</div>
	)
}

export default SearchBar
