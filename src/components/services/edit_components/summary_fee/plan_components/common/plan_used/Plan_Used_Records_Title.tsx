
import { useEffect, useState } from 'react' ;


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


   return   <b className={ `tag is-medium is-rounded is-large is-light m_Top_20 ${ style }` } >

                { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                { plan_Type } ( { applied_Species_Name } ) &nbsp; &nbsp;

                <b className="tag is-white is-medium is-rounded">

                    基本價格 : &nbsp; <span className="fBlue m_Right_10">    ${ data ? data['plan_basic_price'] : 0 }  </span>
                    個體調整金額 : &nbsp; <span className="fBlue m_Right_10"> ${ data ? data['plan_adjust_price'] : 0 } </span>
                    接送費   : &nbsp; <span className="fBlue m_Right_30">    ${ data ? data['pickup_fee'] : 0 }        </span>
                    小 計    : &nbsp; <span className="fRed">                ${ data ? data['plan_fee_total'] : 0 }    </span>

                </b>

            </b>  



} ;


export default Plan_Used_Records_Title
       