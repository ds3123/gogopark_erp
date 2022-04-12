
import { useEffect, useState } from "react" ; 
import axios from "utils/axios";
import { useRead_Service_Prices } from "hooks/ajax_crud/useAjax_Read";



const Plan_Used_Records_Table_Row = ( { record_Id } : { record_Id : string } ) => {

    // 讀取 _ 所有服務價格
    const all_Service_Prices = useRead_Service_Prices( ) ; 

    // 方案資料
    const [ data , set_Data ] = useState<any>( null ) ;

    // 加價項目
    const [ extra_Items , set_Extra_Items ] = useState( '' ) ;

    // 篩選出 _ 加價項目
    const filter_Extra_Items = ( extra_Item_Arr : [] ) : string => {
    
        const arr = all_Service_Prices.filter( ( x ) => extra_Item_Arr.includes( x['id'] ) );
    
        if( arr.length > 0 ){
            const item_Arr = arr.map( x => x['service_name'] ) ;
            return item_Arr.join( ' , ' ) ; 
        } 

        return ''

    } ;


    // 查詢 _ 特定方案使用紀錄( 包含該紀錄 洗澡：bath / 美容 : beauty 的服務資料單內容 )
    useEffect( () => {

        axios.get( `/plan_records/show_sigle_plan_used_record_with_service/${ record_Id }` )
             .then( res => { 
                 
                const record = res.data ;

                // 設定 _ 使用紀錄
                set_Data( record ) ;


                // 設定 _ 加價項目
                let extra_Item_Arr = null ;
                if( record['service_type'] === '洗澡' ) extra_Item_Arr = record.bath.extra_service?.split(',') ;
                if( record['service_type'] === '美容' ) extra_Item_Arr = record.beauty.extra_service?.split(',') ;

                if( extra_Item_Arr ){
                    const _extra_Item_Arr = extra_Item_Arr.map( ( x : any ) => parseInt( x ) ) ; // 轉型為 Integer
                    set_Extra_Items( filter_Extra_Items( _extra_Item_Arr ) ) ;
                }else{
                    set_Extra_Items( '' )
                } 
                
            
             })
             .catch( err => console.log( err ) ) ; 
     
    } , [ record_Id , data ] ) ;


    return  <tr>
                <td> { data?.service_note }              </td>
                {/* <td> { data?.service_price }         </td> */}
                <td className="td_Left"> { extra_Items } </td>
                <td> { data?.created_at.slice( 0,10 ) }  </td>
            </tr>


} ;

export default Plan_Used_Records_Table_Row
       