



type Owner_Info = {

   name     : string ;
   id       : string ;
   mobile   : string ;
   telphone? : string ;
   line?     : string ; 
   email?    : string ;
   sex?      : string ;
   note?     : string ;
   address?  : string ;

}



// @ 主人基本資訊欄位
const Owner_Info_Columns = ( { name , id , mobile , telphone , line , email , sex , note , address } : Owner_Info ) => {


   return <div className="columns is-multiline is-mobile relative">

            <div className="column is-offset-1 is-3-desktop">  姓 名 :     <span className="fDblue"> { name }     </span> </div>
            <div className="column is-3-desktop">              身分證字號 : <span className="fDblue"> { id }       </span> </div>
            <div className="column is-3-desktop">              手機號碼 :   <span className="fDblue"> { mobile }   </span> </div>
            <div className="column is-offset-1 is-3-desktop">  家用電話 :   <span className="fDblue"> { telphone } </span> </div>
            <div className="column is-3-desktop">              Line ID :   <span className="fDblue"> { line }     </span> </div>
            <div className="column is-4-desktop">              E-mail :    <span className="fDblue"> { email }    </span> </div>
            <div className="column is-offset-1 is-3-desktop">  性 別 :     <span className="fDblue">  { sex === '請選擇' ? '' : sex }      </span> </div>
            <div className="column is-8-desktop">              備 註 :      <span className="fDblue"> { note }     </span> </div>
            <div className="column is-offset-1 is-11-desktop"> 通訊地址 :   <span className="fDblue">  { address }  </span> </div>
        
          </div>  

} ;

export default Owner_Info_Columns
       