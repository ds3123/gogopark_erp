

type Button = {
   name    : string ;   // 按鍵名稱
   isValid : boolean ;  // 是否可點選
}




// @ 提交按鈕 ( for 更新資料 )
const Update_Submit_Button = ( { name , isValid } : Button ) => {

    

   return <div className="has-text-centered m_Top_150 m_Bottom_100" >

                <button disabled  = { !isValid } 
                        type      = "submit" 
                        className = "button is-primary relative is-medium" 
                        style     = {{top: "-10px"}} >
                    
                  { name }

                </button>

           </div>   


} ;


export default Update_Submit_Button
       