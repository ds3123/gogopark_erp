


/* @ 寵物頁  */
interface ICustomer {

    IsExisting_Pet              : boolean ; // 資料庫 _ 是否已有該寵物紀錄
    Pet_isLoading               : boolean ; // 客戶頁資料 _ 是否下載中

    current_Pet                 : any ;     // 目前 寵物資訊
    current_Pet_Serial          : string ;  // 目前 寵物編號 

    current_Species_Id          : any ;     // 目前 "品種" 下拉選項，所選擇 _ 寵物品種 Id
    current_Pet_Size            : string ;  // 目前 "體型" 下拉選項

    current_Pet_Service_Records : any[] ;   // 目前 寵物在特定服務( 基礎、洗澡、美容 ) 的紀錄
    current_Pet_Service_Price   : number ;  // 目前 寵物服務價格 

    current_Pet_Species_Num     : number ;  // 目前 資料表中( pet ) 已有某 "寵物品種" 數量

}

const initState = {

    IsExisting_Pet              : false ,
    Pet_isLoading               : true ,

    current_Pet                 : null ,
    current_Pet_Serial          : '' ,

    current_Species_Id          : null ,
    current_Pet_Size            : '' ,

    current_Pet_Service_Records : [] ,
    current_Pet_Service_Price   : 0 ,

    current_Pet_Species_Num     : 0

} ;




const reducer_Pet = ( state : ICustomer = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 是否 : 資料庫已存在寵物
        case  "SET_IS_EXISTING_PET"    : return { ...state , IsExisting_Pet : action.IsExisting_Pet } ;

        // # 設定 _ 寵物頁資料 _ 是否下載中
        case  "SET_PET_ISLOADING"      : return { ...state , Pet_isLoading : action.Pet_isLoading } ;

        // # 設定 _ 目前 "品種" 下拉選項，所選擇的品種 Id
        case  "SET_CURRENT_SPECIES_ID" : return { ...state , current_Species_Id : action.current_Species_Id } ;

        // # 設定 _ 目前 : 寵物
        case  "SET_CURRENT_PET" : return { ...state , current_Pet : action.current_Pet } ;

        // # 設定 _ 目前 "體型" 下拉選項
        case  "SET_CURRENT_PET_SIZE" : return { ...state , current_Pet_Size : action.current_Pet_Size } ;

        // # 設定 _ 目前寵物編號
        case  "SET_CURRENT_PET_SERIAL" : return { ...state , current_Pet_Serial : action.current_Pet_Serial } ;

        // # 取得 _ 寵物目前服務 ( 基礎、洗澡、美容 ) 紀錄 ( 透過 axios 取得資料庫資料 )
        case  "GET_CURRENT_PET_SERVICE_RECORDS" : return { ...state , current_Pet_Service_Records : action.records } ;
       
        // # 設定 _ 寵物目前服務 ( 基礎、洗澡、美容 ) 紀錄
        case  "SET_CURRENT_PET_SERVICE_RECORDS" : return { ...state , current_Pet_Service_Records : action.records } ;


        //  # 設定 _ 寵物目前服務價格 ( 初次洗澡、單次洗澡 .... )
        case  "SET_CURRENT_PET_SERVICE_PRICE" : return { ...state , current_Pet_Service_Price : action.price } ;
       
        //  # 設定 _ 目前 資料表中( pet ) 已有某 "寵物品種" 數量
        case  "GET_CURRENT_PET_SPECIES_NUM" : return { ...state , current_Pet_Species_Num : action.current_Pet_Species_Num } ;
       


        // # 設定 _ 回復初始值 
        case  "SET_PET_STATES_TO_DEFAULT" : return initState ;


        default : return state ;

    }


} ;

export default reducer_Pet ;
