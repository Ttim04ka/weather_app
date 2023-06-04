const initialState = {
  defaultCity:"Москва",
  data:{},
  loader:false
}

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DATA': 

      return {...state,data:{name:action.name,description:action?.weather[0].main,wind:action.wind.speed,visibility:action.visibility/1000,pressure:action.main.pressure,humidity:action.main.humidity,temp:(Math.round(action.main.temp)-273)}}

    case 'CHANGE_LOADER': 

      return {...state,loader:action.bool}
    case 'CHANGE_CITY': 
      return {...state,defaultCity: action.city}
    default:
      return state
  }
}


export const getWeatherData = city => async dispatch => {
  dispatch(changeLoager(true))
  const {main,visibility,weather,wind,name} = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d398c3a3f1085af272f2b43bcbd7d0af`)
  .then(item=>{
    if(item.status>400){
      dispatch(changeLoager(false))
      throw new Error("Мы не нашли такого города")
    }else{
      return item.json()
    }
  })
  dispatch(getDataAction(main,visibility,weather,wind,name))
  dispatch(changeLoager(false))
}

export const getDataAction=(main,visibility,weather,wind,name)=>{
  return { type: 'GET_DATA', main,visibility,weather,wind,name}
}
export const changeLoager=(bool)=>{
  return { type: 'CHANGE_LOADER', bool }
}
export const changeCityAction=(city)=>{
  return { type: 'CHANGE_CITY', city }
}