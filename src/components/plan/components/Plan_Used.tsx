
import { useEffect , useState } from "react";
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records";
import axios from "utils/axios";


// @ 方案使用情形
const Plan_Used = ( { data } : { data : any } ) => {


  const dispatch = useDispatch() ;  

  // 方案 _ 已使用次數
  const [ used_Record , set_Used_Record ] = useState({
                                                        bath   : 0 , // 洗澡
                                                        beauty : 0   // 美容
                                                     }) ;


  // 方案使用紀錄
  const plan_used_records = data['plan_used_records'] ;

  // 點選 _ 使用情形 : 洗澡 
  const click_UsedRecords_Bath   = () => dispatch( set_Side_Panel( true , <Plan_Used_Records /> , { data : data } ) ) ;
 
  // 點選 _ 使用情形 : 美容 
  const click_UsedRecords_Beauty = () => dispatch( set_Side_Panel( true , <Plan_Used_Records /> , { data : data } ) ) ;
 
  
  // 計算 _ 方案已使用次數
  useEffect( () => {

    if( plan_used_records.length > 0 ){

       const beauty_Num = plan_used_records.filter( ( x : any ) => x['service_type'] === '美容' ).length ;
       const bath_Num   = plan_used_records.filter( ( x : any ) => x['service_type'] === '洗澡' ).length ;

       set_Used_Record( { ...used_Record , bath : bath_Num , beauty : beauty_Num } ) ;

    }



  } , [] ) ;


  return <>

            { /* # 預設方案 */ }  
            { data['plan_type'] === '包月洗澡' &&

                <b className="tag is-medium is-success is-light is-rounded pointer" onClick={click_UsedRecords_Bath}>
                    洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 4 </b>
                </b>

            }

            { data['plan_type'] === '包月美容' &&

                <>
                    <b className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={click_UsedRecords_Bath}>
                        洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 3 </b>
                    </b>
                    
                    <b className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_UsedRecords_Beauty } >
                        美 容 &nbsp; <b className="tag is-rounded is-danger"> { used_Record['beauty'] } / 1 </b>
                    </b>
                </>

            }


            { /* # 自訂方案 */ }
            { ( data['plan_type'] !== '包月洗澡' && data['plan_type'] !== '包月美容' ) &&

                    <>

                    { ( data['custom_plan'] && data['custom_plan']['bath_num'] > 0 ) && 

                        <b className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={click_UsedRecords_Bath}>
                            洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / { data['custom_plan']['bath_num'] } </b>
                        </b>

                    } 

                    { ( data['custom_plan'] && data['custom_plan']['beauty_num'] > 0 ) &&

                        <b className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_UsedRecords_Beauty } >
                            美 容 &nbsp; <b className="tag is-rounded is-danger"> { used_Record['beauty'] } / { data['custom_plan']['beauty_num'] } </b>
                        </b>

                    }

                </>

            }

  
         </>

} ;

export default Plan_Used 
       