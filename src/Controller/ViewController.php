<?php

namespace Controller;

use App\DB;

class ViewController{
    function index(){
        view("index");
    }

    function shopping(){
        view("shopping");
    }

    function admin(){
        view("admin");
    }

    function login(){
        view("login");
    }

    function logout(){
        if(isset($_SESSION['user'])){
            session_destroy();
            go("/","로그아웃 되었습니다.");
        }
    }

    function propose(){
        $result = [];
        $sql = "SELECT U.user_id AS requester_name, R.* FROM users AS U, requests AS R WHERE R.requester_id = U.id AND R.type = ? ORDER BY request_time DESC";
        $list = DB::fetchAll($sql,["requesting"]);

        foreach($list as $item){
            $sql = "SELECT * FROM proposes WHERE proposer_id = ? AND request_id = ?";
            $flag = DB::fetch($sql,[user()->id,$item->id]);
            if(!$flag) $result[] = $item;
        }

        view("propose",$result);
    }

    function suggestion($id){
        $request = DB::find('requests',$id);
        $request->min = $request->price_limit - $request->error_range;
        $request->max = $request->price_limit + $request->error_range;
        view("suggestion",[$request]);
    }

    function request(){
        $sql = "SELECT * FROM requests WHERE requester_id = ? AND `type` = ? ORDER BY request_time DESC";
        $list = DB::fetchAll($sql,[user()->id,"requesting"]);

        view("request",$list);
    }

    function request_detail($id){
        $request = DB::fetch("SELECT * FROM requests WHERE id = ?",[$id]);
        if(!isset($request)) go("/request","해당하는 요청이 존재하지않습니다.");
        if($request->requester_id !== user()->id) go("/request","해당 요청에 접근할 수 없습니다.");

        $sql = "SELECT R.request_name, P.*,U.user_id AS proposer_name FROM requests AS R, proposes AS P,users AS U WHERE R.id = P.request_id AND U.id = P.proposer_id AND R.id = ? ORDER BY propose_time DESC";
        $result = DB::fetchAll($sql,[$id]);

        view("requestDetail",$result);
    }

    function join(){
        view("join");
    }
}