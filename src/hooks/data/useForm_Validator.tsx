
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {set_Invalid_To_Plan} from "../../store/actions/action_Form_Validator";
import {set_Use_Plan} from "../../store/actions/action_Plan";



/*
*   @ 自訂 _ 表單驗證邏輯
*
*/


// 新增 _ 洗澡、美容時，付款方式採 [ 方案 ] : "包月洗澡"、"包月美容" 下 ，方案相關驗證 ( invalid_To_Plan )
export const usePlan_Validator = ( paymentMethod : string ) => {

     const dispatch     = useDispatch() ;

     // 是否已點選 : 方案標籤中 "使用此方案" ( 由 usePlans_Records.tsx 中，點選標籤後設定 --> 作為後續判斷 _ 表單是否可提交，判斷依據之一 )
     const is_Plan_Used = useSelector(( state : any ) => state.Plan.is_Plan_Used ) ;


    // 變動 _ 付款方式
    useEffect( () => {

        // 若為 "方案" ， 先使提交新增按鈕失效
        if( paymentMethod === '方案' ){

          dispatch( set_Invalid_To_Plan( true ) ) ;

        }else{

          dispatch( set_Use_Plan( false ) ) ;        // 設定 _ 是否已點選方案標籤，設回初始值
          dispatch( set_Invalid_To_Plan( false ) ) ; // 將因方案驗證條件，設回初始值

        } 

    } , [ paymentMethod ] ) ;

    
    // 是否已點選 _ 使用方案
    useEffect( ( ) => {

        // 已選擇 "方案" ， 並 "尚未" 點選 _ 套用方案 --> 使新增提交鈕失效
        if( ( paymentMethod === '方案' ) && !is_Plan_Used ){
            dispatch( set_Invalid_To_Plan( true ) ) ;
        }

        if( ( paymentMethod === '方案') && is_Plan_Used  ){
            dispatch( set_Invalid_To_Plan( false ) ) ;
        }

    } , [ is_Plan_Used ] ) ;


} ;




