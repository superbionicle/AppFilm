import React from 'react'
import {StyleSheet,Text} from 'react-native'
import FilmList from './FilmList.js'
import {connect} from 'react-redux'

class fav extends React.Component{
   render(){
      return(
         <FilmList
            films={this.props.fav}
            navigation={this.props.navigation}
            favList={true}
         />
      )
   }
}

const styles=StyleSheet.create({

})

const map=state=>{
   return{
      fav:state.fav
   }
}

export default connect(map)(fav)
