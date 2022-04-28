


// 依照 : 建檔日期 ( created_at ) ，進行( 遞增、遞減 ) 排序
export const sort_Data_By_CreatedDate = ( data : any[] , order : 'asc' | 'desc' ) => {

   const sorted_Arr = data.sort(( a : any , b : any ) : any => {
                                    
                         const _a = new Date( a['created_at'] ) ; 
                         const _b = new Date( b['created_at'] ) ; 

                         if( order === 'asc' ) return _a > _b ? 1 : -1  // 升冪
                         
                         return _a < _b ? 1 : -1                        // 降冪

                      }) ;   

   return sorted_Arr    

}



// 依照 : 更新日期 ( updated_at ) ，進行( 遞增、遞減 ) 排序
export const sort_Data_By_UpdatedDate = ( data : any[] , order : 'asc' | 'desc' ) => {

   const sorted_Arr = data.sort(( a : any , b : any ) : any => {
                                    
                         const _a = new Date( a['updated_at'] ) ; 
                         const _b = new Date( b['updated_at'] ) ; 

                         if( order === 'asc' ) return _a > _b ? 1 : -1  // 升冪
                         
                         return _a < _b ? 1 : -1                        // 降冪

                      }) ;   

   return sorted_Arr    

}




// 依照 : 到店／服務 日期 ( service_date ) ，進行( 遞增、遞減 ) 排序
export const sort_Data_By_ServiceDate = ( data : any[] , order : 'asc' | 'desc' ) => {

    const sorted_Arr = data.sort(( a : any , b : any ) : any => {
                                    
                            const _a = new Date( a['service_date'] ) ; 
                            const _b = new Date( b['service_date'] ) ; 

                            if( order === 'asc' ) return _a > _b ? 1 : -1  // 升冪
                           
                            return _a < _b ? 1 : -1                        // 降冪

                       }) ;   
     
    return sorted_Arr         


}


