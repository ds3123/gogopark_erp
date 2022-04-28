


type Page = {

    action : any // 點選返回動作

}


// ＠ 回上一頁
const To_Previous_Page = ( { action } : Page ) => {

   return <b className = "tag is-large pointer hover relative" 
             style     = {{ float:"right" , zIndex:1 }} 
             onClick   = { action } >

                <i className="fas fa-step-backward"></i> &nbsp; 回上一頁
                        
          </b>
   

} ;

export default To_Previous_Page
       