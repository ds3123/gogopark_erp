
// 依照 : 資料表欄位，進行( 遞增、遞減 ) 排序
export const sort_Data_By_Column = ( data : any[] , column : string , order : 'asc' | 'desc' ) => {


  

}


// 依照 : 日期 ，進行( 遞增、遞減 ) 排序
export const sort_Data_By_Date = ( data : any[] , order : 'asc' | 'desc' ) => {

    const sorted_Arr = data.sort(( a : any , b : any ) : any => {
                                    
                            const _a = new Date( a['service_date'] ) ; 
                            const _b = new Date( b['service_date'] ) ; 

                            if( order === 'asc' ) return _a > _b ? 1 : -1  // 升冪
                           
                            return _a < _b ? 1 : -1                        // 降冪

                       }) ;   
     
    return sorted_Arr         


}


