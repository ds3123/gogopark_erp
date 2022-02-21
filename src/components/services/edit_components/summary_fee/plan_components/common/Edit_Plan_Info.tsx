
import { useState , useEffect } from "react" ;


// @ 編輯狀態下，顯示 : 此次價格 、備註 等訊息.....
const Edit_Plan_Info = ( { data } : { data : any } ) => {


    // 使用方案下，該次價格
    const [ apply_Price ,  set_Apply_Price ] = useState( 0 ) ;


    useEffect( () => { 
    
      // for 預設方案
      if( data.payment_method === '包月洗澡' ) set_Apply_Price( data.bath_month_fee ) ;
      if( data.payment_method === '包月美容' ) set_Apply_Price( data.beauty_month_fee ) ;
    

    } , [ data ] ) ;


    return <>
                                
                <span className="tag is-large is-white"> 
                
                    <b> 此次價格 :&nbsp;<span className="fRed">{ apply_Price }</span>&nbsp;元 </b>

                    &nbsp; ( { data.payment_type } )
                
                </span>

                { /* 檢視 _ 方案資料 */ } 
                &nbsp;<span className="tag is-rounded is-primary pointer relative"   style={{ top:"-2px" }} >
                            <i className="fas fa-list"></i>
                        </span>

            </>




} ;

export default Edit_Plan_Info
       