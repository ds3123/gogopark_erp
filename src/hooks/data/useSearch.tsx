
import { useEffect , useState } from "react" ;


type filterType = ( source : any[] , searchKeyword : string  ) => any[] ; // 篩選資料函式 ( 各區塊不同的篩選條件 )



// 搜尋列 ( 依照輸入關鍵字搜尋 )
export const useSearch_Bar = ( filtered_Items : any[] , filter_Data : filterType , search_Keyword : string ) : any => {
   
    const [ data , set_Data ]       = useState<any[]>( [] ) ; // 資料
    const [ dataSum , set_dataSum ] = useState( 0 ) ;         // 資料筆數


    useEffect( () : any => { 
    
      // * 有輸入 _ 搜尋關鍵字 --> 以搜尋關鍵字，過濾查詢結果
      if( search_Keyword && filtered_Items.length > 0 ){

          const _filter = filter_Data( filtered_Items , search_Keyword ) ;

          set_Data( _filter ) ;
          set_dataSum( _filter.length ) ;

          return false ;

      }

    
      // * 無輸入 _ 搜尋關鍵字 ( 預設狀態 )
      set_Data( filtered_Items ) ;             // 設定 _ 所查詢資料
      set_dataSum( filtered_Items.length ) ;   // 設定 _ 資料筆數

    } , [ search_Keyword , filtered_Items ] ) ;


    return { data , dataSum }

} ;