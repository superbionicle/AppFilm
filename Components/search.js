import React from 'react'
import {FlatList,StyleSheet,View, Button, TextInput,Text,ActivityIndicator} from 'react-native'
//import films from '../Helpers/filmsData.js'
import FilmList from './FilmList2.js'
import FilmItem from './filmsItem.js'
import {getFilmAPI} from '../API/TMDBApi.js'


class Recherche extends React.Component{

	_displayDetails=(idFilm)=>{
		//console.log("Id : "+idFilm)
		this.props.navigation.navigate("FilmDetail",{idFilm:idFilm})
	}

	constructor(props){
		super(props)
		this.recherche=""
		this.page=0
		this.totalPages=0
		this.state={
			films:[],
			isLoading:false
		}
		this._loadFilms=this._loadFilms.bind(this)
	}

	_displayLoading(){
		if(this.state.isLoading){
			return(
				<View style={styles.load}>
					<ActivityIndicator size='large'/>
				</View>
			)
		}
	}

	_loadFilms(){
		if(this.recherche.length>0){
			("this.recherche "+this.recherche)
			//console.log("this.recherche.length "+this.recherche.length)
			this.setState({isLoading:true})
			getFilmAPI(this.recherche,this.page +1).then(data=>{
				this.page=data.page
				this.totalPages=data.total_pages
				//{console.log("_loadFilms page "+this.page)}
				//{console.log("_loadFilms totalPages "+this.totalPages)}

				this.setState({
					films:[...this.state.films,...data.results],
					isLoading:false
				})
			})
		}
	}

	_searchFilms(){
		this.page=0
		this.totalPages=0
		//{console.log("_searchFilms page "+this.page)}
		//{console.log("_searchFilms totalPages "+this.totalPages)}

		this.setState({
			films:[]},
			()=>{this._loadFilms()}
		)
	}

	_searchTextInputChanged(text){
		this.recherche=text
	}

	render(){
		//{console.log("RENDER")}
		//console.log(this.state)
		return(
			<View style={styles.maincontent}>
				<TextInput
					style={styles.textinput}
					placeholder='Titre'
					onChangeText={(text)=>this._searchTextInputChanged(text)}
					onSubmitEditing={()=>this._searchFilms()}
				/>
				<Button title='Recherche' onPress={()=>this._searchFilms()}/>
				<FilmList
					films={this.state.films}
					navigation={this.props.navigation}
					loadFilms={this._loadFilms}
					page={this.page}
					totalPages={this.totalPages}
					favList={false}
				/>
				{this._displayLoading()}
			</View>
		)
		/*return(
			<View style={styles.maincontent}>
				<TextInput
				onSubmitEditing={()=>this._searchFilms()}
				onChangeText={(text)=>this._searchTextInputChanged(text)}
				style={styles.textinput}
				placeholder = "Titre"
				/>
				<Button title="Rechercher" onPress={()=>this._searchFilms()}/>
				<FlatList

					data={this.state.films}
					extraData={this.props.fav}
					keyExtractor={(item)=>item.id.toString()}
					renderItem={({item})=><FilmItem film={item} displayDetails={this._displayDetails}/>}
					onEndReachedThreshol={0.5}
					onEndReached={()=>{
						if(this.page<this.totalPages){
							this._loadFilms()
						}
						//console.log("onEndReached")
					}}
				 />
				 {this._displayLoading()}
				</View>*/
				/*<FilmList
					films={this.state.films}
					navigation={this.props.navigation}
					loadFilms={this._loadFilms}
					page={this.page}
					totalPages={this.totalPages}
				/>
				{this._displayLoading}*/
			//</View>

				/*
			</View>*/
	}
}

const styles=StyleSheet.create({
	maincontent:{
		flex:1
	},
	textinput:{
		marginLeft:5,
		marginRight:5,
		height:50,
		borderColor:'#000000',
		borderWidth:1,
		paddingLeft:5
	},
	load:{
		position:'absolute',
		left:0,
		right:0,
		top:100,
		bottom:0,
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Recherche
