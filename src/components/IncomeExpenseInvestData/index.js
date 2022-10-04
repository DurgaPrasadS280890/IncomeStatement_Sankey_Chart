import React from 'react'
import {useState,useRef} from 'react'
import "./index.css"
import {Provider, useDispatch,useSelector} from 'react-redux'
import {addGraphdata} from "../../redux/reducer"
import { useTranslation } from 'react-i18next';
import ChartEditData from '../ChartEditData'
import store from "../../redux/store"

export default function IncomeExpenseInvestData(props) {
    const { t, i18n } = useTranslation();
    const dispatch=useDispatch()
let Name=""
let Value=""

    if(props.valuetype==='income'){
        Name=t("Income")+" "+t("type")
        Value=t("Income")+" "+t("value")

    }
    if(props.valuetype==='expense'){
        Name=t("Expense")+" "+t("type")
        Value=t("Expense")+" "+t("value")

    }
    if(props.valuetype==='invest'){
        Name=t("Investment")+" "+t("type")
        Value=t("Investment")+" "+t("value")

    }

 
    const graphData =useSelector(state=>state)
  
    const ref1 = useRef(null);
    const ref2 = useRef(null);


    function addItem(e){
        let id=e.target.id
        if(ref2.current.value<=0){
            alert("Please Enter valid Value")
            ref2.current.value=""
            ref1.current.value=""
            return null
        }
        if(ref1.current.value.length<=0){
            alert("Please Enter valid Value")
            ref2.current.value=""
            ref1.current.value=""
            return null
        }
        //let detail=[]
        let obj1={}
        obj1[ref1.current.value]=ref2.current.value
      
       let temp=Object.assign(graphData)
    
       //console.log(newObj)
        //temp[id].push(obj1)
       
       // detail.push(obj1)
       // 
        //graphData[id]=[...arr]
//console.log(typeof graphData[id])



     
       // setexpense([...expense,obj1])
      dispatch(addGraphdata({id,detail:obj1}))

        ref1.current.value = '';
        ref2.current.value = '';
      
       // refInput.current.focus();
    }

  return (
    <div>
        <Provider store={store}>
        <div >
    {graphData.addGraphdata.income.length==1  && props.valuetype=="income" ? <p>{t("input_ins")}</p> :    <table>
        <tbody>
        <tr>
            <td data-testid="inputMenuName">
                {Name}
            </td>
            <td >
                <input ref={ref1} type="text"  data-testid="inputName" />
            </td>
        </tr>
        <tr>
            <td data-testid="inputMenutype">
                {Value}
            </td>
            <td>
                <input ref={ref2} type="number" data-testid="inputValue"  />
            </td>
        </tr>

        </tbody>
        </table>}
        </div>
        <div className='rightDiv'> <ChartEditData  tab={props.valuetype}/></div>
        <br></br>
        <div className='buttondiv'>
       { graphData.addGraphdata.income.length==1  && props.valuetype=="income" ? <div></div>:
       <button id={props.valuetype} onClick={(e)=>addItem(e)}>{t("add")}</button>}
        
        </div>
        </Provider>
    </div>
  )
}
