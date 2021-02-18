<?php

namespace Controller;

use App\DB;

class ActionController{
    function buysAdd(){
        extract($_POST);
        
        $sql = "INSERT INTO buys(`delivery_date`,`delivery_time`,`buyer_name`,`buyer_id`,`buyer_zip_code`,`buyer_address`,`buyer_detail_address`,`buy_list`,`buy_time`,`buy_sum`) VALUES(?,?,?,?,?,?,?,?,?,?)";
        DB::query($sql,[$delivery_date,$delivery_time,$buyer_name,$buyer_id,$buyer_zip_code,$buyer_address,$buyer_detail_address,$buy_list,$buy_time,$buy_sum]);

        echo json_encode(true);
    }

    function joinAdd(){
        extract($_POST);

        $sql = "INSERT INTO users(`user_id`,`user_name`,`password`,`zip_code`,`address`,`detail_address`,`phone_number`,`type`) VALUES(?,?,?,?,?,?,?,?)";
        DB::query($sql,[$user_id,$user_name,$password,$zip_code,$address,$detail_address,$phone_number,$type]);

        go("/","회원가입이 되었습니다.");
    }

    function joinCheck(){
        $result = false;
        extract($_POST);

        if(DB::who($user_id)) $result = false;
        else $result = true;

        echo json_encode($result);
    }

    function login(){
        extract($_POST);
        
        $sql = "SELECT * FROM users WHERE `user_id` = ? AND `password` = ?";
        $user = DB::fetch($sql,[$user_id,$password]);

        if($user){
            $_SESSION['user'] = $user;
            return go("/","로그인이 되었습니다.");
        } else back("아이디 또는 비밀번호가 일치하지않습니다.");
    }

    function requestAdd(){
        extract($_POST);

        $sql = "INSERT INTO requests(`request_name`,`price_limit`,`error_range`,`requester_id`) VALUES(?,?,?,?)";
        DB::query($sql,[$request_name,$price_limit,$error_range,user()->id]);

        go("/request","요청이 완료되었습니다.");
    }

    function proposeAdd(){
        extract($_POST);

        $sql = "INSERT INTO proposes(`proposer_id`,`item_list`,`request_id`) VALUES(?,?,?)";
        DB::query($sql,[user()->id,$item_list,$request_id]);

        echo json_encode(true);
    }

    function proposeInfo(){
        extract($_POST);

        $data = DB::find('proposes',$id);
        echo json_encode($data);
    }

    function userInfo(){
        echo json_encode($_SESSION['user']);
    }

    function buysInfo(){
        $sql = "SELECT * FROM buys ORDER BY buy_time ASC";
        $list = DB::fetchAll($sql);
        echo json_encode($list);
    }

    function proposeAddRequest(){
        extract($_POST);
        $request = DB::find('requests',$request_id);
        $propose = DB::find('proposes',$propose_id);
        $user = DB::find('users',$request->requester_id);

        $sum = 0;
        $item = json_decode($propose->item_list);
        foreach($item as $i){$sum += $i->sum;}

        $sql = "UPDATE requests SET `type`=? WHERE id = ?";
        DB::query($sql,["end",$request_id]);

        $sql = "INSERT INTO buys(`delivery_date`,`delivery_time`,`buyer_name`,`buyer_id`,`buyer_zip_code`,`buyer_address`,`buyer_detail_address`,`buy_list`,`buy_time`,`buy_sum`) VALUES(?,?,?,?,?,?,?,?,?,?)";
        DB::query($sql,[date('Y-m-d'),date('H:i:s'),$user->user_name,$user->id,$user->zip_code,$user->address,$user->detail_address,$propose->item_list,date('Y-m-d H:i:s'),$sum]);

        echo json_encode($_POST);
    }
}