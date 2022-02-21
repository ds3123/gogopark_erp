import React , { FC , useContext , useState , useEffect } from "react" ;
import { useSelector , useDispatch } from "react-redux";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

import { set_Plan_States_To_Default , set_Pet_All_Plans } from "store/actions/action_Plan"
import { set_Current_Payment_Method } from "store/actions/action_Service"


type paymentMethod = {

    editType : any ; 
    current  : string ; 
    register : any ;
    setValue : any

}


// @ 付款方式 ( Ex. 現金、包月洗澡、包月美容 )
const Payment_Method : FC< paymentMethod >  = ( { editType , current , register , setValue } ) => {


    const dispatch = useDispatch() ;
    const value    = useContext( SidePanelContext ) ;                     // 取得 context 值  
    const data     = value.preLoadData ? value.preLoadData : value.data ; // 預先取得資料


    // 特定寵物 _ 所有方案 ( 包月洗澡 + 包月美容 )
    const pet_All_Plans                         = useSelector( ( state : any ) => state.Plan.pet_All_Plans ) ;
    
    const [ is_Defautlt , set_Is_Default ]      = useState( true ) ;

    // 預設方案 
    const [ default_Plans , set_Default_Plans ] = useState( [] ) ;

    // 自訂方案 
    const [ custom_Plans , set_Custom_Plans ]   = useState( [] ) ;
    
    
    // # 變動處理 : 付款方式 --------------
    const handle_PaymentMethod = ( method : string ) => {
  
       if( method === '現金' ) set_Is_Default( false ) ;

       dispatch( set_Current_Payment_Method( method ) ) ; // 設定 _ 付款方式 state　　　　　　　 　　　　　　
      
      
       // dispatch( set_Plan_States_To_Default() ) ;      // 回復 _ 方案 Store ( Plan ) 預設值            

    } 



    // 預設付款方式 : 若有 "方案"，付款方式優先設定為該方案 ( 尚未完成 2021.12.30 )
    useEffect( () => { 


        // 篩選、設定 _ 自訂方案
        const _default_Plans = pet_All_Plans.filter( ( x : any ) => ( x['plan_type'] === '包月洗澡' || x['plan_type'] === '包月美容' ) ) ;
        set_Default_Plans( _default_Plans ) ;

        
        // 篩選、設定 _ 自訂方案
        const _custom_Plans = pet_All_Plans.filter( ( x : any ) => ( x['plan_type'] !== '包月洗澡' && x['plan_type'] !== '包月美容' ) ) ;
        set_Custom_Plans( _custom_Plans ) ;


        // // 包月洗澡
        // if( current === '洗澡' && is_Defautlt && pet_All_Plans.length > 0 ){

        //     setValue( 'payment_Method' , '包月洗澡' ) ;
        //     dispatch( set_Current_Payment_Method( '包月洗澡' ) ) ;

        // }

        // // 包月美容
        // if( current === '美容' && is_Defautlt && pet_All_Plans.length > 0 ){

        //     setValue( 'payment_Method' , '包月美容' ) ;
        //     dispatch( set_Current_Payment_Method( '包月美容' ) ) ;

        // }

        // // 現金 
        // if( current === '洗澡' && is_Defautlt && pet_All_Plans.length === 0 ){

        //     setValue( 'payment_Method' , '現金' ) ;
        //     dispatch( set_Current_Payment_Method( '現金' ) ) ;  

        // }
    
    } , [ pet_All_Plans ] ) ;

    
   return <div className="column is-4-desktop" >

              <span className="tag is-large is-white" >

                <b> 付款方式 : </b> &nbsp;

                { /* for 新增 */ }
                { !editType &&

                    <div className="control has-icons-left">

                        <div className="select is-small relative">

                            <select {...register("payment_Method")}
                                        style    = {{ fontSize : "13pt" , top: "-7px" , fontWeight : "bold" }}
                                        onChange = { e => handle_PaymentMethod( e.target.value )} >

                                <option value="現金"> 現金 </option>

                                { ( default_Plans.length > 0 || custom_Plans.length > 0 ) && 
                                   <option value="方案"> 方案 </option>
                                }  

                            </select>

                        </div>

                        <div className="icon is-small is-left"> <i className="fas fa-money-bill-wave"></i> </div>

                    </div>

                }

                { /*  for 編輯  */ }
                { editType && <b className="fDblue"> { data.payment_method } </b>  }

              </span>

           </div> 

} ;


export default Payment_Method
       