import React from 'react'
import {Animated} from 'react-native'

class Shrink extends React.Component{
   constructor(props){
      super(props)
      this.state={
         viewSize: new Animated.Value(this._getSize())
      }
      //console.log("_getSize "+this._getSize())
   }

   _getSize(){
      if(this.props.shouldLarge){
         //console.log("return 80")
         return 80
      }
      //console.log("return 40")
      return 40
   }

   componentDidUpdate(){
      Animated.spring(
         this.state.viewSize,
         {
            toValue:0,
            useNativeDriver:false
         }
      ).start()
   }

   render(){
      //console.log("this.state.viewSize "+this.state.viewSize)
      //console.log("this.viewSize "+this.viewSize)
      //console.log("this._getSize "+this._getSize())
      return(
         <Animated.View
         style={{width:this._getSize(),height:this._getSize()}}>
         {this.props.children}
         </Animated.View>
      )
   }
}

export default Shrink
