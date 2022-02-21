
import React, { FC , useState , useEffect } from "react"
import { Edit_Form_Type } from "utils/Interface_Type";
import { Input } from "templates/form/Input";

import moment from "moment"


type species = {

    data?              : any ;

}

type Price = Edit_Form_Type & species ;


{ /* 其他表單欄位  */ }
const Other_Form : FC<Price> = ( { register  , errors , setValue , current , data } ) => {

   
    const current_Time = moment( new Date() ).format( 'YYYY-MM-DD HH:mm' ) ;


    // 【 for 編輯 】
    useEffect(( ) : any => {

      
    } ,[ current ] ) ;


   return <>

            <label className="label relative" style={{ fontSize : "1.3em" }} >
               <i className="fas fa-money-check-alt"></i> &nbsp; 收支資料
            </label> <br/>

            <div className="columns is-multiline  is-mobile">

                { /* 服務類別 */ }
                <div className="column is-2-desktop required">

                    <p> 支出類別 &nbsp; <b style={{ color: "red" }}> { errors.other_Type?.message } </b></p>

                    <div className="control has-icons-left">

                        <div className="select">
                            <select { ...register("other_Type") } >
                              <option value="請選擇">請選擇</option>
                              <option value="收入">收入</option>
                              <option value="支出">支出</option>
                            </select>
                        </div>

                        <div className="icon is-small is-left"> <i className="fas fa-globe"></i> </div>

                    </div>

                </div>

                <Input type="text" name="other_Item" label="收支項目" register={register} error={ errors.other_Item } icon="fas fa-list" asterisk={true} columns="5" />
                
                <Input type="number" name="other_Amount" label="收支金額" register={register} error={ errors.other_Amount } icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                <div className="column is-3-desktop ">
                   <p> 新增時間 &nbsp; </p> 
                   <b className="relative" style={{top:"5px"}}>   { current_Time }  </b> 
                </div>

            </div>

          </>


};

export default Other_Form



