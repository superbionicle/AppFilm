import React from 'react'
import {StyleSheet,Share,TouchableOpacity,View,Text,ActivityIndicator,ScrollView,Image,FlatList,Button,onPress} from'react-native'
import {getDetailAPI} from '../API/TMDBApi.js'
import {getImageAPI} from '../API/TMDBApi.js'
import {connect} from 'react-redux'
import Shrink from '../Animations/Shrink.js'
//import toggleFav from '../Store/Reducers/fav.js'

class FilmDetail extends React.Component{

   static navigationOptions=({navigation})=>{
      const {params}=navigation.state
      if(params.film!=undefined){
         return{
            headerRight:<TouchableOpacity
               style={styles.share}
               onPress={()=>params.share()}>
               <Image
                  style={styles.share_image}
                  source={require('../share.png')}
               />
            </TouchableOpacity>
         }
      }
   }

   constructor(props){
      super(props)
      this.state={
         film:undefined,
         isLoading:true
      }
      this._share=this._share.bind(this)
      this._toggleFav=this._toggleFav.bind(this)
   }

   _updateNavigationParams(){
      this.props.navigation.setParams({
         share:this._share,
         film:this.state.film
      })
   }

   componentDidMount(){
      const favFilmIndex=this.props.fav.findIndex(item=>item.id===this.props.navigation.state.params.idFilm)
      if(favFilmIndex!==-1){
         this.setState({
            film:this.props.fav[favFilmIndex]
         },()=>{this._updateNavigationParams()})
         return
      }
      this.setState({isLoading:true})
      console.log("this...idFilm "+this.props.navigation.state.params.idFilm)
      getDetailAPI(this.props.navigation.state.params.idFilm).then(data=>{
         this.setState({
            film:data,
            isLoading:false
         },()=>{this._updateNavigationParams()})
      })
      //const test=0
      //console.log("test "+test)
      //console.log("shouldLarge "+shouldLarge)
   }

   _toggleFav(){
      const action={type:"TOGGLE_FAVORITE",value:this.state.film}
      //console.log("toggle fav "+this.state.film)
      this.props.dispatch(action)
   }

   componentDidUpdate(){
      //console.log(this.props.fav)
   }

   _displayFav(){
      var source=require('../unfav.png')
      var shouldLarge=false
      if(this.props.fav.findIndex(item=>item.id==this.state.film.id)!==-1){
         source=require('../fav.png')
         shouldLarge=true
      }
      //console.log("_displayFav shouldLarge : "+shouldLarge)
      var size_change=0
      if(shouldLarge){
         size_change=80
      }
      else{
         size_change=40
      }
      //console.log("test "+test)
      //console.log("width "+styles.fav)
      return(
         <Shrink shouldLarge={shouldLarge}>
            <Image
               source={source}
               style={{margin:10,width:size_change,height:size_change}}
            />
         </Shrink>
      )
   }

   _share(){
      const {film} = this.state
      Share.share({title:film.title,message:film.overview})

   }

   _displayFilm(){
      const film=this.state.film
      //console.log(this.state.film)
      //console.log(this.props)
      if(film!=undefined){
         return(
            <ScrollView style={styles.scrollcontent}>
               <Image
                  style={styles.image}
                  source={{uri:getImageAPI(film.backdrop_path)}}
               />
                  <Text style={styles.premier}>Titre : {film.title}</Text>
                  <TouchableOpacity style={styles.bouton} onPress={()=> this._toggleFav()}>
                     {this._displayFav()}
                  </TouchableOpacity>

               <Text></Text>
               <View style={styles.second}>
                  <Text style={styles.texte} >{film.overview}</Text>
               </View>
               <Text></Text>
               <View style={styles.troisieme}>
                  <Text style={styles.texte}>Date de sortie : {film.release_date}</Text>
                  <Text style={styles.texte}>Genre(s) : {film.genres.map(function(genre){return(genre.name)}).join(" / ")}</Text>
                  <Text style={styles.texte}>Note : {film.vote_average}</Text>
                  <Text style={styles.texte}>Nombres de votes : {film.vote_count}</Text>
               </View>

               <Text></Text>

               <View style={styles.quatrieme}>
                  <Text style={styles.texte}>Budget : {film.budget}$</Text>
                  <Text style={styles.texte}>Companie(s) : {film.production_companies.map(function(production_companies){return(production_companies.name)}).join(" / ")}</Text>
               </View>

            </ScrollView>
         )
      }
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

   render(){
      const idFilm = this.props.navigation.state.params.idFilm

      return(
         <View style={styles.maincontent} /*onPress={()=>displayDetails(film.id)}*/ >
            {this._displayFilm()}
            {this._displayLoading()}
         </View>
      )
   }
}

const styles=StyleSheet.create({
   maincontent:{
      flex:1,
		backgroundColor:'#00b159',
		marginBottom:10,
		marginTop:10,
		marginLeft:10,
		marginRight:10
   },
   premier:{
      flex:1,
      marginTop:5,
      marginBottom:5,
      marginLeft:5,
      marginRight:5,
      backgroundColor:'#00aedb'
   },
   second:{
      flex:1,
      marginTop:5,
      marginBottom:5,
      marginLeft:5,
      marginRight:5,
      backgroundColor:'#f1bebe'
   },
   troisieme:{
      backgroundColor:'#00d159',
		marginBottom:10,
		marginTop:10,
		marginLeft:10,
		marginRight:10
   },
   quatrieme:{
      backgroundColor:'#00c159',
		marginBottom:10,
		marginTop:10,
		marginLeft:10,
		marginRight:10
   },
   scrollcontent:{
      flex:1
   },
   load:{
		position:'absolute',
		left:0,
		right:0,
		top:100,
		bottom:0,
		alignItems:'center',
		justifyContent:'center'
	},
   image:{
   		flex:1,
   		//justifyContent:'flex-start',
   		backgroundColor:"#00aedb",
   		marginLeft:2,
   		marginTop:1,
   		marginBottom:1,
   		marginRight:2
   },
   texte:{
		marginBottom:10,
		marginTop:10,
		marginLeft:10,
		marginRight:10
   },
   image:{
      flex:1,
      height:170,
      margin:5
   },
   titre:{
      flex:1,
      backgroundColor:'grey'
   },
   bouton:{
      alignItems:'flex-end',
      marginRight:15
   },
   fav:{
      //flex:1,
      //width:test,
      //height:test,
      //margin:10,
      //alignItems:'center'
   },
   share_image:{
      width:30,
      height:30
   },
   share:{
      marginRight:8
   }
})

const map=(state)=>{
   return{
      fav:state.fav
   }
}
export default connect(map)(FilmDetail)
