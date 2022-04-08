

type Sum = {
   data_Sum         : number ;   // 顯示資料筆數
   is_All_Data_Done? : boolean ; // 所有資料已下載完成‘
}

// @ 資料列表筆數
const Data_List_Sum = ( { data_Sum , is_All_Data_Done } : Sum ) => {


   return  <span className="tag is-medium is-rounded m_Bottom_30" style={{ float:"right" }}> 
   
              &nbsp; 資料筆數 : &nbsp;

              { 
                is_All_Data_Done ? 
                   <span className="fGreen"> { data_Sum }  </span> : 
                   <>  
                       <b className="fGreen"> { data_Sum } </b> &nbsp;/&nbsp; 
                       <span className="fDblue"> 取得所有資料中... </span> 
                   </> 
              }

               &nbsp;

           </span>   

} ;

export default Data_List_Sum
       