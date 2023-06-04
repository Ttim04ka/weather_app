import React from 'react';
import {useSelector } from 'react-redux';
import './App.scss';
import cloud from './img/icon/cloud.png'
import gauge from './img/icon/gauge.png'
import humidity from './img/icon/humidity.png'
import uvindex from './img/icon/uvindex.png'
import visibility from './img/icon/visibility.png'
import wind from './img/icon/wind.png'



export const Charactrristics=(props)=>{
    
    let data=useSelector(state=>state.weatherReducer.data)



    return (
        
        <div className="content">
        <div className="item">
        <img src={cloud} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{Math.round(Math.random(100)*100)}%</div>
            <div className="subtitle">cloudcover</div>
        </div>
        </div>
        <div className="item">
        <img src={gauge} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{data.pressure}</div>
            <div className="subtitle">pressure</div>
        </div>
        </div>
        <div className="item">
        <img src={humidity} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{data.humidity}%</div>
            <div className="subtitle">humidity</div>
        </div>
        </div>
        <div className="item">
        <img src={uvindex} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{Math.round(Math.random(100)*10)}/10</div>
            <div className="subtitle">uv-index</div>
        </div>
        </div>
        <div className="item">
        <img src={visibility} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{data.visibility}km</div>
            <div className="subtitle">visibility</div>
        </div>
        </div>
        <div className="item">
        <img src={wind} alt="я альтушка" className="item_icon" />
        <div className="text">
            <div className="title">{Math.round(data.wind)}m/s</div>
            <div className="subtitle">wind speed</div>
        </div>
        </div>
    </div>
    )
}