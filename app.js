window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let iconholder=document.querySelector('img')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position)
            long=position.coords.longitude //ctrl+space gives you the info you want after coords. 
            lat=position.coords.latitude


            const proxy='https://cors-anywhere.herokuapp.com/'
            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8b320cdc807665b0e3df737f8b6fe063`

            fetch(api)
                .then(response=>{
                    return response.json()
                })
                .then(data=>{
                    console.log(data)
                    const {temp}=data.main //same as data.main.temp
                    const {description, icon}=data.weather[0]
                    temperatureDegree.textContent=temp;
                    temperatureDescription.textContent=description
                    locationTimezone.textContent=data.sys.country;
                    
                    setIcons(icon)
                    
                });

        });
    }else{
        h1.textContent='Your browser does not support this'
    }
    function setIcons(icon){
        newicon=`http://openweathermap.org/img/wn/${icon}@2x.png`
        iconholder.src=newicon 
    }

  
})

