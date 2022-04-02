
const init={fav:[]}

function toggleFav(state=init,action){
   let next
   switch(action.type){
      case 'TOGGLE_FAVORITE':
         const favIndex=state.fav.findIndex(item=>item.id === action.value.id)
         if(favIndex!==-1){
            //Suppression
            next={
               ...state,
               fav:state.fav.filter((item,index)=>index !==favIndex)
            }
         }
         else{
            //Ajout
            next={
               ...state,
               fav:[...state.fav,action.value]
            }
         }
         return(next||state)
      default:
      return(state)
   }
}

export default toggleFav
