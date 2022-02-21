
import React, {FC, useEffect, useState} from "react"



interface IQuery {

    isQuerying             : boolean ;               // 是否已開始查詢 : 身分證字號、手機號碼

    query_Result_Id        : any[] ;                 // 查詢 _ "身分證字號" 結果
    query_Result_CellPhone : any[] ;                 // 查詢 _ "手機號碼" 結果

    set_Cus_Data           : ( data : any ) => void   // 點選 _ 帶入舊客戶資料


}



// @ 顯示 _ 查詢客戶 : "身分證字號"、"手機號碼" 結果 ( 顯示 : 客戶姓名、新客戶 在標題列右上方 )
const Customer_Types_Query : FC< IQuery > = ( obj ) => {

    const { isQuerying , query_Result_Id , query_Result_CellPhone , set_Cus_Data } = obj ;


    const style = { width: "80%", height:"35px" ,left : "140px" , top:"0px" , overflowY:"hidden" } as const ;
    const tag   = "tag is-medium hover is-light" ;

  return <>

              { /* 有符合 _ 身分證字號  */ }
              <div className="absolute" style={style} >

                  { /* 顯示查詢結果 _ 身分證字號 */ }
                  {


                      ( isQuerying && query_Result_Id.length > 0 ) &&

                          query_Result_Id.map(( x : any , v : any ) => {

                              return <span key={ v } >
                                        <b className={ tag } onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                     </span> ;

                          })

                  }


                  { /* 顯示查詢結果 _ 手機號碼 */ }
                  {

                      ( isQuerying && query_Result_CellPhone.length > 0 ) &&

                          query_Result_CellPhone.map(( x : any , v : any ) => {

                              return <span key={ v } >
                                        <b className={ tag } onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                     </span> ;

                          })

                  }

              </div>


              { /* 顯示 : 新客戶 */ }
              { ( isQuerying && query_Result_Id.length === 0 && query_Result_CellPhone.length === 0 ) && <b style={{color:"red"}}> 新客戶 </b> }


         </>

} ;

export default Customer_Types_Query
