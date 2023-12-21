<?
define('USER', '');
define('PASSWORD', '');
define('HOST', '');
define('DATABASE', '');

$db = new PDO("mysql:host=".HOST.";dbname=".DATABASE, USER, PASSWORD);
?>
