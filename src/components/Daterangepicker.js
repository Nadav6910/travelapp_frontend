import "antd/dist/antd.css"
import "../styling/rangepicker.css"
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { useState, useEffect } from "react";

export default function DateRangePicker(props) {

    const [StartDateInput, SetStartDateInput] = useState('')
    const [EndDateInput, SetEndDateInput] = useState('')

    useEffect(() => {
        props.GetDateValues(StartDateInput, EndDateInput)
    }, [props, StartDateInput, EndDateInput])

    const state = {
        heureDebut: null,
        date: [],
        heureFin: null,
        tranches: [{ datePicker: null }],
        resetSelect: false,
        Description: "",
        showConsigne: false,
        start: moment().format("DD/MM/YYYY"),
        end: moment().format("DD/MM/YYYY")
      }

      function formatDate(date) {
          
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()
    
        if (month.length < 2) 
            month = '0' + month
        if (day.length < 2) 
            day = '0' + day
    
        return [year, month, day].join('-')
    }

    function UpdateDates(value){

        let date = state.date
        date.push(value)

        try{
            let startDate = moment(formatDate(String(value[0]._d).substring(4, 15)))
            let endDate = moment(formatDate(String(value[1]._d).substring(4, 15)))

            if (formatDate(String(value[0]._d).substring(4, 15)).length < 3 || formatDate(String(value[1]._d).substring(4, 15)).length < 3){
                SetStartDateInput('')
                SetEndDateInput('')
            } else {
                SetStartDateInput(startDate)
                SetEndDateInput(endDate)
            }

            } catch {
                SetStartDateInput('')
                SetEndDateInput('')
        }
    }

    function disabledDate(current) {

        return current && current < moment().endOf('day');
      }

    const { RangePicker } = DatePicker;

    return (
        <div className="datepicker">
            <Space direction="vertical" size={12}>
                <RangePicker value={[StartDateInput, EndDateInput]} onChange={UpdateDates} disabledDate={disabledDate} size="large" className="range-picker"/>
            </Space>
        </div>
    )
}
