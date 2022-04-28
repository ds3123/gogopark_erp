
import { useState , useContext, useEffect } from "react" 
import { useDispatch , useSelector } from "react-redux"

// useContext
import { ModalContext } from "templates/panel/Modal" 

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" 
import { IServiceError } from "utils/Interface_Type"

// Redux
import { add_ServiceError_Handle_Record , get_ServiceError_Handle_Record , delete_ServiceError_Handle_Record } from "store/actions/action_Service"
import { set_Modal } from "store/actions/action_Global_Layout" 

import useServiceType from "hooks/layout/useServiceType"
import { switch_Service_Type_Id } from "utils/data/switch"

// Cookie
import cookie from 'react-cookies'  // 匯入 cookie
import { useHistory } from "react-router-dom" 



/*

  ＠管理者處理 : 異常處理狀態 


*/ 

const Error_Handle = () => {


    const history  = useHistory() ;
    const dispatch = useDispatch();

    // Cookie 使用者資訊
    const _cookie  = cookie.load('userInfo') ;

    // 取得 context 值
    const value    = useContext( ModalContext ) as any ;

    
    // 取得 _ 服務類型 ( 基礎、洗澡、美容 )、相對應服務資料表 id
    const { service_Type , service_Id } = switch_Service_Type_Id( value.data )

    const { color , icon } = useServiceType( value.data.service_type , false , 'large' , true );

    // 服務異常處理紀錄
    const handle_Records   = useSelector(( state : any ) => state.Service.service_Error_Handle_Records ) ;


    // 處理狀態
    const [ status , set_Status ] = useState( '' ) ;

    // 是否 _ 退費 ( for 現金 : 單次 _ 洗澡/美容 )
    const [ is_Return_By_Cash , set_Is_Return_By_Cash ] = useState< boolean >( false ) ;

    // 是否 _ 贈送 、退費 ( for 方案 : 包月 _ 洗澡/美容  )
    const [ return_By_Plan_Type , set_return_By_Plan_Type ] = useState< '' | '方案_贈送' | '方案_退費' >( '' ) ;

    // 方案退費方式 : 優惠退費 or 一般退費
    const [ return_By_Plan_Cash , set_return_By_Plan_Cash ] = useState< '' | '優惠退費' | '一般退費' >( '' ) ;


    // React Hook Form
    const { register , setValue , handleSubmit  , formState: { errors , isDirty , isValid } } =
          useForm<IServiceError>({ mode : "all" }) ;

    // 點選 _ 處理狀態
    const click_Stautus_Button = ( status : '已處理' | '待觀察' | '需追蹤' | '拒接客戶' ) =>
       set_Status( status ) ;

    // 點選 _ 退費、不退費 ( 現金 )
    const click_Is_Return_By_Cash = ( bool : boolean ) => set_Is_Return_By_Cash( bool ) ;

    // 點選 _ 贈送、不退費 ( 方案 )
    const click_Return_By_Plan_Type = ( type : '' | '方案_贈送' | '方案_退費' ) => set_return_By_Plan_Type( type ) ;

    // 點選 _ 退費 > 退費方式 : 優惠退費 、一般退費 ( 方案 )
    const click_Return_By_Plan_Cash = ( type : '' | '優惠退費' | '一般退費' ) => set_return_By_Plan_Cash( type ) ;


    // for 新增、刪除資料後 _ 重導向 / 更新畫面
    const redirect = () => {
    
       setTimeout(() => {

            // 關閉 _ 彈跳視窗
            dispatch( set_Modal( false , null ,{ modal_Style : { width:"50%" , left : "25%" } }  )) ;


            // 設定 Cookie ( for 前往 : 資料管理 > 服務異常 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '資料管理_服務異常' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath" ) ;   // 錯誤路徑
            history.push("/management" ) ;  // 正確路徑

           
            // set_Status( '' ) ;
            // setValue( 'handle_Error_Note' , '' ) ;
            // dispatch( get_ServiceError_Handle_Record( service_Type , service_Id ) ) ;  

       } , 1000 );


    } ;

    // 點選 _ 提交資料
    const onSubmit : SubmitHandler<IServiceError> = ( data : any ) => {

       if( !status ){
          alert( "請點選 : 處理狀態" ) ; 
          return false  
       }

       if( status !== '已處理' && !data.handle_Error_Note  ){
          alert( "請填寫 : 處理備註" ) ;
          return false
       }

       // 新增 _ 異常處理紀錄
       const record = {
                        service_type  : service_Type ,
                        service_id    : service_Id ,
                        handle_status : status ,
                        handle_note   : data.handle_Error_Note  ,
                        handle_user   : _cookie.employee_type ,
                      } ; 

       dispatch( add_ServiceError_Handle_Record( record ) ) ;

       redirect();

    } ;

    // 刪除 _ 資料
    const delete_Record = ( id : string ) => {

       dispatch( delete_ServiceError_Handle_Record( id ) ) ;
       redirect();
    
    } ;    

    // 取得 _ 異常處理紀錄
    useEffect(() => {
    
       dispatch( get_ServiceError_Handle_Record( service_Type , service_Id ) ) ;  

    } , [ service_Type , service_Id ] ) ;


    const box = {
                  width     : "100%" ,
                  maxHeight : "300px" ,
                  overflow  : "auto", 
                } ;

    return <>

            <form onSubmit = { handleSubmit( onSubmit ) } >

                <b className = { color } > 
                
                    <i className={ icon }></i> &nbsp; { service_Type  } &nbsp;
                    <b className="tag is-white is-medium is-rounded">
                      付款方式 &nbsp; : &nbsp; <span className="fDred"> { value.data.payment_method } </span> &nbsp; ( { value.data.payment_type } )
                    </b>
                
                </b>


                <div className="columns is-multiline is-mobile m_Top_50">

                    { /* 處理狀態 */ }
                    <div className="column is-2-desktop">
                        <b className="tag is-large is-white"> 處理狀態 : </b>
                    </div> 

                    <div className="column is-10-desktop">

                        <b className={ `tag is-large ${ status === '已處理' ? 'is-success' : '' } pointer m_Right_30` }
                           onClick = { () => click_Stautus_Button('已處理') } > 
                           <i className="fas fa-check"></i> &nbsp; 已處理 
                        </b>

                        <b className={ `tag is-large ${ status === '待觀察' ? 'is-link' : '' } pointer m_Right_30` }
                           onClick = { () => click_Stautus_Button('待觀察') } > 
                           <i className="far fa-eye"></i> &nbsp; 待觀察 
                        </b>

                        <b className={ `tag is-large ${ status === '需追蹤' ? 'is-warning' : '' } pointer m_Right_30` }
                           onClick = { () => click_Stautus_Button('需追蹤') } > 
                           <i className="fas fa-search"></i> &nbsp; 需追蹤 
                        </b>

                        <b className={ `tag is-large ${ status === '拒接客戶' ? 'is-danger' : '' } pointer` } 
                           onClick = { () => click_Stautus_Button('拒接客戶') } > 
                           <i className="fas fa-user-times"></i> &nbsp; 拒接客戶 
                        </b>

                    </div>

                    { /* 退費處理、處理備註 */ }
                    { ( status === '已處理' || status === '待觀察' ||  status === '需追蹤' || status === '拒接客戶' ) &&

                         <>

                            { /* 退費處理 */ }
                            <>

                                <div className="column is-2-desktop">
                                    <b className="tag is-large is-white"> 退費處理 : </b>
                                </div>

                                <div className="column is-10-desktop">

                                    { /* 專案 _ 贈送、退費 */ }
                                    { ( value.data.payment_method === '包月洗澡' || value.data.payment_method === '包月美容' ) &&

                                        <>
                                            { /* 贈 送 */ }
                                            <b className={`tag is-medium is-large pointer ${ return_By_Plan_Type === "方案_贈送" ? 'is-primary' : ''} m_Right_30`}
                                               onClick={() => click_Return_By_Plan_Type('方案_贈送')}> <i className="fas fa-gift"></i> &nbsp; 贈 送
                                            </b>

                                            { /* 退 費 */ }
                                            <b className={`tag is-medium is-large pointer ${ return_By_Plan_Type === "方案_退費" ? 'is-primary' : ''} m_Right_30`}
                                               onClick={() => click_Return_By_Plan_Type('方案_退費')}> <i className="fas fa-dollar-sign"></i> &nbsp; 退 費
                                            </b>

                                        </>

                                    }

                                    { /* 現金 _ 退費 */ }
                                    { value.data.payment_method === '現金' &&
                                          <b className={`tag is-medium is-large pointer ${ is_Return_By_Cash ? 'is-primary' : ''} m_Right_30`}
                                             onClick={() => click_Is_Return_By_Cash(!is_Return_By_Cash)}> <i className="fas fa-dollar-sign"></i> &nbsp; 退 費
                                          </b>
                                    }

                                </div>

                                { /* -------------------------------------------------- */ }

                                { /* 現金 _ 退費 */ }
                                { is_Return_By_Cash &&
                                    <>
                                        <div className="column is-2-desktop"> </div>
                                        <div className="column is-4-desktop">
                                             <b className="f_14 m_Right_30"> 服務金額 :&nbsp;<span className="fBlue" > $ 850 </span>&nbsp;元 </b>
                                             <b className="f_14">  退費金額 :  </b>
                                        </div>
                                        <div className="column is-2-desktop">
                                            <input type="number" className="input relative" { ...register("return_Amount") }
                                                   style={{left: "-60px",top:"-5px"}} />
                                        </div>
                                        <div className="column is-4-desktop"> <b className="f_14 relative" style={{left:"-70px"}}> 元 </b> </div>
                                    </>
                                }

                                { /* 包月 _ 贈送 */ }
                                { return_By_Plan_Type === '方案_贈送' &&
                                     <>
                                         <div className="column is-2-desktop"> </div>
                                         <div className="column is-10-desktop"> <b className="f_14"> * 此次服務，<b className="fBlue"> 不計入包月方案額度 </b> 。 </b> </div>
                                     </>
                                 }

                                { /* 包月 _ 退費 */ }
                                { return_By_Plan_Type === '方案_退費' &&
                                    <>
                                        <div className="column is-2-desktop"> </div>
                                        <div className="column is-3-desktop">
                                            <b className={ `tag is-medium m_Right_20 pointer ${ return_By_Plan_Cash === '優惠退費' ? 'is-danger' : '' } ` }
                                               onClick={ () => click_Return_By_Plan_Cash("優惠退費" ) } > 優惠退費
                                            </b>
                                            <b className={ `tag is-medium pointer ${ return_By_Plan_Cash === '一般退費' ? 'is-danger' : '' }  ` }
                                               onClick={ () => click_Return_By_Plan_Cash("一般退費" ) } > 一般退費
                                            </b>
                                        </div>
                                        <div className="column is-7-desktop">

                                            { /* 優惠退費 */ }
                                            { return_By_Plan_Cash === '優惠退費' &&
                                                <>

                                                    <span className="m_Right_20"> 基本價格 ( 秋田犬 ) : <span className="fBlue"> $3200 </span> </span>
                                                    <span className="m_Right_20"> 個體調整金額 : <span className="fBlue"> $1000 </span> </span>
                                                    <span className="m_Right_30"> 接送費 :   <span className="fBlue"> $500 </span> </span>  <br/><br/>
                                                    <b> 方案總金額 : <span className="fDred m_Right_30"> $4700 </span> </b>  <br/><br/>
                                                    <b> 此次退費金額 : <span className="fRed" > $1175 </span> ( <span className="fBlue"> 第 3 次包月 </span> ) </b>
                                                </>
                                            }

                                            { /* 一般退費 */ }
                                            { return_By_Plan_Cash === '一般退費' &&
                                               <>
                                                   <b> 方案總金額 : <span className="fDred m_Right_30"> $4700 </span> </b> <br/><br/>
                                                   <span className="m_Right_20"> 單次洗澡價格 : <span className="fBlue"> $850 </span> </span>
                                                   <span className="m_Right_90">
                                                       <span className="relative">
                                                           單次個體調整金額 : &nbsp;
                                                           <b className="fBlue absolute" style={{display:"inline-block",width:"80px",top:"-30px"}}>
                                                              &nbsp; <input className="input" type="number" />
                                                           </b>
                                                       </span>
                                                   </span>
                                                   <span className="relative">
                                                       單次接送費 : &nbsp;
                                                       <b className="fBlue absolute" style={{display:"inline-block",width:"80px",top:"-30px"}}>
                                                              &nbsp; <input className="input" type="number" />
                                                       </b>
                                                   </span> <br/><br/>
                                                   <b> 此次退費金額 : <span className="fRed"> $1025 </span> </b>
                                                   <b className="relative f_10" style={{ top:"-10px" , left:"10px" }}> *&nbsp;計算方式 : 4700 - ( 1225 * 3 ) = 1025 </b>
                                               </>
                                            }

                                        </div>
                                    </>
                                }

                            </>

                            { /* 處理備註 */ }
                            <div className="column is-2-desktop">
                                <b className="tag is-large is-white"> 處理備註 : </b>
                            </div>

                            <div className="column is-7-desktop">
                                <input type="text" className="input" { ...register("handle_Error_Note" ) } />
                            </div>

                            { /* 提交資料 */ }
                            <div className="column is-3-desktop">
                               <button type="submit" className="button is-primary relative" style={{ width:"100%" }} >
                                  <i className="fas fa-paper-plane"></i> &nbsp; 提 交 處 理 紀 錄
                               </button>
                            </div>

                         </>

                    }

                </div>

                <br/>

                <div style={ box }> 

                  { handle_Records.length > 0 &&  

                    <table className="table is-fullwidth is-hoverable">

                        <thead>
                            <tr>
                                <th style={{width:"150px"}}> 處理狀態 </th> 
                                <th> 處理備註 </th> 
                                <th style={{width:"150px"}}> 處理人員 </th> 
                                <th style={{width:"200px"}}> 處理時間 </th> 
                                <th style={{width:"100px"}}> 編 輯 </th> 
                            </tr>
                        </thead>
                        <tbody>

                           {

                             handle_Records.map( ( x:any , y:any ) => {

                                 return  <tr key={ y }>
                                            <td> { x['handle_status'] } </td>
                                            <td style={{textAlign:"left"}}> { x['handle_note'] } </td>
                                            <td>  { x['handle_user'] } </td>
                                            <td> { x['created_at'].slice(0,16) } </td>
                                            <td>
                                                 <b className="delete" onClick = { () => { if( window.confirm('確認要刪除處理紀錄') ) delete_Record( x['id'] ) } } ></b> 
                                            </td>

                                         </tr> 

                             })

                           }  

                        </tbody>

                    </table>

                  }   

                </div>  

                <br/><br/>

            </form> 


           </>      
    
    
} ;


export default Error_Handle
       