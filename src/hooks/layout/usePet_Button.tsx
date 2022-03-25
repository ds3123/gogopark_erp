
import {useDispatch} from "react-redux";
import { click_Show_Edit_Pet } from "store/actions/action_Pet"



// 回傳 _ 寵物按鈕 ( 無、1隻、多隻 )
const usePet_Button = ( pets : any[] ) => {

    const dispatch = useDispatch() ;

    // 點選 : 寵物 ( 顯示右側滑動寵物資訊面板 )
    const click_Pet = ( data : any ) => dispatch( click_Show_Edit_Pet( data.serial ) ) ;
    
    let pet_Button = [] as any[] ;


    // 1 隻 ( 顯示 : 名字、品種、 )
    if( pets.length === 1 ){

        pet_Button = pets.map( ( x , y ) => {

            if( !x ) return null 

            return  <span key = { y }
                          className = "tag is-medium relative pointer"
                          style = {{ paddingTop:"4px" }}
                          onClick = { () => click_Pet( x )  } >

                       <b> { x["name"] } ( { x["species"] } ) &nbsp;

                           { ( x["sex"] && x["sex"] !== '請選擇' )&& <>
                                                                       <b className="tag is-rounded is-white" style={{  color : "rgb(0,0,150)" }}>
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
                          className = "tag is-medium relative m_Right_20 m_Bottom_10 pointer"
                          style = {{ paddingTop:"4px" }}
                          onClick = { () => click_Pet( x )  } >

                          <b> { x['name'] } </b>

                    </span> ;

        }) ;

    }

    return pet_Button ;

} ;

export default usePet_Button

