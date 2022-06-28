
import { useEffect, useState } from 'react' ;
import { usePlan_Bath_Beauty_Num } from 'hooks/data/usePlan'


type Plan_Used_Records_Title = {

    plan_Type            : string ;
    applied_Species_Name : string ;
    data                 : any ;

} 



// @ 標題 : 方案使用紀錄
const Plan_Used_Records_Title = ( { plan_Type , applied_Species_Name , data } : Plan_Used_Records_Title ) => {


   const [ style , set_Style ] = useState( 'is-warning' ) ;
   
   
   useEffect( () => { 

      if( plan_Type === '包月洗澡' ) set_Style( 'is-success' ) ;
      if( plan_Type === '包月美容' ) set_Style( 'is-danger' ) ;
    
   } , [ plan_Type] ) ; 


   // 洗澡次數、美容次數
   const service_Num = usePlan_Bath_Beauty_Num( data ) ; 



   return   <>

                <b className={ `tag is-medium m_Bottom_30 is-rounded is-large is-light m_Top_20 ${ style }` } >

                { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                [ { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) ? '預設' : '自訂' } : { data['id'] } ] &nbsp;  

                { plan_Type }  ( { applied_Species_Name } ) 

                  
                
                </b>  


                <div className="columns is-multiline is-mobile relative m_Left_5" >

                   <div className="column is-4-desktop"> 
                           
                     <b className="tag is-white is-medium">
                        洗澡 : <b className="fBlue"> &nbsp; { service_Num['bath'] }  &nbsp;</b> 次 &nbsp;&nbsp;  
                        美容 : <b className="fBlue"> &nbsp; { service_Num['beauty'] } &nbsp;</b> 次  
                     </b>

                   </div>

                   <div className="column is-8-desktop">

                     <b className="tag is-white is-medium"> 

                        基本價格 : &nbsp; <span className="fBlue m_Right_10">    ${ data ? data['plan_basic_price'] : 0 } </span> &nbsp; &nbsp;
                        個體調整金額 : &nbsp; <span className="fBlue m_Right_10"> ${ data ? data['plan_adjust_price'] : 0 } </span> &nbsp; &nbsp;
                        接送費   : &nbsp; <span className="fBlue m_Right_30">    ${ data ? data['pickup_fee'] : 0 }        </span> &nbsp;
                        小 計    : &nbsp; <span className="fRed">                ${ data ? data['plan_fee_total'] : 0 }    </span> 

                     </b>

                   </div>

                 </div>    
   
   
   
            </>
             



} ;


export default Plan_Used_Records_Title
       