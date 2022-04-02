import React from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'
import films from '../Helpers/filmsData.js'
import {getImageAPI} from '../API/TMDBApi.js'
import {connect} from 'react-redux'
import FadeIn from '../Animations/FadeIn.js'

/*_displayFav(){
}*/



class FilmsItem extends React.Component{
	_displayFav(){
		//var source=require('../unfav.png')
		if(this.props.fav.findIndex(item=>item.id==this.props.film.id)!==-1){
			var source=require('../fav.png')
		return(
			<Image
				source={source}
				style={styles.keur}
			/>
		)
		}
	}

	render(){
		{/*console.log(this.props)*/};
		const film=this.props.film
		const displayDetails = this.props.displayDetails
		// const {film,displayDetails} = this.props
		return(
			<FadeIn>
				<TouchableOpacity
				onPress={()=>{displayDetails(film.id)}}
				style={styles.maincontent}>
					<Image style={styles.image} source={{uri:getImageAPI(film.poster_path)}}/>
					<View style={styles.secondcontent}>
						<View style={styles.topcontent}>
						<View>
						{this._displayFav()}
						</View>
							<View style={styles.title_text}>
								<Text style={styles.text}>{film.title}</Text>
							</View>
							<View style={styles.title_note}>
								<Text style={styles.text}>{film.vote_average}</Text>
							</View>
						</View>
						<View style={styles.botcontent}>
							<View style={styles.description}>
								<Text style={styles.text} numberOfLines={6}>{film.overview}</Text>
							</View>
							<View style={styles.sortie}>
								<Text style={styles.text}>Sortie le {film.release_date}</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</FadeIn>
			)
	}
}

const styles = StyleSheet.create({
	maincontent:{
		flexDirection:'row',
		height:190,
		backgroundColor:'#00b159',
		marginBottom:10,
		marginTop:10,
		marginLeft:10,
		marginRight:10
	},
	secondcontent:{
		flex:5,
		flexDirection:'column'
	},
	topcontent:{
		flexDirection:'row',
		flex:.3
	},
	botcontent:{
		flex:1
	},
	text:{
		marginLeft:2,
		marginRight:2,
		marginTop:2,
		marginBottom:2
	},
	title_text:{
		flex:3,
		flexWrap:'wrap',
		flexDirection:'row',
		backgroundColor:'#EE6600',
		marginLeft:5,
		marginRight:5,
		marginTop:5,
		marginBottom:5
	},
	title_note:{
		flex:1,
		backgroundColor:'#ee6600',
		marginLeft:5,
		marginRight:5,
		marginTop:5,
		marginBottom:5
	},
	image:{
		flex:3,
		justifyContent:'flex-start',
		backgroundColor:"#00aedb",
		marginLeft:2,
		marginTop:1,
		marginBottom:1,
		marginRight:2
	},
	description:{
		flex:4,
		backgroundColor:"#f1bebe",
		marginLeft:3,
		marginTop:1,
		marginBottom:5,
		marginRight:3
	},
	sortie:{
		flex:1,
		backgroundColor:"#672ed7",
		marginLeft:3,
		marginTop:2,
		marginBottom:5,
		marginRight:3
	},
	keur:{
		flex:1,
		height:40,
		width:40
	}
})

const map=(state)=>{
   return{
      fav:state.fav
   }
}
export default connect(map)(FilmsItem)

//export default FilmItem
