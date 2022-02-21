
import {createContext, useEffect, useState} from "react"
import { set_Modal } from "store/actions/action_Global_Layout"
import {useDispatch, useSelector} from "react-redux";



interface ModalContext {

  // 欲透過 Context 傳遞的 props 型別

}


// 建立 Context
export const ModalContext = createContext<ModalContext>( {} as ModalContext ) ;


// @ Modal 彈跳視窗
const Modal = ( ) => {

    const dispatch  = useDispatch() ;

    const active    = useSelector(( state:any ) => state.Layout.Modal_Open ) ;      // 是否開啟
    const component = useSelector(( state:any ) => state.Layout.Modal_Component ) ; // 所包含元件
    const props     = useSelector(( state:any ) => state.Layout.Modal_Props ) ;     // 元件屬性

    // Model 樣式
    const [ modal_Style , set_Modal_Style ] = useState({
                                                          width  : "60%" ,   // 寬度
                                                          height : "" ,
                                                          left   : "20%" ,   // 相對位置
                                                          bottom : "" ,
                                                       });


    // 關閉 _ Modal
    const close = ( ) => dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;


    // 設定 _ Modal 樣式
    useEffect(() => {

      if( props['modal_Style'] ){

          set_Modal_Style({
                             ...modal_Style ,
                             width  : props['modal_Style']['width'] ,
                             height : props['modal_Style']['height'] ,
                             left   : props['modal_Style']['left'] ,
                             bottom : props['modal_Style']['bottom']
                          })

      }

    } ,[ props ] ) ;


    const modal = {
                      top          : "-90px" ,
                      width        : modal_Style['width'] ,
                      left         : modal_Style['left'] ,
                      bottom       : modal_Style['bottom'] ,
                      borderRadius : "10px" ,
                      padding      : "15px" ,
                      height       : modal_Style['height'] ? modal_Style['height'] :"90vh" ,
                      background   : "white" ,
                      boxShadow    : "1px 1px 7px 2px rgba(0,0,0,.3)" ,
                      zIndex       : "5000" ,
                      overflow     : "hidden"
                   } as any ;

    return <>

                { active &&

                    <div className="modal-content absolute" style={ modal }>

                        <div className="columns is-multiline is-mobile ">

                            <div className="column is-12-desktop">
                                <b className="delete" style={{float: "right"}} onClick={close}></b>
                            </div>

                            <div className="column is-12-desktop">
                                <ModalContext.Provider value={ props } >
                                    { component }
                                </ModalContext.Provider>
                            </div>

                        </div>

                    </div>

                }

           </>

} ;


export default Modal