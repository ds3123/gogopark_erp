

import { useEffect, useState } from "react";
import SearchBar from "templates/search/SearchBar";
import { useHistory } from "react-router-dom" ;

import { useContext } from "react" ;
import { ModalContext } from "templates/panel/Modal" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;

import axios from "utils/axios" ;
import Owner_Info_Columns from "components/customers/change/components/Owner_Info_Columns" ;

import { toast } from "react-toastify" ;
import { useDispatch } from "react-redux";

import Search_Owner_Result from "./components/Search_Owner_Result" ;
import Change_Panel_Title from "./components/Change_Panel_Title" ;



// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

    return source.filter( ( x : any ) => {

               // # 設置 _ 多種查詢條件
               let cus_Name   = x['name'].match( new RegExp(searchKeyword, 'gi') );         // 客戶_姓名
               let cus_Id     = x['id'].match( new RegExp(searchKeyword, 'gi') );           // 客戶_身分證號
               let cus_Mobile = x['mobile_phone'].match( new RegExp(searchKeyword, 'gi') ); // 客戶_手機號碼
   
               return !!cus_Name || !!cus_Id || !!cus_Mobile ;
  
           })
 
} ;



// @ 更換特定寵物的主人
const Update_Pet_Owner = () => {


    const dispatch = useDispatch() ;
    const history  = useHistory() ;


    // 取得 _ 寵物 / 主人資料
    const value      = useContext( ModalContext ) as any ;   
    const pet        = value.data ;                 // 寵物
    const owner      = value.data.customer  ;       // 主人  
    const owner_Info = { name     : owner?.name ,
                         id       : owner?.id ,
                         mobile   : owner?.mobile_phone ,
                         telphone : owner?.tel_phone ,
                         line     : owner?.line , 
                         email    : owner?.email ,
                         sex      : owner?.sex === '請選擇' ? '' : owner?.sex,
                         note     : owner?.note ,
                         address  : owner?.address   } ;


    // 是否點選 ：更換主人
    const [ is_Change_Owner , set_Is_Change_Owner ] = useState( false ) ;                      


    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 所有主人資料
    const [ all_Owners , set_All_Owners ]      = useState([]) ;
    
    // 篩選後的主人資料
    const [ filter_Owners , set_Filter_Owners ] = useState<any[]>([]) ;

    // 預設所選擇客戶資訊
    const default_Selecteed = { name     : '' ,
                                id       : '' ,
                                mobile   : '' ,
                                telphone : '' ,
                                line     : '' , 
                                email    : '' ,
                                sex      : '' ,
                                note     : '' ,
                                address  : ''   } ;
    

    // 所選擇主人資料                              
    const [ selected_Owner , set_Selected_Owner ] = useState<any>( default_Selecteed ) ;               

    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ; 


    // 點選 _ 更換主人
    const click_Show_Change_Owner = () => set_Is_Change_Owner( !is_Change_Owner ) ;


    // 點選 _ 所搜尋、篩選的主人
    const click_Owner = ( data : any ) => {

        const obj = { ...selected_Owner ,
                        name     : data?.name ,
                        id       : data?.id ,
                        mobile   : data?.mobile_phone ,
                        telphone : data?.tel_phone ,
                        line     : data?.line , 
                        email    : data?.email ,
                        sex      : data?.sex ,
                        note     : data?.note ,
                        address  : data?.address 
                     }


        set_Selected_Owner( obj ) ;

    }


    // 點選 _ 更換主人 ( 寵物資料表：pet 的主人身分證字號欄位：customer_id )
    const click_Submit_Change_Owner = ( pet_Serial : string , changed_To_ID : string ) => {
        
        if( !pet_Serial || !changed_To_ID ){ alert('資料錯誤') ; return false ;  } ;   

        // 更新主人
        axios.put( `/pets/${ pet_Serial }` , { customer_id : changed_To_ID } )
             .then( res => {
      
                // 關掉 _ 右側面板 / Modal
                dispatch( set_Side_Panel( false , null , {} ) ) ;
                dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;

                // 通知訊息
                toast( `🦄 已更新寵物主人`, { position: "top-left", autoClose: 1500, hideProgressBar: false, closeOnClick: true });

                history.push( "/wrongpath" ); // 錯誤路徑
                history.push( "/pets" );      // 正確路徑

             })
             .catch( err => console.log( err ) ) ;


    } ;


    // 取得 _ 所有主人
    useEffect( () => {
    
        axios.get( "/customers" )
             .then( res => set_All_Owners( res.data ))
             .catch( err => console.log( err ) ) ;

    } , [] ) ;

    // 搜尋主人
    useEffect( () => {
    
      if( searchKeyword && all_Owners.length > 0 ){

          // 篩選
          const f_Data = filter_Data( all_Owners , searchKeyword ) ;

          // 設定
          set_Filter_Owners( f_Data ) ;

      }
      
      if( !searchKeyword ) set_Filter_Owners( [] ) ;


      // 掛載前，先清除 _ 先前所選擇主人
      return () => set_Selected_Owner( default_Selecteed ) ;

    } , [ searchKeyword ] ) ;



   return <div className="relative" style={{ height:"80vh" , top:"-20px"}}>

            { /* 標題 */ }
            <Change_Panel_Title pet = { pet }  is_Change_Owner = { is_Change_Owner } click_Show_Change_Owner = { click_Show_Change_Owner } />


            { /* 目前寵物主人資料 */ }
            { owner ? <Owner_Info_Columns { ...owner_Info } /> : 
            
                <b className="tag is-medium is-danger is-light relative is-rounded" style={{ top:"-10px" , left:"125px" }}> 
                  <i className="fas fa-user-alt-slash"></i> &nbsp; 尚未指定主人
                </b> 
             
             }
            


            { /* 更換主人區塊 */ }
            { is_Change_Owner &&

              <>

                <hr className="m_Bottom_50"/>

                <div className="columns is-multiline is-variable is-12 m_Bottom_30">

                    <div className="column is-offset-1 is-2-desktop">
                       <b className="f_14 relative" style={{ left:"33px" , top:"7px" }}> 搜尋欲更換主人 : </b>
                    </div>

                    <div className="column is-7-desktop relative">

                        <p className="absolute" style={{ top:"-15px" , fontSize:"10pt" }}> 
                            <i className="fas fa-info-circle"></i>&nbsp;可搜尋主人類別 ： <b> 客戶姓名、客戶身分證字號、客戶手機號碼 </b> 
                        </p>
                    
                        { /* 搜尋列 */ }
                        <SearchBar get_Search_Text = { get_Search_Text } />

                    </div>

                    { /* 搜尋結果 */ }
                    <Search_Owner_Result filter_Owners={ filter_Owners } selected_Owner_Id = { selected_Owner.id } click_Owner = { click_Owner }   />

                </div> 


                { selected_Owner.id  &&  
                
                    <>  
                        { /* 所點選主人的基本資訊 */ } 
                        <Owner_Info_Columns { ...selected_Owner } /> 

                        { /* 更換主人按鈕 */ }
                        <b className = "tag is-large is-success pointer absolute" 
                            style    = {{ width:"80%" , bottom:"-20px" , left:"10%" , letterSpacing:".4em" }}
                            onClick  = { () => { 
                                                 if( window.confirm( `確認要將寵物主人更換為 " ${ selected_Owner.name } " ?` ) )  
                                                     click_Submit_Change_Owner( pet.serial , selected_Owner.id ) ; 
                                               }} > 

                            <i className="fas fa-sync"></i> &nbsp; 更換主人&nbsp;
                            <p className="tag is-medium is-rounded is-white" style={{ letterSpacing:".1em" }}> 
                               &nbsp; <b className="fDblue"> { owner?.name ? owner?.name : '未指定' }</b>&nbsp;&rarr;&nbsp;<b className="fRed">{ selected_Owner.name } </b> &nbsp;
                            </p>

                        </b>
                    
                    </>
                    
                }

              </>

            } 

          </div>

} ;


export default Update_Pet_Owner
       