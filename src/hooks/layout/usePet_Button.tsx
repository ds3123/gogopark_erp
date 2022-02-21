
import React, {useEffect, useState} from "react" ;
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Pet from "components/pets/edit/Update_Pet";
import {useDispatch} from "react-redux";


import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";






// 回傳 _ 寵物按鈕 ( 無、1隻、多隻 )
const usePet_Button = ( pets : any[] ) => {

    const dispatch = useDispatch() ;



    // 點選 : 寵物
    const click_Pet = ( data : any ) => dispatch( set_Side_Panel(true , <Update_Pet /> , { preLoadData : data } ) ) ;

    let pet_Button = [] as any[] ;


    // 1 隻 ( 顯示 : 名字、品種、 )
    if( pets.length === 1 ){

        pet_Button = pets.map( ( x , y) => {


            if( !x ) return null 

            return  <span key = { y }
                          className = "tag is-medium relative m_Right_20 pointer"
                          style = {{ paddingTop:"4px" }}
                          onClick = { () => click_Pet( x )  } >

                       <b> { x["name"] } ( { x["species"] } ) &nbsp;

                           { ( x["sex"] && x["sex"] !== '請選擇' )&& <>
                                                                       <b className="tag is-rounded is-white" style={{ fontSize : "8pt" , color : "rgb(0,0,150)" }}>
                                                                           { x["sex"] }
                                                                       </b>  &nbsp;
                                                                     </>
                           }

                           { x["age"] && <>
                                           <b className="tag is-rounded is-white" style={{ fontSize : "8pt" , color : "rgb(0,0,150)" }}>
                                                { x["age"] } 歲
                                           </b> &nbsp;
                                         </>
                           }

                           { x["color"] && <>
                                           <b className="tag is-rounded is-white" style={{fontSize: "8pt", color: "rgb(0,0,150)"}}>
                                               {x["color"]}
                                           </b>
                                         </>
                           }

                       </b>

                    </span> ;

        }) ;

    }

    // 多隻 ( 僅顯示名字 )
    if( pets.length > 1 ){

        pet_Button = pets.map( ( x , y) => {

            // 有多隻寵物，僅顯示名字
            return  <span key = { y }
                          className = "tag is-medium relative m_Right_20 pointer"
                          style = {{ paddingTop:"4px" }}
                          onClick = { () => click_Pet( x )  } >

                          <b> { x['name'] } </b>

                    </span> ;

        }) ;

    }

    return pet_Button ;

} ;

export default usePet_Button

