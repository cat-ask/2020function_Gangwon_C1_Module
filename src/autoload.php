<?php

function classLoader($c){
    include_once SRC."/$c.php";
}

spl_autoload_register("classLoader");