<?php
include "../../includes/lolcalculator.global.inc";
include INCLUDE_PATH . "/dataService.inc";

$response = array(
    'status' => 1
);

//echo json_encode($data);

try {
  ////CSRFHandler::getInstance()->validateToken();
  //read
  $service = new dataService();
  if (!empty($_GET['function'])) {
    if (method_exists('dataService',$_GET['function'])) {

      if (!empty($_GET['data'])) {
        $data = $_GET['data'];
      /*  echo '<pre>';
        var_dump($data);
        echo '</pre>';*/
        $data = json_decode($data,true);
        $response['data'] = $service->{$_GET['function']}($data);
      } else {
        $response['data'] = $service->{$_GET['function']}();
      }
    }
  }
  //write
  if (!empty($_POST['function'])) {
    if (method_exists('dataService',$_POST['function'])) {
    }
  }
} catch (Exception $e) {
    $response['status'] = -1;
    $response['errMsg'] = $e->getMessage();
}
//echo "<h2>what we sent to microprocessor:</h2>";
//$response['debug'] = ''

echo json_encode($response);

?>
