import { useState } from "react"
import Button from '@mui/material/Button'

export default function Flightresults(props) {

    const [infoWindowOpen, setInfoWindowOpen] = useState(false)
    const [arrival, setArrival] = useState('')
    const [departure, setDeparture] = useState('')
    const [airport, setAirport] = useState('')
    const [airline, setAirline] = useState('')
    const [infoWndowAnimation, setInfoWndowAnimation] = useState(true)
    const [renderedResultsNumber, SetRenderedResultsNumber] = useState(20)
    const [disableBotton, SetDisableBotton] = useState(false)

    function OpenInfoWindow(e){
        //setting the state of the flihts info window based on the stop line that is clicked
        if (e.currentTarget.parentNode.querySelector('.vl2')){
          if (e.currentTarget.className === 'vl'){
            let arrival = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.arrival').textContent
            let departure = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.departure').textContent
            let airport = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.airport').textContent
            let airline = e.currentTarget.parentNode.parentNode.querySelector('.first-stop').querySelector('.airline').textContent
  
            setArrival(arrival)
            setDeparture(departure)
            setAirport(airport)
            setAirline(airline)
          }
          if (e.currentTarget.className === 'vl2'){
            let arrival = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.arrival').textContent
            let departure = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.departure').textContent
            let airport = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.airport').textContent
            let airline = e.currentTarget.parentNode.parentNode.querySelector('.second-stop').querySelector('.airline').textContent
  
            setArrival(arrival)
            setDeparture(departure)
            setAirport(airport)
            setAirline(airline)
          }      
  
        } else {
          let arrival = e.currentTarget.parentNode.querySelector('.arrival').textContent
          let departure = e.currentTarget.parentNode.querySelector('.departure').textContent
          let airport = e.currentTarget.parentNode.querySelector('.airport').textContent
          let airline = e.currentTarget.parentNode.querySelector('.airline').textContent
  
          setArrival(arrival)
          setDeparture(departure)
          setAirport(airport)
          setAirline(airline)
        }
  
        if (infoWndowAnimation === false){
          setInfoWndowAnimation(true)
        }
  
        setInfoWindowOpen(true)
        document.querySelector("body").classList.remove("unblurred-body")
        document.querySelector("body").classList.add("app-body")
      }

    function CloseInfoWindow(){
        setInfoWndowAnimation(false)
        document.querySelector("body").classList.remove("app.body")
        document.querySelector("body").classList.add("unblurred-body")
      }

    //cheaking state of flights stops info window
    function CheckAnimationState(){
        if (infoWndowAnimation === true){
          setInfoWindowOpen(true)
        } else {
          setInfoWndowAnimation(true)
          setInfoWindowOpen(false)
        }
      }

    //a function for converting two dates to a format of hours and minutes
    function msToTime(ms){
        return {
              hours: Math.trunc(ms/3600000),
              minutes: Math.trunc((ms/3600000 - Math.trunc(ms/3600000))*60) + ((ms/3600000 - Math.trunc(ms/3600000))*60 % 1 !== 0 ? 1 : 0)
            }
        }

    function GetMoreResults(){
      let resultsLeftToLoad = props.flightdata.length - renderedResultsNumber

      if (resultsLeftToLoad < 30){
        SetRenderedResultsNumber(renderedResultsNumber + resultsLeftToLoad)
        SetDisableBotton(true)
      }

      SetRenderedResultsNumber(renderedResultsNumber + 20)
    }

    function returnToSearch(){
      window.location.reload()
    }

    return (
        <div className="offers-container">
          <Button className="return-to-search-btn" onClick={returnToSearch}>Back To Search</Button>
          {/* after getting back data from api showing the whole flight results section */}
            <div className="info-window" onAnimationEnd={CheckAnimationState} style={{display: !infoWindowOpen && 'none', animationName: infoWndowAnimation ? 'popup' : 'popdown'}}>
                <p className="arrival-header">Arrival:<span className="arrival-info">{arrival}</span></p>
                <p className="departure-header">Departure:<span className="departure-info">{departure}</span></p>
                <p className="airport-header">Airport:<span className="airport-info">{airport}</span></p>
                <p className="airline-header">Airline:<span className="airline-info">{airline}</span></p>
            </div>

            {/* starting the mapping of the api data into the flight results ui */}
            {props.flightdata.reverse().slice(0, renderedResultsNumber).map(offer => {

              return <div key={offer.id} className="flight-offer">
                {/* the inbound flight section */}
                <div key={offer.slices[0].id} 
                  className={offer.slices[0].segments.length === 1 ?
                   "first-flight-container" : offer.slices[0].segments.length === 2 ?
                    "first-flight-container one-stop" : offer.slices[0].segments.length === 3 &&
                     "first-flight-container two-stops"}>

                  {/* check for how many stops there are in the inbound flight to see what data to set for the info window */}
                  {offer.slices[0].segments.length === 1 ?

                    null : 

                    offer.slices[0].segments.length === 2 ?

                    <div style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[0].segments[0].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[0].segments[1].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[0].segments[0].destination.city_name + ` (${offer.slices[0].segments[0].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[0].segments[0].operating_carrier.name}</p>
                    </div> : 
                    
                    offer.slices[0].segments.length === 3 && 

                    <div>

                      <div className="first-stop" style={{display: 'none'}}>
                        <p className="arrival">{offer.slices[0].segments[0].arriving_at.split('T')[1]}</p>
                        <p className="departure">{offer.slices[0].segments[1].departing_at.split('T')[1]}</p>
                        <p className="airport">{offer.slices[0].segments[0].destination.city_name + ` (${offer.slices[0].segments[0].destination.iata_city_code})`}</p>
                        <p className="airline">{offer.slices[0].segments[0].operating_carrier.name}</p>
                      </div>

                      <div className="second-stop" style={{display: 'none'}}>
                        <p className="arrival">{offer.slices[0].segments[1].arriving_at.split('T')[1]}</p>
                        <p className="departure">{offer.slices[0].segments[2].departing_at.split('T')[1]}</p>
                        <p className="airport">{offer.slices[0].segments[1].destination.city_name + ` (${offer.slices[0].segments[1].destination.iata_city_code})`}</p>
                        <p className="airline">{offer.slices[0].segments[1].operating_carrier.name}</p>
                      </div>

                    </div>}

                  {/* setting the time of the inbound flight departure and also fixing the date format */}
                  <span className="time-origin">{offer.slices[0].segments[0].departing_at
                  .split('T')[1].slice(0, 5) + ' ' + offer.slices[0].segments[0].departing_at
                  .split('T')[0].replace(offer.slices[0].segments[0].departing_at
                  .split('T')[0].slice(0,4), offer.slices[0].segments[0].departing_at
                  .split('T')[0].slice(2,4))}</span>

                  <span className="IATA-code-origin">{offer.slices[0].segments[0].origin.iata_city_code}</span>
                  <i className="fas fa-plane-departure"></i>
                  
                  {/* cheaking if there is one stop two stops or no stops and creating the stop line for the first flight */}
                  {offer.slices[0].segments.length === 1 ?

                    null :

                  offer.slices[0].segments.length === 2 ?

                    <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div> :

                  offer.slices[0].segments.length === 3 &&

                    <div className="vl-container">
                      <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                      <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                    </div>}

                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>

                  {/* setting the time and date for the inbound flight arrival and fixing date format */}
                  <span className="time-destenation">{offer.slices[0].segments.slice(-1)[0].arriving_at
                  .split('T')[1].slice(0, 5) + ' ' + offer.slices[0].segments.slice(-1)[0].arriving_at
                  .split('T')[0].replace(offer.slices[0].segments.slice(-1)[0].arriving_at
                  .split('T')[0].slice(0,4), offer.slices[0].segments.slice(-1)[0].arriving_at
                  .split('T')[0].slice(2, 4))}</span>

                  <span className={offer.slices[0].segments.length === 1 ? "IATA-code-destenation no-stops" : "IATA-code-destenation"}>
                    {offer.slices[0].segments.slice(-1)[0].destination.iata_city_code}
                  </span>

                  {/* cheaking how many stops are there to see what text to set as the stops info */}
                  {offer.slices[0].segments.length === 1 ?
                    <span className="flight-stops">no stop</span> :
                   offer.slices[0].segments.length === 2 ?
                    <span className="flight-stops">one stop</span> :
                   offer.slices[0].segments.length === 3 &&
                    <span className="flight-stops">two stops</span>}

                  {/* cheak if there is only one stop then apply function
                   to convert date format into hours and minutes */}
          
                  {offer.slices[0].segments.length === 1 ?
                   <span className="flight-time">
                   {msToTime(new Date(offer.slices[0].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[0].segments[0].departing_at)).hours + 'h - ' +
                    msToTime(new Date(offer.slices[0].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[0].segments[0].departing_at)).minutes + 'm'}
                    </span> : null}

                </div>

                {/* the return flight section */}
                {/* cheaking how many stops there are to see what class to give the section */}
                <div key={offer.slices[1].id} 
                  className={offer.slices[1].segments.length === 1 ?
                   "return-flight-container" : offer.slices[1].segments.length === 2 ?
                   "return-flight-container one-stop" : offer.slices[1].segments.length === 3 &&
                   "return-flight-container two-stops"}>

                {/* check for how many stops there are in the return flight to see what data to set for the info window */}
                {offer.slices[1].segments.length === 1 ?

                null :

                offer.slices[1].segments.length === 2 ?

                  <div style={{display: 'none'}}>
                    <p className="arrival">{offer.slices[1].segments[0].arriving_at.split('T')[1]}</p>
                    <p className="departure">{offer.slices[1].segments[1].departing_at.split('T')[1]}</p>
                    <p className="airport">{offer.slices[1].segments[0].destination.city_name + ` (${offer.slices[1].segments[0].destination.iata_city_code})`}</p>
                    <p className="airline">{offer.slices[1].segments[0].operating_carrier.name}</p>
                  </div> :

                offer.slices[1].segments.length === 3 &&

                  <div>
                    <div className="first-stop" style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[1].segments[0].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[1].segments[1].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[1].segments[0].destination.city_name + ` (${offer.slices[1].segments[0].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[1].segments[0].operating_carrier.name}</p>
                    </div>

                    <div className="second-stop" style={{display: 'none'}}>
                      <p className="arrival">{offer.slices[1].segments[1].arriving_at.split('T')[1]}</p>
                      <p className="departure">{offer.slices[1].segments[2].departing_at.split('T')[1]}</p>
                      <p className="airport">{offer.slices[1].segments[1].destination.city_name + ` (${offer.slices[1].segments[1].destination.iata_city_code})`}</p>
                      <p className="airline">{offer.slices[1].segments[1].operating_carrier.name}</p>
                    </div>
                  
                </div>}

                  {/* setting the time of the return flight departure and also fixing the date format */}
                  <span className="time-origin">{offer.slices[1].segments[0].departing_at
                  .split('T')[1].slice(0, 5) + ' ' + offer.slices[1].segments[0].departing_at
                  .split('T')[0].replace(offer.slices[1].segments[0].arriving_at
                  .split('T')[0].slice(0,4), offer.slices[1].segments[0].arriving_at
                  .split('T')[0].slice(2,4))}</span>

                  <span className="IATA-code-origin">{offer.slices[1].segments[0].origin.iata_city_code}</span>
                  <i className="fas fa-plane-departure"></i>

                  {/* cheaking if there is one stop two stops or no stops and creating the stop line for the return flight */}
                  {offer.slices[1].segments.length === 1 ?

                    null :

                  offer.slices[1].segments.length === 2 ?

                    <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div> :

                  offer.slices[1].segments.length === 3 &&

                    <div className="vl-container">
                      <div className="vl" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                      <div className="vl2" onMouseEnter={OpenInfoWindow} onMouseLeave={CloseInfoWindow}></div>
                    </div>}

                  <hr className="flight-line" style={{height: '3px'}}/>
                  <i className="fas fa-plane-arrival"></i>

                  {/* setting the time and date for the return flight arrival and fixing date format */}
                  <span className="time-destenation">{offer.slices[1].segments.slice(-1)[0].arriving_at
                  .split('T')[1].slice(0, 5) + ' ' + offer.slices[1].segments.slice(-1)[0].arriving_at
                  .split('T')[0].replace(offer.slices[1].segments.slice(-1)[0].arriving_at
                  .split('T')[0].slice(0,4), offer.slices[1].segments.slice(-1)[0].arriving_at
                  .split('T')[0].slice(2, 4))}</span>

                  <span className={offer.slices[1].segments.length === 1 ? "IATA-code-destenation no-stops" : "IATA-code-destenation"}>
                    {offer.slices[1].segments.slice(-1)[0].destination.iata_city_code}
                  </span>

                  {/* cheaking how many stops are there to see what text to set as the stops info */}
                  {offer.slices[1].segments.length === 1 ?
                    <span className="flight-stops">no stop</span> :
                   offer.slices[1].segments.length === 2 ?
                    <span className="flight-stops">one stop</span> :
                   offer.slices[1].segments.length === 3 &&
                    <span className="flight-stops">two stops</span>}

                  {/* cheak if there is only one stop then apply function
                   to convert date format into hours and minutes */}

                  {offer.slices[1].segments.length === 1 ?
                   <span className="flight-time">
                   {msToTime(new Date(offer.slices[1].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[1].segments[0].departing_at)).hours + 'h -' + 
                   msToTime(new Date(offer.slices[1].segments.slice(-1)[0].arriving_at) - new Date(offer.slices[1].segments[0].departing_at)).minutes + 'm'}
                   </span> : null}
                   
                </div>

                {/* the price and flight details section */}
                <div className="price-and-airline-container">
                  <p className="price-header">Price:</p>
                  <p className="price-number">{offer.base_amount === "0.00" ? offer.total_amount + '$' : offer.base_amount + '$'}</p>
                  <p className="inbound-airline">Inbound Airline:<span className="airline-span">{offer.slices[0].segments[0].operating_carrier.name}</span></p>
                  <p className="outbound-airline">Outbound Airline:<span className="airline-span">{offer.slices[1].segments.slice(-1)[0].operating_carrier.name}</span></p>
                </div>

                <hr className="offer-devider"/>
                <hr className="offer-devider-second"/>
              </div>
            })} 
            <Button className="more-results-btn" onClick={GetMoreResults} disabled={disableBotton ? true : false}>Show More Results</Button>   
          </div>
    )
}