<?php

use App\Router;

Router::get("/","ViewController@index");
Router::get("/admin","ViewController@admin");
Router::get("/shopping","ViewController@shopping","user");
Router::get("/join","ViewController@join","logout");
Router::get("/login","ViewController@login","logout");
Router::get("/logout","ViewController@logout","login");
Router::get("/propose","ViewController@propose","consumer");
Router::get("/suggestion/{id}","ViewController@suggestion","consumer");
Router::get("/request","ViewController@request","normal");
Router::get("/request/{id}","ViewController@request_detail","normal");

Router::post("/join","ActionController@joinAdd");
Router::post("/joinCheck",'ActionController@joinCheck');
Router::post("/login","ActionController@login","logout");
Router::post("/userInfo","ActionController@userInfo");
Router::post("/buysInfo","ActionController@buysInfo");
Router::post("/buysAdd","ActionController@buysAdd");
Router::post("/requestAdd","ActionController@requestAdd","normal");
Router::post("/proposeAdd","ActionController@proposeAdd","consumer");
Router::post("/proposeInfo","ActionController@proposeInfo","normal");
Router::post("/proposeAddRequest","ActionController@proposeAddRequest","normal");

Router::start();