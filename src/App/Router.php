<?php

namespace App;

class Router{
    static $pages = [];
    static function __callStatic($name,$args){
        if(strtolower($_SERVER['REQUEST_METHOD']) == $name) self::$pages[] = $args;
    }    

    static function start(){
        $currentURL = explode("?",$_SERVER['REQUEST_URI'])[0];
        foreach(self::$pages as $page){
            $url = $page[0];
            $action = explode("@",$page[1]);
            $permission = isset($page[2]) ? $page[2] : null;

            $regex = preg_replace("/({[^\/]+})/","([^/]+)",$url);
            $regex = preg_replace("/\//","\\/",$regex);

            if(preg_match("/^{$regex}$/",$currentURL,$matches)){
                unset($matches[0]);

                if($permission){
                    if($permission == "login" && !user()) go("/","로그인 후 접근할 수 있습니다.");
                    if($permission == "logout" && user()) go("/","로그인 후 접근할 수 없습니다.");
                    if($permission == "user" && (!user() || admin())) go("/","일반 회원 혹은 컨슈머 회원만 접근할 수 있습니다.");
                    if($permission == "normal" && !normal()) go("/","일반 회원만 접근할 수 있습니다.");
                    if($permission == "consumer" && !consumer()) go("/","컨슈머 회원만 접근할 수 있습니다.");
                    if($permission == "admin" && !admin()) go("/",'관리자만 접근할 수 있습니다.');
                }

                $conName = "Controller\\$action[0]";
                $con = new $conName();
                $con->{$action[1]}(...$matches);
                return;
            }
        }
    }
}