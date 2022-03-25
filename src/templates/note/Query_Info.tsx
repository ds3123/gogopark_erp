



// 下載中圖示
export const is_Downloading = () => {

     return <div className="has-text-centered" >
                <button className="button is-loading is-white m_Top_150"></button>
            </div>

} ;


// 查無相關資料
export const no_Query_Data = () => {

    return <div className="has-text-centered m_Top_150" >
             <b className="tag is-large is-success"> <i className="fas fa-info"></i> &nbsp; 尚未查詢到相關資料，請改用其他關鍵字查詢． </b>
           </div>

} ;