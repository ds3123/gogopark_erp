

import { useEffect , useState } from "react"

/*
    @ 收折 / 展開 _ 區塊資訊 :
      * 回傳 :
        ~ 是否展開狀態 ( Boolean )
        ~ 點選元件    ( JSXElement )

 */
const useSection_Folding = ( defaultFolding? : boolean ) => {

    const [ is_folding , set_Is_Folding ] = useState<any>( defaultFolding ?  true : false );


    useEffect( () => {

        set_Is_Folding( defaultFolding )

    } , [ defaultFolding ] ) ;


    const Folding_Bt = <b className = { `tag is-medium f_10 pointer ${ !is_folding ? 'is-white' : 'is-success is-light' }` }
                          style     = { { float:'right' } }
                          onClick   = { () => set_Is_Folding( !is_folding ) } >

                          <i className="fas fa-bars"></i>

                       </b> ;

    return { is_folding , Folding_Bt }

} ;

export default useSection_Folding