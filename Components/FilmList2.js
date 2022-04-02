import React from 'react'
import {StyleSheet,FlatList} from 'react-native'
import FilmsItem from './filmsItem.js'
import {connect} from 'react-redux'

class FilmList extends React.Component{
   constructor(props){
      super(props)
      this.state={
         films:[]
      }
   }

   _displayDetails=(idFilm)=>{
      //console.log("Display film"+idFilm)
      this.props.navigation.navigate('FilmDetail',{idFilm:idFilm})
   }

   render(){
      return(
         <FlatList
            style={styles.liste}
            data={this.props.films}
            extraDatas={this.props.fav}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
               <FilmsItem
                  film={item}
                  isFav={(this.props.fav.findIndex(film=>film.id===item.id)!==-1)?true:false}
                  displayDetails={this._displayDetails}
               />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={()=>{
               //console.log("this.props "+this.props)
               //console.log(this.props.loadFilm)
               //console.log(this.props.page)
               //console.log(this.props.totalPages)
               if(this.props.page<this.props.totalPages && this.props.page>0){
                  this.props.loadFilms()
               }
            }}
         />
      )
   }
}

const styles=StyleSheet.create({
   liste:{
      flex:1
   }
})

const map=(state)=>{
   return{
      fav:state.fav
   }
}

export default connect(map)(FilmList)
