
import Pet_Info from "components/beautician/main_components/pet_info/Pet_Info"
import Cus_Confirm_Bar from "components/beautician/main_components/Cus_Confirm_Bar"
import Bath_Time_Records from "components/beautician/main_components/Bath_Time_Records"


{ /* 右側 : 主要面板  */ }
const Main_Card = () => {

  
   return <div className="card p_10" style={{ height : "auto" }} > <br/>

            { /* ------------- 寵物基本資訊 --------------- */ }
            <Pet_Info /> <br/>

            { /* ------------- 主人確認狀態 Bar ------------ */ }
            <Cus_Confirm_Bar /> <br/>

            { /* ------------- 洗澡 _ 時間點選按鈕 ------------ */ }
            <Bath_Time_Records />

          </div>

};

export default Main_Card