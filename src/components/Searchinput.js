import "../styling/searchinput.css"
// import { usePlacesWidget } from "react-google-autocomplete";
import { useState,useEffect } from "react";
import $ from "jquery"

export default function Searchinput(props) {

    
    const [searchInputValueFrom, SetSearchInputValueFrom] = useState('')
    const [searchInputValueTo, SetSearchInputValueTo] = useState('')

   useEffect(() => {
     $.getJSON(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_GEOLOCATION_API_KEY}`, function(data) {
         if (data.country === "Israel") {
            SetSearchInputValueFrom("tel aviv, israel")
         } else {
             SetSearchInputValueFrom(data.city + ', ' + data.country)
         }})
    }, [])

    useEffect(() => {
        props.GetPlaceValue(searchInputValueFrom, searchInputValueTo)
    }, [props, searchInputValueFrom, searchInputValueTo])

    // const { ref: fromRef } = usePlacesWidget({
    //     language: "en",
    //     apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     onPlaceSelected: (place) => SetSearchInputValueFrom(place.formatted_address)
    //   })
 
    // const { ref: toRef } = usePlacesWidget({
    //     language: "en",
    //     apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     onPlaceSelected: (placeTo) => SetSearchInputValueTo(placeTo.formatted_address)
    // })

    function DeleteTextFrom(){
        SetSearchInputValueFrom('')
    }

    function DeleteTextTo(){
        SetSearchInputValueTo('')
    }

    return (
        <div className="search-input-container">
            <input onChange={e => SetSearchInputValueFrom(e.target.value)} 
            value={searchInputValueFrom} 
            className="search-input-from" 
            // ref={fromRef} 
            placeholder="From.." required></input>
            {searchInputValueFrom.length > 0 ? <i onClick={DeleteTextFrom} className="fas fa-times-circle"></i> : <i className="fas fa-plane-departure"></i>}

            <input onChange={e => SetSearchInputValueTo(e.target.value)} 
            value={searchInputValueTo} 
            className="search-input-to" 
            // ref={toRef}
            placeholder="To.." required></input>
            {searchInputValueTo.length > 0 ? <i onClick={DeleteTextTo} className="fas fa-times-circle"></i> : <i className="fas fa-plane-arrival" style={{'left': '-2px'}}></i>}
        </div>
        
    )
}
