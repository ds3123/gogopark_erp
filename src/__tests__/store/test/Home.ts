

import React from 'react'


// 以下 Redux 尚未完成，暫時只是
test( 'nothing' , ()=>{

   const expected = 3

   expect( expected ).toBe( 3 )

} )


// import { createStore , combineReducers , applyMiddleware } from 'redux' ;
// import { Provider } from 'react-redux' ;
// import thunk from 'redux-thunk' ;
// import { render } from '@testing-library/react' ;
// import reducer_Test from 'store/reducers/reducer_Test' ;
// import Home from 'components/counter/Home'


// test( 'The view will display user info from api after Home rendered' , () => {

//    // Arrange
//    global.fetch = jest.fn().mockResolvedValue({
//                                                   json : () => ( { user : 'Danny' } )
//                                                })
 
//    const store = createStore(
//                               combineReducers( { reducer_Test } ) ,
//                               applyMiddleware( thunk )
//                              )                                               

//     const { getByText } = render( 
//                                   <Provider store={ store }> 
//                                       <Home/> 
//                                   </Provider> 

//                                  )



//  } )