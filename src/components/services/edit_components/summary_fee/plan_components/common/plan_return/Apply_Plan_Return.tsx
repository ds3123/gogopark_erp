import { useState } from 'react' ;
import Plan_Return_Fee from './Plan_Return_Fee'


type Apply_Plan_Return = {

 
    used_Records_Num  : number ;               // 使用次數
    single_Bath_Price : number ;               // 單次洗澡價格

    current_User_Name : string ;               // 經手人員    

}


// @ 申請 _ 方案使用退費 ( 按鈕 )
const Apply_Plan_Return = ( { used_Records_Num , single_Bath_Price , current_User_Name  } : Apply_Plan_Return  ) => {


      // 是否 _ 申請退費
      const [ is_Return , set_Is_Return ]     = useState(false ) ;

      // 退費類型
      const [ return_Type , set_Return_Type ] = useState< '' | '優惠退費' | '一般退費' >( '' ) ;
  
      // 點選 _ 申請退費
      const click_Is_Return   = () => set_Is_Return( !is_Return ) ;
  
      // 點選 _ 退費類型
      const click_Return_Type = ( type : '優惠退費' | '一般退費' ) => set_Return_Type( type ) ;
  

   return <>

                { /* 退費按鈕  */ }  
                <div className="columns is-multiline is-mobile m_Top_30">

                    <div className="column is-2-desktop relative">
                        <b className={ `tag is-medium pointer ${ is_Return ? 'is-danger is-light' : '' }` } onClick = { () => click_Is_Return() } >
                        <i className="fas fa-dollar-sign"></i> &nbsp; 申請退費
                         <span className='absolute f_9' style={{ top:"-7px" , right :"36px" , color:"gray"  }}>( 建構中 )</span>
                        </b>
                    </div>

                    { is_Return &&

                        <div className="column is-3-desktop">
                            <b className={`tag is-medium m_Right_30 pointer ${return_Type === '優惠退費' ? 'is-danger' : ''}`}
                                onClick={ () => click_Return_Type('優惠退費')}> 優惠退費 </b>
                            <b className={`tag is-medium pointer ${return_Type === '一般退費' ? 'is-danger' : ''}`}
                                onClick={ () => click_Return_Type('一般退費')}> 一般退費 </b>
                        </div>

                    }

                </div> 


                { /* 退費內容 */ }
                { is_Return &&
                      <Plan_Return_Fee return_Type={return_Type} used_Records_Num={used_Records_Num} single_Bath_Price={ single_Bath_Price } current_User_Name={current_User_Name} />
                }


         </>  
     

} ;

export default Apply_Plan_Return
       