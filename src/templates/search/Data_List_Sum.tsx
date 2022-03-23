

type Sum = {
   data_Sum      : number ; // 顯示資料筆數
   all_Data_Sum? : number ; // 所有資料筆數
}

// @ 資料列表筆數
const Data_List_Sum = ( { data_Sum , all_Data_Sum } : Sum ) => {


   return  <span className="tag is-medium is-rounded m_Bottom_30" style={{ float:"right" }}> 
   
              &nbsp; 資料筆數 : &nbsp;
             
              <b className="fGreen"> { data_Sum } </b> &nbsp;/&nbsp; 
 
              { all_Data_Sum === 0 ? 
                      <span className="fDblue"> 取得所有資料中... </span> :
                      <span className="fGreen"> { all_Data_Sum } </span> } 
               &nbsp;

           </span>   

} ;

export default Data_List_Sum
       