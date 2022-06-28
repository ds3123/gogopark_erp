

import { usePlan_Bath_Beauty_Num } from 'hooks/data/usePlan'



type Num = {
   serviceData : any
}



// @ 該方案所包含的洗澡、美容次數
const Plan_Bath_Beauty_Num = ( { serviceData } : Num ) => {

    // 洗澡次數、美容次數
    const service_Num = usePlan_Bath_Beauty_Num( serviceData ) ; 


   return  <>

             <div className="column  is-2-desktop">

                    <div className="f_14"> <b>洗澡</b>次數 :&nbsp; 
                        
                       <b className='fDblue' > { service_Num['bath'] } </b>
                    
                    </div>

             </div>

             <div className="column  is-2-desktop">
                    <div className="f_14"> <b>美容</b>次數 :&nbsp; 
                        
                       <b className='fDblue' > { service_Num['beauty'] } </b>
                    
                    </div>
             </div>
   
           </>
           

   
        


} ;

export default Plan_Bath_Beauty_Num
       