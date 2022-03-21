

/* @ 快取資料  */
interface ICache {

   // @ 客戶資料
   customers_Cache_PageOfItems   : any[]
   customers_Cache_filteredItems : any[]



}

const initState = {

    customers_Cache_PageOfItems   : [] , 
    customers_Cache_filteredItems : []



} ;


const reducer_Cache = ( state : ICache = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 客戶列表快取 ：pageOfItems
        case  "SET_CUSTOMERS_CACHE_PAGEOFITEMS" : return { ...state , customers_Cache_PageOfItems : action.data } ;
        
              
        default : return state ;

    }




} ;

export default reducer_Cache ;
