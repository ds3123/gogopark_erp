

import { Dispatch } from "redux";



// @ 測試 :「 Redux 」( 練習用 2022.03.06  )
export const fetchUser = (  ) => {

    return ( dispatch : Dispatch ) => { 
  
              dispatch({ 
                          type       : "SET_TEST_USER" ,
                          test_User  : 'Danny' 
                        }) ;
  
           } ;
  
  } ;
  