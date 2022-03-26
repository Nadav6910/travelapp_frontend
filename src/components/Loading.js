import "../styling/loading.css"
import { FillingBottle } from "react-cssfx-loading"

export default function Loading(){
    return (
        <div className="loading-div">
            <h4 className="loading-header">Fetching Flights From Around The World For You..</h4>
            <h6 className="loading-header">This May Take A Momonet (free api..)</h6>
            <FillingBottle color="#ED6C02" width="5rem" height="5rem"/>
        </div>
    )
}