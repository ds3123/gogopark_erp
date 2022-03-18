
import { useDispatch , useSelector } from "react-redux" ;
import { set_Debug_Info } from "store/actions/action_Global_Layout"


// @ 除錯按鈕
const Debug_Button = () => {

    const dispatch        = useDispatch() ;

    // 是否開啟 _ 除錯資訊面板
    const Side_Debug_Open = useSelector( ( state : any ) => state.Layout.Side_Debug_Open ) ;

    // 點選 _ 顯示 / 關閉 : 除錯面板
    const click_Show_Debug = () => dispatch( set_Debug_Info( !Side_Debug_Open ) ) ;


    return <b className={ `tag is-medium absolute pointer ${ Side_Debug_Open ? 'is-primary' : '' }` } style={{ top:"30px" , right:"30px" }}  
                onClick={ () => click_Show_Debug() }>
                <i className="fas fa-bug"></i> &nbsp; 除錯
           </b>

} ;

export default Debug_Button
       
