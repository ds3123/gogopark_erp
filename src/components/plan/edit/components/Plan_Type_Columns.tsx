
import { FC , useEffect , useState } from "react" ;
import { useDispatch , useSelector } from "react-redux";
import { set_Self_Adjust_Amount , set_Service_Pickup_Fee } from 'store/actions/action_Plan'
import { usePlan_Query_Custom_Plan_By_Name } from "hooks/data/usePlan"


type pType = {
    register : any ;
    errors   : any ; 
}


// @ 方案的欄位
const Plan_Type_Columns : FC< pType > = ( { register , errors } ) => {

    const dispatch = useDispatch() ;

    const current_Plan_Name  = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇 : 方案類型( 名稱 )
    const current_Species_Id = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;  // 目前 "寵物品種" 下拉選項所選擇 id ( species 資料表的 id )    


    //【 預設 】方案價格 -----------------------------------------------------------
    const Month_Bath_Price   = useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ;   // 包月洗澡 
    const Month_Beauty_Price = useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ; // 包月美容


    //【 自訂 】方案價格 -----------------------------------------------------------
    const { custom_Plan , get_Custom_Plan_By_Name } = usePlan_Query_Custom_Plan_By_Name();        // 查詢 _ 自訂方案 ( 依 : 方案名稱 )   


    //【 共同 】方案價格 -----------------------------------------------------------
    const self_Adjust_Amount = useSelector( ( state : any ) => state.Plan.self_Adjust_Amount ) ;  // 自行調整金額   
    const service_Pickup_Fee = useSelector( ( state : any ) => state.Plan.service_Pickup_Fee ) ;  // 接送費   


    // 基本價格  
    const [ current_Baisc_Price , set_Current_Baisc_Price ] = useState( 0 ) ;

    // 洗澡次數、美容次數
    const [ service_Num , set_Service_Num ] = useState({ 'bath' : 0 , 'beauty' : 0 }) ;



    // 取得 _ 自訂增減金額 ( for 包月洗澡、包月美容 )
    const get_Self_Adjust_Amount = ( type : string , price : number ) => dispatch( set_Self_Adjust_Amount( price ? price : 0 ) ) ;
    
    // 取得 _ 接送費 ( for 包月洗澡、包月美容 )
    const get_Pickup_Fee = ( type : string , price : number ) => dispatch( set_Service_Pickup_Fee( price ? price : 0 ) ) ;

    

    // # 設定 _ 基本價格       
    useEffect( () => { 

      // 預設方案
      if( current_Plan_Name === '包月洗澡' ){
        set_Current_Baisc_Price( Month_Bath_Price ) ;  
        set_Service_Num( { ...service_Num , 'bath' : 4 , 'beauty' : 0 } ) ;   
      }   

      if( current_Plan_Name === '包月美容' ){
        set_Current_Baisc_Price( Month_Beauty_Price ) ; 
        set_Service_Num( { ...service_Num , 'bath' : 3 , 'beauty' : 1 } ) ;   
      } 

      // 自訂方案 ( 先取得自訂方案資料 )
      if( current_Plan_Name !== '包月洗澡' && current_Plan_Name !== '包月美容' ) get_Custom_Plan_By_Name( current_Plan_Name ) ;


    } , [ current_Plan_Name , current_Species_Id , Month_Bath_Price , Month_Beauty_Price ] ) ;      



     // for【 自訂方案 】 設定 _ 基本價格 ( 依照以上 get_Custom_Plan_By_Name 取得資料設定 )
     useEffect( () => { 

        if( custom_Plan ){

            set_Current_Baisc_Price( custom_Plan['default_price'] ) ;
            set_Service_Num( { ...service_Num , 'bath' : custom_Plan['bath_num'] , 'beauty' : custom_Plan['beauty_num'] } ) ;  
             
        } 
  
     } , [ custom_Plan ] ) ;
  

    return  <>

                { /* 基本價格 */ }
                <div className="column is-2-desktop ">

                    <span className="tag is-white is-large relative" style={{ top:"20px" }}>
                        <b>基本價格</b> &nbsp;  :  &nbsp;
                        <b className="fRed f_12"> { current_Baisc_Price } 元 </b> &nbsp; &nbsp; &nbsp;
                        <span className='f_11 absolute' style={{ top:"-15px" , left:"15px" }}> 
                           *     
                           { service_Num['bath'] > 0 && <span className="m_Right_10"> { service_Num['bath'] } 次洗澡  </span> } 
                           { service_Num['beauty'] > 0 && <span>  { service_Num['beauty'] } 次美容  </span> } 
                             
                        </span>
                    </span>

                </div>

                { /* 方案適用 */ }
                <div className="column is-4-desktop required" style={{ left : "40px" , width:"300px" }}>

                    <div className="relative" >

                        <p> <b> 方案適用 : <span className="fDblue"> 寵物編號 </span> </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Apply_Pet?.message } </b> </p>
                        <div className="control has-icons-left" >
                            <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                            <input className='input is-danger'  type='text' {...register("plan_Apply_Pet")}  />
                        </div>

                    </div>

                </div>

                { /* 自訂 : 加 / 減 金額 */ }
                <div className="column is-2-desktop">

                    <p> <b> 自訂 : 加 / 減 金額 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Adjust_Amount?.message } </b> </p>
                    <div className="control has-icons-left" >
                        <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                        <input className='input' type='number' {...register("plan_Adjust_Amount")}   onChange={ e => get_Self_Adjust_Amount('bath_adjust' , parseInt(e.target.value) )} />
                    </div>

                </div>

                <div className="column is-1-desktop "> <span className="relative" style={{top:"30px",left:"-10px"}}> 元 </span> </div>

                { /* 接送費 */ }
                <div className="column is-2-desktop ">

                    <p> <b> 接送費 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pickup_Fee?.message } </b> </p>
                    <div className="control has-icons-left" >
                        <span className="icon is-small is-left"> <i className="fas fa-truck-pickup"></i> </span>
                        <input className='input' type='number' { ...register("plan_Pickup_Fee") }  min='0' onChange={ e => get_Pickup_Fee('bath_pickup' , parseInt(e.target.value) ) } />
                    </div>

                </div>

                <div className="column is-1-desktop "> <span className="relative" style={{top:"30px",left:"-10px"}}> 元 </span> </div>

                { /* 包月洗澡 _ 共計 */ }
                <div className="column is-2-desktop ">

                    <span className="tag is-large relative" style={{ top:"20px" }}>
                        <b> 包月洗澡 _ 共計 </b> &nbsp;  :  &nbsp;
                        <b className="tag is-white is-rounded fRed f_12">
                            { current_Baisc_Price + self_Adjust_Amount + service_Pickup_Fee } 元
                        </b>
                    </span>

                </div>

            </> 


} ;


export default Plan_Type_Columns
       