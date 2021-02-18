<?php

session_start();
define("ROOT",dirname(__DIR__));
define("SRC",ROOT."/src");
define("VIEW",SRC."/View");

include_once SRC."/autoload.php";
include_once SRC."/helper.php";
include_once SRC."/web.php";