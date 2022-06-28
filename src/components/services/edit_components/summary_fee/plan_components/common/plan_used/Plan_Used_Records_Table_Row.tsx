import { useEffect , useMemo, useState } from "react" ; 
import axios from "utils/axios";
import { useRead_Service_Prices } from "hooks/ajax_crud/useAjax_Read";


type Row = {

    service_Id : string ; // 服務單 id
    record_Id  : string ; // 使用紀錄 id
    
}


const Plan_Used_Records_Table_Row = ( { record_Id , service_Id } : Row ) => {

    // 讀取 _ 所有服務價格
    const all_Service_Prices = useRead_Service_Prices( ) ; 

    // 方案資料
    const [ data , set_Data ] = useState<any>( null ) ;

    // 加價項目
    const [ extra_Items , set_Extra_Items ] = useState( '' ) ;

    //
    const [ service_Date , set_Service_Date ] = useState< null | string | undefined >( null ) ;


    // 篩選出 _ 加價項目
    const filter_Extra_Items = ( extra_Item_Arr : [] ) : string => {
    
        const arr = all_Service_Prices.filter( ( x ) => extra_Item_Arr.includes( x['id'] ) );
    
        if( arr.length > 0 ){
            const item_Arr = arr.map( x => x['service_name'] ) ;
            return item_Arr.join( ' , ' ) ; 
        } 

        return ''

    } ;



    // 取得 _ 加價項目字串
    const get_Extra_Items = ( record : any ) : string => {
       

        let extra_Item_Arr = null ;
        if( record['service_type'] === '洗澡' ) extra_Item_Arr = record.bath?.extra_service?.split(',') ;
        if( record['service_type'] === '美容' ) extra_Item_Arr = record.beauty?.extra_service?.split(',') ;

        if( extra_Item_Arr ){
            const _extra_Item_Arr = extra_Item_Arr.map( ( x : any ) => parseInt( x ) ) ; // 轉型為 Integer
            return filter_Extra_Items( _extra_Item_Arr )
        }

        return ''

    } ;

    // 取得 _ 該服務紀錄：到店日期
    const get_Service_Date = ( record : any ) : string => {
    
        let service_Date = null ;

        if( record['service_type'] === '洗澡' ) service_Date = record.bath?.service_date ;
        if( record['service_type'] === '美容' ) service_Date = record.beauty?.service_date ;
    
        return service_Date


    } ;



    // 查詢 _ 特定方案使用紀錄( 包含該紀錄 洗澡：bath / 美容 : beauty 的服務資料單內容 )
    useEffect( ( ) : any => {

       
            axios.get( `/plan_records/show_sigle_plan_used_record_with_service/${ record_Id }` )
                 .then( res => { 
      
                    const record = res.data ; 

                    set_Data( record ) ;                             // 設定 _ 使用紀錄
                    set_Service_Date( get_Service_Date( record ) ) ; // 設定 _ 到店日期
                    set_Extra_Items( get_Extra_Items( record ) ) ;   // 設定 _ 加價項目

                  } )
                 .catch( err => console.log( err ) ) ; 

    } , [ data ] ) ;
    

    console.log( 'data' , data ) ;  // 會不斷 render

    const is_Bath_Deleted   = data?.service_type === '洗澡' && !( data?.bath?.q_code ) ;   // 洗澡 ( 資料表：bath ) 資料已刪除
    const is_Beauty_Deleted = data?.service_type === '美容' && !( data?.beauty?.q_code ) ; // 美容 ( 資料表：beauty ) 資料已刪除

    return  <tr>
             
                <td> 

                     { ( !is_Bath_Deleted && !is_Beauty_Deleted ) &&
                      
                        <b className={ `tag is-medium ${ data?.service_type === '洗澡' ? 'is-success' : 'is-danger' } is-light` }> 
                            { data?.service_type }&nbsp; <span className="f_9"> ( { record_Id } ) </span> &nbsp; 
                          
                            <b className="tag is-white is-rounded ">
                               Q{ data?.service_type === '洗澡' ? data?.bath?.q_code : data?.beauty?.q_code   }
                            </b>      
                        
                        </b>
                      
                     }
                     
                     { is_Bath_Deleted   && <b className="fRed"> 洗澡 _ 資料已刪除 </b> }
                     { is_Beauty_Deleted && <b className="fRed"> 美容 _ 資料已刪除 </b> }

                </td>
                <td> { data?.service_note }              </td>
                <td className="td_Left"> { extra_Items } </td>
                <td> { data?.created_at?.slice( 0,10 ) } </td>
                <td> { service_Date }                    </td>
                <td> { service_Id }      </td>

            </tr>


} ;

export default Plan_Used_Records_Table_Row
       