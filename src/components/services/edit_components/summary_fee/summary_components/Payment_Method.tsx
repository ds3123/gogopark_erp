import { useContext , useState , useEffect } from "react" ;
import { useSelector , useDispatch } from "react-redux";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

import { set_Plan_States_To_Default , set_Pet_All_Plans } from "store/actions/action_Plan"
import { set_Current_Payment_Method } from "store/actions/action_Service"
import { usePet_Is_Plans_Available } from 'hooks/data/usePet'



type paymentMethod = {
    editType : any ; 
    current  : string ; 
    register : any ;
    setValue : any ;
}


// @ 付款方式 ( Ex. 現金、包月洗澡、包月美容 )
const Payment_Method = ( { editType , current , register , setValue } : paymentMethod ) => {

    const dispatch = useDispatch() ;

    // for 編輯
    const value    = useContext( SidePanelContext ) ;                     // 取得 context 值  
    const data     = value.preLoadData ? value.preLoadData : value.data ; // 預先取得資料


    // for 新增
    
    // 特定寵物 _ 所有方案 
    const pet_All_Plans = useSelector( ( state : any ) => state.Plan.pet_All_Plans ) ;

    // 所點選寵物
    const current_Pet   = useSelector( ( state : any ) => state.Pet.current_Pet ) ;


    // 判斷 _ 特定寵物，是否能有方案，可供使用
    const is_Plans_Available = usePet_Is_Plans_Available( current_Pet?.serial ) ;

    
    // # 變動處理 : 付款方式 --------------
    const handle_PaymentMethod = ( method : string ) => {
  
       dispatch( set_Current_Payment_Method( method ) ) ;  // 設定 _ 付款方式 state　　　　　　　 　　　　　　
      
    } 


    // 依照是否仍有方案使用額度，設定 _ 預設上，是否先顯示方案
    useEffect( () => {

      setTimeout( () => {


          // 使用設定 "方案" 選項 （ 僅：洗澡、美容 ）
          const is_Plan = is_Plans_Available && ( current === '洗澡' || current === '美容' )  ;
         
          // 設定 select 值
          setValue( 'payment_Method' , is_Plan ? '方案' : '現金' ) ; 

          // 設定 store
          dispatch( set_Current_Payment_Method( is_Plan ? '方案' : '現金' ) ) ; 


      } , 500 ) ;  

    } , [ is_Plans_Available , current_Pet ] ) ;


    
   return <div className="column is-4-desktop" >

              <span className="tag is-large is-white relative" >

                <span className="absolute f_11" style={{ top:'-30px' , left:'15px' }}> 

                {/*  ( 寵物 : { current_Pet?.name } / 方案 : { is_Plans_Available ? '有' : '無' } )  */}

                </span>

                <b> 付款方式 : </b> &nbsp; 

                { /* for 新增 */ }
                { !editType &&

                    <div className = "control has-icons-left" >

                        <div className = "select is-small relative" >

                            <select { ...register( "payment_Method" ) }
                                        style    = {{ fontSize : "13pt" , top: "-7px" , fontWeight : "bold" }}
                                        onChange = { e => handle_PaymentMethod( e.target.value )} >

                                <option value="現金">      現金      </option>

                                { /* 該寵物有買方案 & 位於洗澡、美容  */ }
                                {( pet_All_Plans.length > 0 && ( current === '洗澡' || current === '美容' ) ) && <option value="方案"> 方案 </option> }  

                                <option value="信用卡">    信用卡     </option>
                                <option value="第三方支付"> 第三方支付 </option>

                            </select>

                        </div>

                        <div className="icon is-small is-left"> <i className="fas fa-money-bill-wave"></i> </div>

                    </div>

                }

                { /*  for 編輯  */ }
                { editType && <b className="fDblue"> { data?.payment_method } </b>  }

              </span>

           </div> 

} ;


export default Payment_Method
       