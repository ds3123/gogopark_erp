
import { renderHook , act } from '@testing-library/react-hooks' ;
import useCounter from 'hooks/data/useCounter' ;

test( 'The default count would be the received parameter' , () => { 

  // Arrange
  const { result } = renderHook( () => useCounter( 8 , () => {} ) );
  const expected   = 8 ; 

  // Assert
  expect( result.current.count ).toBe( expected ) ;


} )


test( 'The count would be the sum of initial count and added count after executing the add method' , () => { 

   // Arrange
   const { result } = renderHook( () => useCounter( 8 , () => {} ) ) ;
   const expected   = 24 ;
   
   // Act 
   act( () => result.current.add( 16 ) ) ;


   // Assert
   expect( result.current.count ).toBe( expected ) ;

})


test( 'The callback function will execute after the add method executed' , () => { 

   // Arrange
   const mock_Callback = jest.fn() ;  // 替身函式
   const { result }    = renderHook( () => useCounter( 8 , mock_Callback ) ) ;

   // Act
   act( () => result.current.add( 16 ) ) ;
   
   // Assert
   expect( mock_Callback.mock.calls.length ).toBe( 2 ) ;


} )

