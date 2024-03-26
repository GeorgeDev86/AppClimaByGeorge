import { useState } from "react"

export const WheatherApp = () => {

    const urlBase='https://api.openweathermap.org/data/2.5/weather'    
    const API_KEY='fb53e0c4431f37d662060bdbe60252cb'
    const difKelvin=273.15

    let cod=''
    let mensaje=''

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad =(e)=>{
        setCiudad(e.target.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if (ciudad.length>0)  fetchClima()
    }

    const fetchClima=async()=>{
        try{
           const response= await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)          
           const data = await response.json()    
           setDataClima(data)
           console.log(data.cod)
           
           
        }catch(error){
            console.error('Ocurrio el siguiente problema:',error)         
        }
    }

  return (
    <div className="container">
        <h1>Aplicación de clima </h1>
        <form onSubmit={handleSubmit}>
            <input type="text" 
                name="Ciudad"
                value={ciudad}
                onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>
        {    
                  dataClima &&(                                       
                    <div>        
                        <h2>{dataClima.cod!==200? dataClima.message :''}</h2>                                                                 
                        <h2>{dataClima.cod==200? dataClima.name :''}</h2>
                        <p>Temperatura:{dataClima.cod==200? parseInt(dataClima?.main?.temp-difKelvin) +' °C' : ''}</p>
                        <p>Condición metereológica :{ dataClima.cod==200? dataClima.weather[0].description :''}</p>
                        <img src={ dataClima.cod==200? `https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png` : ''}  alt={dataClima.cod!==200? dataClima.cod :''}/>                                   
                    </div>                                
            )                                         
        }
    </div>
  )
}