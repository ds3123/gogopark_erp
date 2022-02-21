
import { FC } from "react"


interface IPet{

   current               : string | undefined ;    // 目前所在位置
   current_Customer_Pets : any[] ;                 // 客戶所有寵物    
   click_Pet_Button      : ( pet : any ) => void ; // 點選 _ 寵物動作      
 
}


// @ 顯示 _ 客戶所有寵物
const Customer_Pets : FC< IPet > = obj => {

    
    const { current , current_Customer_Pets , click_Pet_Button } = obj ;
  
  return <>
            {

              ( current && current_Customer_Pets.length > 0 ) &&

                current_Customer_Pets.map( ( x : any , y : any ) => {

                    return <span key = { y } onClick = { () => click_Pet_Button( x ) } >
                               &nbsp; <b className = "tag is-medium pointer m_Bottom_15" > { x['name'] } ( { x['species'] } ) </b> &nbsp; &nbsp;
                           </span>

                })

            }
         </>

} ;

export default Customer_Pets