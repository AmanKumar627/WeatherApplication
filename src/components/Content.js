import React, { Component } from 'react';
import { getWeather } from '../api/Api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import './weather.css';
import { margin } from '@mui/system';
const initialState = {
  date: '',
  min: '',
  max: '',
  ready: false,
  convter:"F",
  airQuality:''
};
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setWeather(currentCity) {
    getWeather(currentCity)
      .then((res) => {
        console.log(res)
        const date = new Date(res.DailyForecasts[0].Date);
        const weather = res.DailyForecasts[0].Temperature;
        const text =res.DailyForecasts[0].Day.IconPhrase;
        const min = weather.Minimum.Value
        const max = weather.Maximum.Value
        this.setState({
          date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `,
          min,
          max,
          ready: true,
          airQuality:text
        });
      });
  }
  reset() {
    this.setState(initialState);
  }
  celciusConverter(degre) {
    console.log(degre, 'data')
    const c = (parseInt(degre) - 32) * 5 / 9;
    const celciusvalue=Math.trunc( c );
    this.setState({
      max:celciusvalue,
      convter:(this.state.convter=="F"? "C":"F")

    })
    //return c.toFixed();
    

    
  }
  render() {
    if (this.state.ready) {
      return (
        <Card  className='Card' sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} variant="h1" color="text.secondary">
        <svg class="weather-icon" data-src="/images/weathericons/5.svg" viewBox="0 0 288 288" width="88" height="88"><g stroke-width="9.6" fill="none" fill-rule="evenodd"><path d="M156 36v48M12 180h48M223.872 112.128l33.936-33.936M88.128 112.128 54.192 78.192M122.4 248.928h67.2c32.168-15.65 49.27-51.44 41.24-86.3-8.03-34.86-39.066-59.56-74.84-59.56s-66.81 24.7-74.84 59.56c-8.03 34.86 9.072 70.65 41.24 86.3Z" stroke="#FF8700"></path><path d="M275.856 248.928H36M132 180h144M36 213.6h143.952" stroke="#BABABA"></path></g></svg><h1 onClick={(e)=>this.celciusConverter(this.state.max)}>{this.state.max}*{this.state.convter}</h1>
        </Typography>
        
      </CardContent>
      <Typography className='currenWeather' variant="body2">
        CURRENT WEATHER
        </Typography>
      <Typography underline="always" className='Action'>
      <Link href="#" underline="always"   color="inherit"><span> Reel Feel Shade </span><span style={{marginLeft: '50px'}}> 39*C </span> </Link>
      </Typography>
      <Typography className='airQuality'>
      <Link href="#" underline="always"  color="inherit"><span className="airQualitydata"> Air Quality </span><span style={{marginLeft: '20px'}} underline="always">{this.state.airQuality} </span> </Link>
      </Typography>
      <Typography className='wind'>
      <Link href="#" underline="always" color="inherit"> Wind <span underline="always" style={{marginLeft: '89px'}} className=""> WNW 15km/h </span></Link>
      </Typography>
      <Typography className='windgust'>
      <Link href="#" underline="always" color="inherit"> Wind Gust</Link><span style={{marginLeft: '50px'}} className=""> 20 km/h </span>
      </Typography>
      <Typography className='hazy'  variant="body2">
       Hazy Sunshine
      </Typography>
      <CardActions className='moreDetails'>
        <Button size="small">More Details</Button>
      </CardActions>
    </Card>
      );
    }

    return null;
  }
}

export default Content;
