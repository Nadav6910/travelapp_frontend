/* eslint-disable no-useless-concat */
import '../styling/clientnumberinput.css'
import { useState, useEffect, useLayoutEffect } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDetectClickOutside } from 'react-detect-click-outside'

export default function Clientnumberinput(props){

    const [WindowOpen, SetWindowOpen] = useState(false)
    const [containerAnimation, SetContainerAnimation] = useState(false)
    const [agesContainerAnimation, SetAgesContainerAnimation] = useState(false)
    const [openAgeContainerIconAnimation, SetOpenAgeContainerIconAnimation] = useState('fas fa-user open-child-container-icon')
    const [fadeRemoveAdultsBtn, SetfadeRemoveAdultsBtn] = useState(false)
    const [fadeAddAdultsBtn, SetfadeAddAdultsBtn] = useState(false)
    const [fadeRemoveChildrenBtn, SetfadeRemoveChildrenBtn] = useState(false)
    const [fadeAddChildBtn, SetfadeAddChildBtn] = useState(false)
    const [containerResize, SetcontainerResize] = useState(false)
    const [enableAddChildrenOnClick, SetEnableAddChildrenOnClick] = useState(true)
    const [enableAddAdultsOnClick, SetEnableAddAdultsOnClick] = useState(true)
    const [ensableRemoveChildrenOnClick, SetEnsableRemoveChildrenOnClick] = useState(false)
    const [enableRemoveAdultOnClick, SetEnableRemoveAdultOnClick] = useState(false)
    const [showChooseChildAge, SetshowChooseChildAge] = useState(false)
    const [showChildAgesContainer, SetshowChildAgesContainer] = useState(false)
    const [showCrossSymbol, SetshowCrossSymbol] = useState(false)
    const [NumberOfAdults, SetNumberOfAdults] = useState(2)
    const [NumberOfChildren, SetNumberOfChildren] = useState(0)
    const [AgeOfChildArray, SetAgeOfChildArray] = useState([])

    useEffect(() => {
        props.GetValues(NumberOfAdults, NumberOfChildren, AgeOfChildArray)
    }, [props ,NumberOfAdults, NumberOfChildren, AgeOfChildArray])

    useLayoutEffect(() => {
        SetNumberOfChildren(AgeOfChildArray.length)
        SetOpenAgeContainerIconAnimation('fas fa-user open-child-container-icon')

        if (WindowOpen === false && AgeOfChildArray.length > 0){
            SetshowChildAgesContainer(true)
            SetAgesContainerAnimation(true)
        }

        if (showChildAgesContainer === false){
            SetEnableAddChildrenOnClick(true)
            SetfadeAddChildBtn(false)
        } 

        if (showChildAgesContainer === true && AgeOfChildArray.length > 0){
            SetAgesContainerAnimation(false)
        } else {
            SetAgesContainerAnimation(true)
        }

        if (AgeOfChildArray.length === 0) {
            SetshowChooseChildAge(false)
            SetcontainerResize(false)
            SetfadeRemoveChildrenBtn(true)
            SetEnsableRemoveChildrenOnClick(false)
        } else if (AgeOfChildArray.length > 8){
            SetfadeAddChildBtn(true)
            SetEnableAddChildrenOnClick(false)
        } else {
            SetfadeRemoveChildrenBtn(false)
            SetEnsableRemoveChildrenOnClick(true)
        }
        
        if (NumberOfAdults === 1){
            SetfadeRemoveAdultsBtn(true)
            SetEnableRemoveAdultOnClick(false)
        } else if (NumberOfAdults > 8){
            SetfadeAddAdultsBtn(true)
            SetEnableAddAdultsOnClick(false)
        } else {
            SetfadeRemoveAdultsBtn(false)
            SetEnableRemoveAdultOnClick(true)
            SetfadeAddAdultsBtn(false)
            SetEnableAddAdultsOnClick(true)
        }
    }, [fadeRemoveChildrenBtn, NumberOfAdults, NumberOfChildren, AgeOfChildArray, enableRemoveAdultOnClick, WindowOpen, showChildAgesContainer])

    const stylingForCross = `
            .cross-symbol::before,
            .cross-symbol::after {
                display: flex;
            }`

    const optionsArray = []

    for (let i = 0; i < 18; i++){
        optionsArray.push(<option key={i}>{i}</option>)
    }

    function ChangeAnimation(){
        if (containerAnimation === true){
            SetWindowOpen(false)
        }
    }

    function ChangeAgesContainerAnimation(){
        if (agesContainerAnimation === true){
            SetshowChildAgesContainer(false)
        } else {
            SetshowChildAgesContainer(true)
        }
    }

    function ChangeWindowState(){
        if (WindowOpen === false){
            SetWindowOpen(true)
            SetshowChildAgesContainer(false)
            SetContainerAnimation(false)
        } else {
            SetContainerAnimation(true)
            SetAgesContainerAnimation(true)
        }
    }

    function CloseWindowWhenNotFocused(){
        if (!WindowOpen === true){
            SetContainerAnimation(true)
            SetAgesContainerAnimation(true)
        }
    }
    
    const ref = useDetectClickOutside({
        onTriggered: CloseWindowWhenNotFocused
      });

    function DecreseNumberAdults(){
        if (NumberOfAdults > 1){
            SetNumberOfAdults(NumberOfAdults - 1)
        } 
    }

     function DecreseNumberChildren(){
        SetAgeOfChildArray(AgeOfChildArray.slice(0, -1))
        SetshowChooseChildAge(false)
        SetcontainerResize(false)
        SetfadeAddChildBtn(false)
        SetEnableAddChildrenOnClick(true)
    }

    function IncreseNumberAdults(){
        SetNumberOfAdults(NumberOfAdults + 1)
    }

    function IncreseNumberChildren(){
        SetshowChooseChildAge(true)
        SetcontainerResize(true)
        SetfadeAddChildBtn(true)
        SetEnableAddChildrenOnClick(false)
    }

    function HandleChooseAge(event){
        SetAgeOfChildArray(AgeOfChildArray.concat(event.target.value))
        SetshowCrossSymbol(false)
        setTimeout(() => {
            SetOpenAgeContainerIconAnimation('fas fa-user open-child-container-icon-animated')
        }, 300)
        SetOpenAgeContainerIconAnimation('fas fa-user open-child-container-icon')
        SetshowChooseChildAge(false)
        SetcontainerResize(false)
        SetfadeAddChildBtn(false)
        SetEnableAddChildrenOnClick(true)
    }

    function HandleDeleteAgeTag(event){
        let selectedValue = event.target.innerText
        let selectedIndex = AgeOfChildArray.indexOf(selectedValue)

        SetEnableAddChildrenOnClick(true)
        SetfadeAddChildBtn(false)

        setTimeout(() => {
            SetAgeOfChildArray(AgeOfChildArray.filter((age, index) => selectedIndex !== index))
        }, 100); 
        SetshowCrossSymbol(false)
    }

    function HandleClickOnIconForChildrenAgesContainer(){
        if (AgeOfChildArray.length === 0){
            return null
        }
        if (agesContainerAnimation === false){
            SetAgesContainerAnimation(true)
        } 
        if (agesContainerAnimation === true){
            SetAgesContainerAnimation(false)
            SetshowChildAgesContainer(true)
        }
    }

    return (

        <div ref={ref} className="client-number-container">

            <input 
                readOnly
                onBlur={CloseWindowWhenNotFocused}
                onClick={ChangeWindowState} 
                className="number-input" 
                value={NumberOfAdults + ' Adults' + '  -  ' + AgeOfChildArray.length + ' Children' }>
            </input>
            <i className="fas fa-user"></i>

            {WindowOpen && <div className="select-number-container" 
            onAnimationEnd={ChangeAnimation} style={{height: containerResize && '200px', animationName: containerAnimation && 'fade-out'}}>

                <div className="adults-span-container">
                    <p className="adults-span">Adults</p>
                    <RemoveCircleIcon 
                        onClick={enableRemoveAdultOnClick ? DecreseNumberAdults : undefined} 
                        className="remove-icon" 
                        style={{color: fadeRemoveAdultsBtn && '#d3cece', cursor: enableRemoveAdultOnClick ? 'pointer' : 'default'}} 
                        fontSize="small"/>
                        <span className="adults-selected">{NumberOfAdults}</span>
                    <AddCircleIcon 
                        style={{color: fadeAddAdultsBtn && '#d3cece', cursor: enableAddAdultsOnClick ? 'pointer' : 'default'}}
                        onClick={enableAddAdultsOnClick ? IncreseNumberAdults : undefined} 
                        className="add-icon" 
                        fontSize="small"/>
                </div>

                <hr className="line-break"/>
                <br/>
                
                <div className="children-span-container" 
                style={{top: showChooseChildAge && '18.5%', right: showChooseChildAge && '22%'}}>
                    <p className="children-span">Children</p>
                    <RemoveCircleIcon onClick={ensableRemoveChildrenOnClick ? DecreseNumberChildren : undefined} 
                        className="remove-icon" 
                        style={{color: fadeRemoveChildrenBtn && '#d3cece', cursor: ensableRemoveChildrenOnClick ? 'pointer': 'default'}} 
                        fontSize="small"/>
                        <span className="adults-selected">{AgeOfChildArray.length }</span>
                    <AddCircleIcon onClick={enableAddChildrenOnClick ? IncreseNumberChildren : undefined} 
                        className="add-icon" 
                        style={{color: fadeAddChildBtn && '#d3cece', cursor: enableAddChildrenOnClick ? 'pointer' : 'default'}} 
                        fontSize="small"/>

                    <div className="choose-child-age-container" style={{display: showChooseChildAge && 'inline'}}>
                        <br/>
                        <br/>
                        <p className="choose-age">Choose Age:</p>
                        <select value={''} className="choose-age-dropdown" onChange={HandleChooseAge}>
                            <option></option>
                            {optionsArray.map(option => {return option})}
                        </select>
                    </div>

                    
                    <div className="open-child-ages-container-icon-div" 
                    style={{top: showChooseChildAge && '0', left: showChooseChildAge && '70px'}}>
                        <i onClick={HandleClickOnIconForChildrenAgesContainer} className={openAgeContainerIconAnimation}></i>
                    </div>
                    
                    <br/>
                </div>

                <div className="chosen-children-ages-container" 
                onAnimationEnd={ChangeAgesContainerAnimation}
                style={{display: showChildAgesContainer && 'inline-grid', bottom: showChooseChildAge && '73px', animationName: agesContainerAnimation && 'fade-out-ages'}}>
                <div className="p-hr-container">
                <p className="choosen-children-p">Children Ages:</p>
                <hr className="line-break-chosen-children"/>
                </div>
                    {AgeOfChildArray.map((age, index) => {
                        return <div 
                                  className={'child-age-preview'} 
                                  onMouseEnter={() => {SetshowCrossSymbol(true)}}
                                  onMouseLeave={() => {SetshowCrossSymbol(false)}}
                                  onClick={HandleDeleteAgeTag}
                                  key={index}>
                                  <div className="cross-symbol">
                                    {showCrossSymbol && <style>{stylingForCross}</style>}
                                    <span>{age}</span>
                                  </div>
                               </div>})       
                    }
                </div>

            </div>}
        </div>
    )
}
