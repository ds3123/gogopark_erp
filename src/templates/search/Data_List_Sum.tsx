
import React from "react" ;



// @ 資料列表筆數
const Data_List_Sum = ({ data_Sum } : { data_Sum : number }) => {

   return  <span className="tag is-medium is-rounded m_Bottom_30" style={{ float:"right" }}> &nbsp; 資料筆數 : &nbsp;
             
               <b style={{ color:"rgb(0,100,0,.8)" }}> { data_Sum } </b> &nbsp; 筆 &nbsp;&nbsp;

            </span>   

} ;

export default Data_List_Sum
       