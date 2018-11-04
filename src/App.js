import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      itemsWeather: [],
      Weather:[],
      inputCity: '',
      inputZip: '',
      city:'',
      zip:'',
      click: false,
      APIKEY: 'f1967d9024d5e980cd6fa6d702e815f8'
    }
  }



  handleCityChange = (e) => {
    var cityName = e.target.value;
    this.setState({inputCity:cityName})
  }


  handleZipChange = (e) => {
    var zipName = e.target.value;
    this.setState({inputZip:zipName})
  }

  getWeather = (e) => {
    this.setState({
      city:this.state.inputCity,
      zip:this.state.inputZip,
      click:true
    })
  }




  componentDidUpdate(prevState) {
    if(this.state.click && (this.state.city !== '' || this.state.zip !== '' ) ){
    fetch("https://api.openweathermap.org/data/2.5/weather?zip="+this.state.zip+"&q="+this.state.city+"&units=imperial&APPID="+this.state.APIKEY+"").then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            itemsWeather: result,
            click:false,
            city:'',
            error:result.message,
            zip:'',
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error,
            items:'',
            click:false
          });
        }
      )
  }
    }

  render() {
    function getPicture(y){
      if(y.weather !== undefined){
      console.log(y.weather[0].main)
      if(y.weather[0].main === 'Rain'){
       return <div className='weather-rain-picture'></div>
      }else if(y.weather[0].main === 'fog'){
        return <div className='weather-fog-picture'></div>
      }else if(y.weather[0].main === 'Clear'){
        return <div className='weather-partlySunny-picture'></div>
      }else if(y.weather[0].main === 'Clouds'){
       return <div className='weather-cloudy-picture'></div>
      }
    }
    }

 function getWeatherValue(x){
    if(x.isLoaded && (x.itemsWeather.main !== null && x.itemsWeather.main!== undefined)){
        console.log(x.itemsWeather.main)
      var descrArr = Object.keys(x.itemsWeather.main);
      var obj = descrArr.map(function(value){
        return [x.itemsWeather.main[value],[value]]
      })
      console.log(x)
        return( 
          <div>
            <div className='response'>            
              <h1>Description</h1>
              <p className='text-desc'>{x.itemsWeather.weather[0].description}</p>
            </div>
            <div className='response'>            
              <h1>Temperature:</h1>
              <p className='text-desc'>{obj[0][0]}</p>
            </div>
            <div className='response'>            
              <h1>Pressure</h1>
              <p className='text-desc'>{obj[1][0]}</p>
            </div>
            <div className='response'>            
              <h1>Humdity:</h1>
              <p className='text-desc'>{obj[2][0]}</p>
            </div>
            <div className='response'>            
              <h1>Temperature Max:</h1>
              <p>{obj[3][0]}:</p>
            </div>
          </div>
          )
    }else{
      return(
          <div className='response'>            
            <h1>{x.error}</h1>
          </div>
          )
  }
 }
    return (
      <div id='background' className="background-container">
        <div className='weather-app-container'>
          <div className="weather-app">
            <div className='insertInfo'>
              <input type='text' placeholder='City' onChange={this.handleCityChange} className='left'/>
              <input type='text' placeholder='Zip' onChange={this.handleZipChange} className='right'/>
              <button id='getWeatherButton' onClick={this.getWeather} className='weather-button'>Get Weather</button> 
            </div>
            <div id="result" className='results'>
            {getWeatherValue(this.state)}
              
            </div>
          </div>
          {getPicture(this.state.itemsWeather)}
        </div>
      </div>
    );
  }
}

export default App;
