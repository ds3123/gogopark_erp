import { useState , useEffect } from "react" ;
import { useDispatch , useSelector } from "react-redux" ;
import { set_Modal } from "store/actions/action_Global_Layout"
import Pet_Records from "components/services/edit_components/Pet_Records"


/*

  @ 側邊提示資訊( 新增服務時顯示 )
    1. 位置
    2. 客戶
    3. 寵物

*/


const Side_Info_Basic = () => {


    const dispatch = useDispatch();


    // 目前新增欄位中，所輸入 : 客戶姓名
    const Current_Customer_Name = useSelector(( state : any ) => state.Customer.Current_Customer_Name  ) ; 

    // 目前點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )
    const current_Create_Tab    = useSelector(( state : any ) => state.Service.current_Create_Tab  ) ;    
    
    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets = useSelector(( state:any ) => state.Customer.Current_Customer_Pets ) ;


    // 點選 _ 檢視 : 寵物資訊
    const click_Check_Pet = ( pet : any ) => 
        dispatch( set_Modal( true , <Pet_Records /> , { modal_Style : { width : "100%" , left : "0%" } , data : pet } )) ;
  
      

   return <>    

            <div className="columns is-multiline is-mobile">

                { /* 位置 */ }
                <div className="column is-12-desktop">
                    <i className="fas fa-tag"></i> &nbsp;位 置 : <b className="fDred"> 新增{ current_Create_Tab } </b>
                </div>

                { /* 客戶 */ }
                { Current_Customer_Name &&

                    <div className="column is-12-desktop">
                        <i className="fas fa-user"></i> &nbsp;客 戶 : <b className="fDblue"> { Current_Customer_Name } </b>
                    </div>

                }

                { /* 寵物 */ }
                { current_Customer_Pets.length > 0  &&

                    <div className="column is-12-desktop">

                        <i className="fas fa-dog"></i> &nbsp;寵 物 : &nbsp;

                        {

                            current_Customer_Pets.map( ( x : any , y : any ) => {

                                return <span key = { y }  onClick = { () => click_Check_Pet( x )  }>
                                        <b className="tag pointer m_Bottom_15 hover" >
                                                { x['name'] } ( { x['species'] } )
                                        </b> &nbsp;
                                    </span>

                            })

                        }

                    </div>

                }

            </div>
   
          </>  

} ;


export default Side_Info_Basic
       