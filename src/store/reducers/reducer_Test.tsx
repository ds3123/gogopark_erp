

/* @ 測試練習 ( 2022.03.06 ) */
interface ITest {

    user : string ;

}


const initState = {

    user : '' ,  

} ;


const reducer_Test = ( state : ITest = initState , action : any ) => {

    switch( action.type ){

        case  "SET_TEST_USER" : return { ...state , user : action.test_User } ;
        
        default : return state ;

    }

} ;

export default reducer_Test ;