<?
class get_summ {
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
	private function filter_post($data){
		$ret_arr = [
			'days' => $data['days'],
			'dop' => $data['dop_price'],
			'product' => $data['product']
		];
		return $ret_arr;
	}
	private function a25_products($prod){
		$sql = "SELECT * FROM a25_products WHERE NAME='$prod'";
		$query = $this->db->query($sql);
		$data = $query->fetchAll(PDO::FETCH_ASSOC);
		$data = $data[0];
		if ($data['TARIFF'] != NULL){
			$data['TARIFF'] = unserialize($data['TARIFF']);
		} else {
			$data['TARIFF'] = false;
		}
		return $data;
	}
	private function check_tariff($tariff,$days){
		$price = 0;
		foreach ($tariff as $key => $value) {
			if ((int)$days >= (int)$key) {
				$price = (int)$value;
			}
		}
		return $price;
	}
	private function calculation($prod,$data){
		if ($prod['TARIFF']){
			$price = $this->check_tariff($prod['TARIFF'], $data['days']);
		} else {
			$price = (int)$prod['PRICE'];
		}
		return $data['days']*($price+$data['dop']);
	}
	public function return_json($return_data){
		$response = array(
		  'price' => $return_data
		);
		echo (json_encode($response));
	}
	public function run(){
		$this->set_header();
		$post_data = $this->filter_post($_POST);
		$a25_products = $this->a25_products($post_data['product']);
		$price = $this->calculation($a25_products,$post_data);
		// $a25_products = $post_data;
		
		$this->return_json($price);
	}
}
$start = new get_summ;
$start->run($db);
?>