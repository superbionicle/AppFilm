import React from 'react'
import {StyleSheet,FlatList} from 'react-native'
import FilmsItem from './filmsItem'
import {connect} from 'react-redux'

class FilmList extends React.Component {
   constructor(props){
      super(props)
      this.state={
         film:[]
      }
      //this.loadFilm=this.loadFilm.bind(this)
   }

   _displayDetails=(idFilm)=>{
      //console.log(idFilm)
      this.props.navigation.navigate('FilmDetail',{idFilm:idFilm})
   }

   render(){
      return(
         <FlatList
            style={styles.list}
            data={this.props.films}
            extraData={this.props.fav}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
               <FilmsItem
                  film={item}
                  isFav={(this.props.fav.findIndex(film=>film.id===item.id)!==-1)? true:false}
                  displayDetails={this._displayDetails}
               />
            )}
            onEndReachedThreshold={.5}
            onEndReached={()=>{
               if(this.props.page < this.props.totalPages){
                  this.props.loadFilm()
               }
            }}
         />
      )
   }
}

const styles= StyleSheet.create({
   list:{
      flex:1
   }
})

const map=state=>{
   return{
      fav:state.fav
   }
}

export default connect(map)(FilmList)
