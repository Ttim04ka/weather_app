import React, { useEffect, useRef, useState, useTransition } from 'react';
import './App.scss';
import figure1 from'./img/figure1.svg'
import figure2 from'./img/figure2.svg'
import partly from'./img/partly.png'
import sunny from'./img/sunny.png'
import clouds from'./img/cloud.png'
import clear from'./img/clear.png'
import degree from'./img/the.png'
import loaderGif from'./img/loader.gif'
import {changeCityAction, getWeatherData} from './weatherReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Charactrristics } from './Characteristics';
const cities=require('./citiesData/cities.json')



const Weather=React.memo(()=>{
    
    let dispatch=useDispatch()
    let popUp=useRef()
    let inputValue=useRef()
    let [isPending,startTransition]=useTransition()


    let defaultCity=useSelector(state=>state.weatherReducer.defaultCity)
    let data=useSelector(state=>state.weatherReducer.data)
    let loader=useSelector(state=>state.weatherReducer.loader)
    let [filteredCity,setfilteredCity]=useState(<div className='nothing'>Нет результатов</div>)
    let [figure,setFigure]=useState()
    let [icon,setIcon]=useState()



    const changePopUp=()=>{
        popUp.current.classList.toggle("pop_up_active")
        inputValue.current.value=''
        setfilteredCity(<div className='nothing'>Нет результатов</div>)
    }

  
    const changeCity=()=>{
      dispatch(changeCityAction(inputValue.current.value))
      changePopUp()
    }
    

    
    const pickCity=(e)=>{
        if(e.target.classList.contains('city')) inputValue.current.value=e.target.innerHTML
        document.querySelector('.filter').hidden=true
    }


    const filterCities=()=>{
        startTransition(()=>{  
            if(cities.city.filter(item=>item.name.toLowerCase().includes(inputValue.current.value.toLowerCase())).length===0 || inputValue.current.value===''){
                setfilteredCity(<div className='nothing'>Нет результатов</div>)
            }else{
                setfilteredCity(cities.city.filter(item=>item.name.toLowerCase().includes(inputValue.current.value.toLowerCase())).map(item=><div className='city' key={item.city_id}>{item.name}</div> ))
            }
        }) 
    }


    const activeFilter=()=>{
        document.querySelector('.filter').hidden=false
    } 

    const disactiveFilter=(e)=>{
       if(e.target.classList.contains('find') || e.target.classList.contains('pop_up'))  document.querySelector('.filter').hidden=true
    } 

   
    useEffect(()=>{
      dispatch(getWeatherData(defaultCity));
    },[defaultCity])


    useEffect(()=>{
        'Clouds Rain Snow'.includes(data.description) ? setFigure(figure1) : setFigure(figure2)
    },[data])


    useEffect(()=>{
        if(data.description==='Sunny'){
            setIcon(sunny)
        }else if(data.description==='Clouds'){
            setIcon(clouds)
        }else if(data.description==='Clear'){
            setIcon(clear)
        }else if(data.description==='Partly'){
            setIcon(partly)
        }else{
            setIcon(degree)
        }
    },[data])


    return (
      <>
        {!loader ?
            <>
                <div className="container">
                    <div className='figure_container'><img className='figure' src={figure} alt="" /></div>
                    <div className="pop_up" ref={popUp} onClick={disactiveFilter}>
                        <div className="exit" onClick={changePopUp}>
                            <span className="first"></span>
                            <span className="second"></span>
                        </div>
                        <div className="find">
                            <input type="text" placeholder='Moscow' ref={inputValue} onChange={filterCities} onFocus={activeFilter} />
                             <div className="filter" onClick={pickCity} hidden>{!isPending ? (filteredCity) : "Загрузка..."} </div> 

                            <button onClick={changeCity}>OK</button>
                        </div>
                    </div>
        
                    <header>
                        <span>The Weather Today in</span>
                        <h1 onClick={changePopUp}>{data.name || defaultCity}</h1>
                    </header>

                    <section className='weather'>
                        <div className="weather_status">
                            <img src={icon} alt="я альтушка" />
                            <span>{data.description}</span>
                        </div>
                        <div className="degree">{data.temp}°</div>
                    </section>
                    
                    <Charactrristics></Charactrristics>
                </div>
            </> 
            
            :   <div className='loader_container'><img className='loader' src={loaderGif} alt="" /></div>
        }
     
      </>
        
    );
  })
  
  export default Weather;
  