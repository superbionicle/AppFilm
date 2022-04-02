const API_TOKEN = "4d781f1f387d120f19d4a5d4db84d7da"

export function getFilmAPI(text,page){
   const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr&query='+text+"&page="+page
   return fetch(url)
      .then((response)=>response.json())
      .catch((error)=>console.log(error))
}

export function getImageAPI(name){
   return 'https://image.tmdb.org/t/p/w300'+name
}

export function getDetailAPI(id){
   const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_TOKEN+'&language=fr'
   return fetch(url)
      .then((response)=>response.json())
      .catch((error)=>console.log(error))
}
