window.addEventListener("load", ()=>{
    let lon  //logitud
    let lat  //latitud

    let temperaturaValor =document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            //console.log(posicion)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude


            //ubicacion actual
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=608b4fa5c0df4643a0420d0f2a6aec01`
            //console.log(url)

            //ubicacion por ciudad
            //const url = `https://api.openweathermap.org/data/2.5/weather?q=LaPlata&appid=608b4fa5c0df4643a0420d0f2a6aec01`

            fetch(url)
                .then(response => {return response.json()})
                .then(data => {
                    //console.log(data)
                    //let temp = Math.round(data.main.temp)
                    let temp = data.main.temp
                    temperaturaValor.textContent = `${temp} °C`

                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    switch(data.weather[0].main){
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thinder.svg'
                            break;
                        case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                            break;
                        case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'
                            break;
                        case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src='animated/wheater.svg'
                            break;
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            break;
                        default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
})