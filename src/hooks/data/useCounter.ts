

// @ 測試 Hook ( 練習用 2022.03.06 )

import { useState , useEffect } from "react";


const useCounter = ( initialCount : number , callbackFunciton : () => void ) => {

   const [ count , setCount ] = useState( initialCount ) ;


   const add = ( addend : number ) => setCount( count + addend ) ;  
       

    useEffect( callbackFunciton , [ count ] ) ;

    
    return { count , add }

}

export default useCounter