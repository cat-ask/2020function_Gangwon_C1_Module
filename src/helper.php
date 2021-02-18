<?php

use App\DB;

function user(){
    if(isset($_SESSION['user'])) return $_SESSION['user'];
    else return false;
}

function normal(){
    return user() && user()->type == "normal";
}

function consumer(){
    return user() && user()->type == "consumer";
}

function admin(){
    return user() && user()->type == "admin";
}

function view($viewName,$data=[]){
    extract($data);
    include_once VIEW."/header.php";
    include_once VIEW."/$viewName.php";
    include_once VIEW."/footer.php";
}

function go($url,$msg=""){
    echo "<script>";
    echo "alert('$msg');";
    echo "location.href='$url';";
    echo "</script>";
}

function back($msg=""){
    echo "<script>";
    echo "alert('$msg');";
    echo "history.back();";
    echo "</script>";
}