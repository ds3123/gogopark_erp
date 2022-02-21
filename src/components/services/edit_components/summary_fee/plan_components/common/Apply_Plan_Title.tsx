
import { FC } from 'react' ;
import { useSelector } from 'react-redux'


type title = {

    register : any

}



// @ 標題 : 客戶、寵物、此次價格
const Apply_Plan_Title : FC< title > = ( { register } ) => {


   // 目前客戶區，所選擇或填入 : 客戶姓名 
   const current_Customer_Name = useSelector( ( state : any ) => state.Customer.Current_Customer_Name ) ; 
  
   // 目前在寵物區，所點選寵物資料
   const current_Pet           = useSelector( ( state : any ) => state.Pet.current_Pet ) ;                


   return  <span className="tag is-large is-white m_Bottom_10">

             <b> 
                客戶     : <span className="fDred"> { current_Customer_Name ? current_Customer_Name : '' } </span> /
                寵物     : { current_Pet ?
                            <span className="fDred"> { current_Pet['name'] } ( { current_Pet['species'] } ) </span> :
                            <span className="fRed"> 尚未選擇品種  </span>
                        }  /
                此次價格 : <input type="number relative" { ...register( "current_Plan_Used_Fee" ) } className="input" style={{ width:"80px" , top:"-5px" }} /> 元
             </b> <br/>

           </span>

} ;


export default Apply_Plan_Title
       