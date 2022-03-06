
import Counter from "utils/calculate/Counter";

import { addTwoNumbers } from "utils/calculate/math";

// 製作 math 的替身 
jest.mock( "utils/calculate/math" ) ; 

// 斷言 addTwoNumbers 函式的型別
const mock_addTwoNumbers = addTwoNumbers as jest.MockedFunction<typeof addTwoNumbers>;



// test( 'The Default Value of count property would be 0' , ()=>{

//     // Arrange
//     const counter  = new Counter() ;
//     const expected = 0 ;

//     // Act
//     const result = counter.count ;

//     // Assert
//     expect( result ).toBe( expected ) ;        


// })


// test( 'The count will become 1 from 0 if first execute increment method' , ()=>{

//     // Arrange
//     const counter  = new Counter() ;
//     const expected = 1 ;

//     // Act
//     counter.increment() ;

//     // Assert
//     expect( counter.count ).toBe( expected ) ;        

// })


// test( 'The count will become 1 from 0 if first execute increment method ( MOCK )' , () => {

    
//     mock_addTwoNumbers.mockReturnValue( 1 ) ; // 指定 mock 的函式回傳值，固定為 1
    
//     // Arrange
//     const counter  = new Counter() ;
//     const expected = 1 ;

//     // Act
//     counter.increment() ;

//     // Assert
//     expect( counter.count ).toBe( expected ) ;        

// })


test( 'The count will become value of response after executing setCountFromDatabase' , async() => {

    // Arrange
    global.fetch = jest.fn().mockResolvedValue(                                       // 模擬以 fetch() 非同步取得資料庫資料
                                                { json : () => ( { count : 5 } ) }
                                              )
    const counter  = new Counter() ; 
    const expected = 5 ;

    // Act
    await counter.setCountFromDatabase();
   
    // Assert
    expect( counter.count ).toBe( expected )
           

})
