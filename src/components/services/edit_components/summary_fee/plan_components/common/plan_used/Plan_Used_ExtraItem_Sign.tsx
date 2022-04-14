

import { useEffect, useState } from 'react' ;
import axios from 'utils/axios';



// @ 標示 : 方案是否有使用 "加價項目"
const Plan_Used_ExtraItem_Sign = ( { plan } : { plan : any } ) => {


  // 有使用 "加價項目" 的服務數量
  const [ used_Num , set_Used_Num ] = useState( 0 ) ;   

  
   useEffect( () => {
  
      const used_Records = plan['plan_used_records'] ;
      
      if( used_Records.length > 0 ){

         
            used_Records.forEach( ( x : any ) => {

                axios.get( `/plan_records/show_sigle_plan_used_record_with_service/${ x['id'] }` )
                     .then( res => { 
                    
                            const record = res.data ;

                            let extra_Item_Arr = null ;
                            if( record['service_type'] === '洗澡' ) extra_Item_Arr = record.bath.extra_service?.split(',') ;
                            if( record['service_type'] === '美容' ) extra_Item_Arr = record.beauty.extra_service?.split(',') ;

                            // 若有使用加價項目
                            if( extra_Item_Arr && extra_Item_Arr.length > 0 ) set_Used_Num( ( n ) => n+1 ) ; // 使用 updater，取得最新 state

                      }) ;
                    
            })
  
      }

      // 卸載、加掛前，先歸零 ( 避免持續加總 )
      return () => set_Used_Num( 0 ) ;
 

   } , [ plan['plan_used_records'] ] )



   const num = { height:"17px" , paddingLeft:"4px" , paddingRight:"4px" ,background:"red" ,top:"-13px" , left:"13px" , fontSize:"2pt"} ;

   return <>

            { 
              used_Num > 0 && <b className="tag absolute fWhite" style={ num }> 
            
                  {/* 加價：{ used_Num }      */}

                  ＋加價
                 
               </b> 
                  
                  }

             
 
          </>
} ;


export default Plan_Used_ExtraItem_Sign
       