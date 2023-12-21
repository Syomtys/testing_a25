<?
class get_data_db {
	private $db;
	
	function __construct() {
		include('../config.php');
		$this->db = $db;
	}
	public function set_header(){
		header('Access-Control-Allow-Origin: http://localhost:8080');
		header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		header('Content-Type: application/json');
	}
	private function a25_settings(){
		$query = $this->db->query('SELECT * FROM a25_settings');
		$data = $query->fetchAll(PDO::FETCH_ASSOC);
		foreach ($data as $key => $element){
			if ($element['set_value']){
				$data[$key]['set_value'] = unserialize($element['set_value']);
			} else {
				$data[$key]['set_value'] = false;
			}
		}
		return $data;
	}
	private function a25_products(){
		$query = $this->db->query('SELECT * FROM a25_products');
		$data = $query->fetchAll(PDO::FETCH_ASSOC);
		// print_r($data);
		foreach ($data as $key => $element){
			if ($element['TARIFF']){
				$data[$key]['TARIFF'] = unserialize($element['TARIFF']);
			} else {
				$data[$key]['TARIFF'] = false;
			}
		}
		// print_r($data);
		return $data;
	}
	public function return_json($success,$return_data){
		$response = array(
		  'a25_settings' => $success,
		  'a25_products' => $return_data
		);
		echo (json_encode($response));
	}
	
	public function run(){
		$this->set_header();
		$a25_settings = $this->a25_settings();
		$a25_products = $this->a25_products();
		$this->return_json($a25_settings, $a25_products);
	}
}
$start = new get_data_db;
$start->run($db);
?>