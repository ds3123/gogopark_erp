

import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { Edit_Form_Type } from "utils/Interface_Type"

import { set_Self_Adjust_Amount } from "store/actions/action_Extra_Service_Fee"



interface ISelf extends Edit_Form_Type {

    editType?: string ;

}


// @ 各服務費用 : 自訂增減金額
const Self_Adjust_Amount: FC<ISelf> = ({ register, current, setValue, editType }) => {

    const dispatch = useDispatch();


    // 取得、設定增減金額
    const get_Fee = (fee: number) => {

        // 空字串
        if (!fee) {
            dispatch(set_Self_Adjust_Amount(0));
            return false;
        }

        dispatch(set_Self_Adjust_Amount(fee));

    };


    return <>

        <div className="columns is-multiline is-mobile">


            <div className="column is-3-desktop" >

                <b className="tag is-large  is-light" style={{ background: "darkorange", color: "white" }} >
                    <i className="fas fa-calculator"></i> &nbsp;

                    &nbsp;
                    <span className="tag is-medium is-white is-rounded"> {current} </span>
                    &nbsp;

                    此次調整金額
                </b>

            </div>

            <div className="column is-2-desktop" >

                <div className="control has-icons-left" >

                    <input className="input" type="number" {...register("self_Adjust_Amount")}
                        onChange={e => get_Fee(parseInt(e.target.value))} />

                    <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                </div>

            </div>

            <div className="column is-1-desktop" >
                <span className="relative" style={{ top: "8px" }}>元</span>
            </div>

            <div className="column is-6-desktop relative" >

                <span className='absolute' style={{ fontSize: '10pt', left: '-40px', top: "20px" }}> * 人工判斷 ( 自行調整服務金額 ) </span>

            </div>

        </div>

        <hr />

    </>

};

export default Self_Adjust_Amount


