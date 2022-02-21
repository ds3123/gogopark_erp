
import React from "react"
import cookie from "react-cookies";


// @ 登入 _ 使用者相關資訊
export const useLogin_User_Info = ( type : '帳號' | '密碼' | '姓名' ) => {

    // Cookie : 目前登入者資訊
    const userInfo = cookie.load( 'userInfo' ) ;

    if( type === '帳號' ) return userInfo['account'] ;
    if( type === '密碼' ) return userInfo['password'] ;
    if( type === '姓名' ) return userInfo['employee_name'] ;

} ;