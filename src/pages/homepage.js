import "../styling/homepage.css"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Searchinput from "../components/Searchinput"
import DateRangePicker from "../components/Daterangepicker"
import Clientnumberinput from "../components/Clientnumberinput"
import Flightresults from "./Flightresults"
import Button from '@mui/material/Button'
import Loading from "../components/Loading"
import axios from "axios"

function Homepage() {

    const [searchWidowOpen, SetSearchWidowOpen] = useState(true)
    const [flightOffersData, SetFlightOffersData] = useState([])
    const [gotFlightData, setGotFlightData] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    // const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChildArray, SetAgeOfChildArray] = useState([])
    const [StartDateInput, SetStartDateInput] = useState('')
    const [EndDateInput, SetEndDateInput] = useState('')
    const [searchInputValueFrom, SetSearchInputValueFrom] = useState('')
    const [searchInputValueTo, SetSearchInputValueTo] = useState('')

    //getting back user input of amount of passangers from child commponent
    function GetValues(NumberOfAdults, NumberOfChildren, AgeOfChildArray){
      SetNumberOfAdults(NumberOfAdults) 
      // SetNumberOfChildren(NumberOfChildren)
      SetAgeOfChildArray(AgeOfChildArray)
    }

    //getting back user input of chosen dates from child commponent
    function GetDateValues(StartDateInput, EndDateInput){
      SetStartDateInput(StartDateInput)
      SetEndDateInput(EndDateInput)
    }

    //getting back user inpt of chosen places from child commponent
    function GetPlaceValue(searchInputValueFrom, searchInputValueTo){
      SetSearchInputValueFrom(searchInputValueFrom)
      SetSearchInputValueTo(searchInputValueTo)
    }

    //sending user input to backend and getting back a flights offer response then setting it into state
    async function SendUserData(e){
      e.preventDefault()
      SetSearchWidowOpen(false)

      axios.post('http://localhost:4000/get-data', {
        NumberOfAdults,
        AgeOfChildArray,
        StartDateInput,
        EndDateInput,
        searchInputValueFrom,
        searchInputValueTo
      })
      .then(function(response) {
        SetFlightOffersData(response.data.data.offers)
        console.log(response.data);
      })

      .then(() => {
        setGotFlightData(true)
      })

      .catch(function (error) {
        console.log(error);
      })
    }
      
    return (

      <div className="homepage">
      {/* returning the main page for searching flights */}
          <Navbar/>

          {searchWidowOpen ? 
          
          <div>
            <p className="about-us">
              This is a platform for searing for flights from multiple airlines all over the world. 
              <br/>
              it was build by Nadav Shor a fullstack web developer.
              its time to look for you perfect vaction and find all the flight best options.
              <br/>
              have fun..
            </p>  

            <div className="user-flight-form">
              <form onSubmit={SendUserData} method="post">
                <Searchinput GetPlaceValue={GetPlaceValue}/>
                <DateRangePicker GetDateValues={GetDateValues}/>
                <Clientnumberinput GetValues={GetValues}/>
                <Button type="submit" className="search-btn" size="large" variant="outlined">Search</Button>
              </form>
            </div> 
          </div> : 
        
          gotFlightData ? 
          
          <Flightresults flightdata={flightOffersData}/> :

           <Loading/>}
          
          <Footer/>
        </div>
      )
}

export default Homepage