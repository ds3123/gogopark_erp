import { FC , useEffect, useState , useContext } from "react" ;
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "templates/panel/Modal" ;

import axios from "utils/axios";



type services = "洗澡" | "美容" ;


type cusPrice = {

    register   : any ;
    setValue   : any ;
    edit_Type  : string ;

}

type singlePrice = {

    num      : number ; 
    type     : services ; 
    handle   : any ;

    register : any ;

}


const Service : FC< singlePrice > = ( { num , type , handle , register } ) => {

  const _type     = type === '洗澡' ? 'bath' : 'beauty' ;  
  const _num      = num.toString() ; 
  const inputName = `plan_${ _type }_price_${ _num }` ;  // 輸入框 Name   Ex. plan_bath_price_1

  return <span className="relative">

           <b className="tag absolute" style={{top:"-22px"}}> { num } </b>
           <input type="number" { ...register( inputName ) } className="input m_Right_15 m_Bottom_15" style={{width:"95px"}} min="0" onChange={ e => handle( e , type , num ) } /> 

         </span> 

} ;


const Constainer : FC< singlePrice > = ( { num , type  , handle  , register } ) => {

    let box : any = [] ; 

    for( let i = 1 ; i <= num ; i++ ) box.push( <Service key={ i } num={ i } type={ type } handle = { handle } register = { register } /> )

    return box 

} ;


// ---------------------------------------------------------


// @ 自行計算 _ 每次消費價格
const Custom_Single_Price : FC< cusPrice > = ( { register , setValue  , edit_Type } ) => {


   // 取得 Moal 傳遞過來的資料 ( for 【 編輯 】 )
   const value            = useContext( ModalContext ) as any ;                                          // 取得 context 值
   const species_Data     = value.data ;                                                                 // 寵物資料 
   const custom_Plan_Name = species_Data ? species_Data['current_Custom_Plan']['plan_Name'] : '' ;       // 自訂方案名稱 
  
   const custom_Plans     = useSelector( ( state : any ) => state.Plan.custom_Plans ) ;                  // 所有 : 自訂方案
  
   // --------------------------------------------------------------------

   const bath_Num   = useSelector( ( state : any ) => state.Plan.current_Custom_Bath_Num ) ;             // 洗澡次數 
   const beauty_Num = useSelector( ( state : any ) => state.Plan.current_Custom_Beauty_Num ) ;           // 美容次數
  
   const plan_Default_Price = useSelector( ( state : any ) => state.Plan.current_Custom_DefaultPrice ) ; // 方案預設價格
   const plan_Species_Price = useSelector( ( state : any ) => state.Plan.current_Custom_SpeciesPrice ) ; // 方案品種價格 


   // 方案價格 ( 依照目前 : 預設 or 品種價格，決定價格分配，所要採用的計算基準 )
   const [ current_Plan_Price , set_Current_Plan_Price ] = useState( 0 ) ;


   // 已新增使用的價格輸入框
   const [ bath_Price , set_Bath_Price ]     = useState( [] ) ;  // 洗澡
   const [ beauty_Price , set_Beauty_Price ] = useState( [] ) ;  // 美容
   
   // 已分配使用價格金額
   const [ usedAmount_Bath , set_UsedAmount_Bath ]     = useState( 0 ) ; // 洗澡
   const [ usedAmount_Beauty , set_UsedAmount_Beauty ] = useState( 0 ) ; // 美容
   
  
   const set_Price_State = ( price : number , num : number , priceArr : any[] , changeArr : any[] , restArr : any[] , set_Price : any ) => {
    
      if( changeArr.length === 0 ){   // * 沒有 : 變動的的價格 ( 輸入框 ) 

        set_Price( [ ...priceArr , { "index" : num , "price" : price } ] ) ; // 直接新增一個變動價格  

      }else{                          // * 有        

        changeArr[0]['price'] = price ;                // 針對 _ "變動的" 價格輸入框，設定 _ 新的值
        set_Price( [ ...restArr , changeArr[ 0 ] ] ) ; // 在 "非變動" 輸入框中，加入 _ 修改值後的輸入框

      } 

   } ;


   // 取得 _ 目前輸入的 洗澡 / 美容 : 價格 ( 區分 _ "變動"、"未變動" 價格輸入框 )
   const get_Filter_Prices = ( type : services , num : number ) => {
   
      const priceArr  = type === "洗澡" ? bath_Price : beauty_Price ;
      const set_Price = type === "洗澡" ? set_Bath_Price : set_Beauty_Price ;

      const changeArr = priceArr.filter( ( x : any ) => x[ "index"] === num ) ;  // 篩選出 _ "變動" 的價格輸入框   
      const restArr   = priceArr.filter( ( x : any ) => x[ "index"] !== num ) ;  // 篩選出 _ "非變動" 的價格輸入框  

      return {  priceArr , set_Price , changeArr , restArr }
   
   } ;

   
   // 價格輸入變動
   const handle_Change = ( e : any , type : services , num : number ) => {

      const price = parseInt( e.target.value ) ;  // 輸入價格
      
      const { priceArr , set_Price , changeArr , restArr } = get_Filter_Prices( type , num )
     
      // * 輸入框 : 沒有值、清空 --> 設為 0
      if( !price ){ 
        set_Price( restArr ) ;
        return false 
      }
    
      set_Price_State( price , num , priceArr , changeArr , restArr , set_Price ) ;
     
   } ;


   // 計算、設定 _ 已填入分配的價格金額
   const set_UsedAmount = () => {

      let bath_Amount   = 0 ;
      let beauty_Amount = 0 ;

      // 累加已使用金額
      bath_Price.forEach( ( x : any ) => bath_Amount += x['price'] ) ;
      beauty_Price.forEach( ( x : any ) => beauty_Amount += x['price'] ) ;

      set_UsedAmount_Bath( bath_Amount ) ;
      set_UsedAmount_Beauty( beauty_Amount ) ;

      if( bath_Price.length === 0 )   set_UsedAmount_Bath( 0 ) ;
      if( beauty_Price.length === 0 ) set_UsedAmount_Beauty( 0 ) ;

   } ;

  
   useEffect( () => { 

     set_UsedAmount() ;
    
   } , [ plan_Default_Price , bath_Price , beauty_Price ] ) ;


  // 依先前資料，生成洗澡、美容價格輸入框
   const set_Prices_Input = ( bath_Prices : any[] , beauty_Prices : any[] ) => {

      const bathPrices_Arr   : any = bath_Prices.map( ( x : any , y : number ) => {  return { index : y+1 , price : Number( x ) }  }  )
      const beautyPrices_Arr : any = beauty_Prices.map( ( x : any , y : number ) => {  return { index : y+1 , price : Number( x ) }  }  )

      set_Bath_Price( bathPrices_Arr )
      set_Beauty_Price( beautyPrices_Arr )
   
   } ;

   // # 帶入資料 ( for【 編輯 】 )
   useEffect( () => { 
        
      if( custom_Plan_Name ){

        // 篩選 _ 目前自訂方案
        const c_Plan        = custom_Plans.filter( ( x : any ) => x['plan_name'] === custom_Plan_Name )[0] ;

        const bath_Prices   = c_Plan['self_bath_prices'] ? c_Plan['self_bath_prices'].split(',') : [] ;
        const beauty_Prices = c_Plan['self_beauty_prices'] ? c_Plan['self_beauty_prices'].split(',') : [] ;

        set_Prices_Input( bath_Prices , beauty_Prices ) ;

        // 是否有填寫 : 品種方案價格
        if( !plan_Species_Price ){    // 沒有 --> 填入先前已填寫的價格

          bath_Prices.forEach( ( x : any , y : number ) => setValue( `plan_bath_price_${ y+1 }` , x ) )
          beauty_Prices.forEach( ( x : any , y : number ) => setValue( `plan_beauty_price_${ y+1 }` , x ) )

        }else{                        // 有   --> 清空輸入  

          // 將已使用 洗澡、美容金額，設為 0
          set_UsedAmount_Bath( 0 ) ;
          set_UsedAmount_Beauty( 0 ) ;

          // 清空 _ 輸入框
          bath_Prices.forEach( ( x : any , y : number ) =>   setValue( `plan_bath_price_${ y+1 }` , '' ) )
          beauty_Prices.forEach( ( x : any , y : number ) => setValue( `plan_beauty_price_${ y+1 }` , '' ) )
          
        }  
  
      }

      // 設定 _ 方案價格 ( 依照目前 : 預設 or 品種價格，決定價格分配，所要採用的計算基準 )
      set_Current_Plan_Price( plan_Species_Price ? plan_Species_Price : plan_Default_Price )


   } , [ plan_Species_Price ] ) ;


   return <div className="relative">

              {/* <div className="absolute"  style={{ height:"30px" , width:"1200px"}} > 
              
                 <span className="m_Right_30"> 方案價格 :      <b className="fRed"> { current_Plan_Price }  </b> </span>
                 <span className="m_Right_30"> 已使用 _ 洗澡 : <b className="fRed"> { usedAmount_Bath }     </b> </span>
                 <span className="m_Right_30"> 已使用 _ 美容 : <b className="fRed"> { usedAmount_Beauty }   </b> </span>
                 <span className="m_Right_30"> bath_Price :   <b className="fRed"> { bath_Price.length }   </b> </span>
                 <span className="m_Right_30"> beauty_Price : <b className="fRed"> { beauty_Price.length } </b> </span>
                 
              </div>           */}

              { /* 價格分配狀態 */ }
              { ( usedAmount_Bath + usedAmount_Beauty ) > 0 &&
                <b className="tag is-medium is-white absolute" style={{ left : "0px" , top : "310px" }}> 
                   
                     {  current_Plan_Price > ( usedAmount_Bath + usedAmount_Beauty ) && 
                       <> <i className="far fa-comment-dots"></i> &nbsp; 尚未設定金額 : &nbsp; <b className="fRed"> { current_Plan_Price - ( usedAmount_Bath + usedAmount_Beauty ) } </b> &nbsp; 元 </>
                     }

                     {  current_Plan_Price < ( usedAmount_Bath + usedAmount_Beauty ) && 
                       <> <i className="far fa-comment-dots"></i> &nbsp; 分配價格總和，"超過" 預設價格 : &nbsp; <b className="fRed"> { ( usedAmount_Bath + usedAmount_Beauty ) - current_Plan_Price } </b> &nbsp; 元 </>
                     }

                     {  current_Plan_Price === ( usedAmount_Bath + usedAmount_Beauty ) && 
                       <span style={{ color:"green" }}><i className="fas fa-check-circle"></i>&nbsp; 預設價格已分配完畢 </span>
                     }

                </b>  
              }    
              
              <div className="column is-12-desktop">

                <br/>  

                { bath_Num > 0 && 

                    <>
                        <b className="tag is-medium is-success is-light m_Right_20 m_Bottom_15">
                            <i className="fas fa-bath"/> &nbsp; 洗澡價格 &nbsp;
                        </b> <br/><br/>
                        <Constainer num={ bath_Num } type="洗澡" handle={ handle_Change } register = { register } />  
                    </>

                }    

                <br/><br/>

                { beauty_Num > 0 && 

                    <>
                        <b className="tag is-medium is-danger is-light m_Right_20 m_Bottom_15">
                           <i className="fas fa-cut"/> &nbsp; 美容價格  &nbsp;
                        </b> <br/><br/>
                        <Constainer num={ beauty_Num } type="美容" handle={ handle_Change } register = { register } />  
                    </>

                }    

              </div>
           
          </div>  

} ;

export default Custom_Single_Price
       
