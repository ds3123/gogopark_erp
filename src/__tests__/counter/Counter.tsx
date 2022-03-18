
import { render , fireEvent }  from "@testing-library/react" ;
import Counter  from 'components/counter/Counter' ;

import '@testing-library/jest-dom/extend-expect';



test( 'The default text displayed in view would be 目前數字 : 0' , () => {

    // Arange
    const { getByText } = render( <Counter /> ) ;

    // Assert
    expect( getByText( '目前數字 : 0' ) ).toBeInTheDocument() ;


})


test( 'The display of count will change to 1 from 0 after clicking 點我加一 button' , () => {

    // Arange
    const { getByText , queryByText } = render( <Counter /> ) ;

    // Act
    fireEvent.click( getByText('點我加一') ) ;

    // Assert
    expect( queryByText( '目前數字 : 0' ) ).not.toBeInTheDocument() ;
    expect( queryByText( '目前數字 : 1' ) ).toBeInTheDocument() ;


})