import React, { useEffect, useState } from 'react'
import './style.css'

export default function Weather(){
    
    const [temperature, setTemp] = useState(null)
    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("Pune")

    useEffect(()=>{
        const fetchApi = async () => {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&units=metric&appid=783f78c6929a7100c2737e614bb86eb0';
            const responce = await fetch(url);
            // console.log(responce)
            const resJson = await responce.json();
            console.log(resJson);
            setCity(resJson.sys);
            setTemp(resJson.main);
        }
        fetchApi()
    },[search])

    return(
        <div className='weather'>
            <div className='container'>
                <div className='box'>
                    <div className='inputData'>
                        <input
                            type='search'
                            value={search}
                            onChange={(e) => {setSearch(e.target.value)}}
                        />
                    </div>
                    {
                        !temperature ? (
                            <p className='errorMsg'>No Data Found</p>
                        ):(
                            <div>
                                <div className='info'>
                                    <div className='temp'>
                                        <h1>{temperature.temp}<sup>°C</sup></h1>
                                        <p>Feels like {temperature.feels_like}<sup>°C</sup></p>
                                    </div>
                                    <h3>
                                        {search}, {!city ? <p></p> : city.country}
                                    </h3>
                                    <h4>
                                        Min : {temperature.temp_min}° | Max : {temperature.temp_max}°
                                    </h4>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='border'></div>
                {
                    !temperature ? (
                        <div className='addInfo'>
                            <h5>
                                Humidity : <span>N/A</span>
                            </h5>
                            <h5>
                                Pressure : <span>N/A</span>
                            </h5>
                        </div>
                    ):(
                        <div className='addInfo'>
                            <h5>
                                Humidity : <span>{temperature.humidity}</span>
                            </h5>
                            <h5>
                                Pressure : <span>{temperature.pressure}</span>
                            </h5>
                        </div>
                    )
                }
                <div>
                    <div className='wave one'></div>
                    <div className='wave two'></div>
                    <div className='wave three'></div>
                </div>
                <footer>
                    <a href='https://openweathermap.org/' target='_blank' rel="noreferrer"><p>openweathermap.org</p></a>
                </footer>
            </div>
        </div>
    )
}
