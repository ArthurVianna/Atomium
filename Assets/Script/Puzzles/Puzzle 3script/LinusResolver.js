#pragma strict
import UnityEngine.UI;

public class Elemento{
		private var numeroAtomico:int;
		private var sigla:String;
		public function Elemento(nAtomico:int, sig:String){
			numeroAtomico = nAtomico;
			sigla = sig;
		}
		public function getSigla(){
			return sigla;
		}
		public function getNumeroAtomico(){
			return numeroAtomico;
		}
		
		

	}

////////////////////////////////////

public var botoes:GameObject[];
public var limite: int;
private var ultimoBotao:GameObject;
private var atualElemento:int;
var linusLinha:GameObject;
var nomeElemento:GameObject;
var numeroElemento:GameObject;
var canvasInstancia:GameObject[];
private var ultimoInstanciado:GameObject;
private var but:LinusAuxilia;
private var i:int;
private var tex:UI.Text;
private	var str:String;
private var linusConca:String;
private var soma:int;
private var tempo:float;
private var elementos:Elemento[];
function Start () {
	elementos = new Elemento[16];
	elementos[1] = new Elemento(6,"C");
	elementos[2] = new Elemento(14,"Si");
	elementos[3] = new Elemento(32,"Ge");
	elementos[4] = new Elemento(50,"Sn");
	elementos[5] = new Elemento(82,"Pb");
	elementos[6] = new Elemento(7,"N");
	elementos[7] = new Elemento(15,"P");
	elementos[8] = new Elemento(33,"As");
	elementos[9] = new Elemento(51,"Sb");
	elementos[10] = new Elemento(83,"Bi");
	elementos[11] = new Elemento(8,"O");
	elementos[12] = new Elemento(16,"S");
	elementos[13] = new Elemento(34,"Se");
	elementos[14] = new Elemento(52,"Te");
	elementos[15] = new Elemento(84,"Po");
	ultimoInstanciado = null;
	tempo = 60;
	setaElemento();
}
function setaElemento(){
		var q;
		q =Random.Range(0,elementos.Length);
		while (atualElemento == q){
			q = Random.Range(0,elementos.Length);
		}
		atualElemento = q;
		nomeElemento.GetComponent(UI.Text).text = elementos[atualElemento].getSigla();
		numeroElemento.GetComponent(UI.Text).text = elementos[atualElemento].getNumeroAtomico().ToString();
		limite =  elementos[atualElemento].getNumeroAtomico();
}
function Update () {
	tempo -= Time.deltaTime;
	if(tempo <=0 && PlayerPrefs.GetInt("bolleanfase4") == 1){
	//perdeu :(
		PlayerPrefs.SetInt("resultado",1);
		Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}
	soma = 0;
	linusConca = "";
	for(i = 0; i <19; i++){
		tex = botoes[i].transform.Find("Text").GetComponent(UI.Text);
		str = tex.text.Remove(0,2);
		if(str != "" && str != " "){
			linusConca += tex.text + " - "; 
			soma += int.Parse(str);
			if (tex.text.Contains("s") && int.Parse(str) < 2){
				break;
			}
			if (tex.text.Contains("p") && int.Parse(str) < 6){
				break;
			}
			if (tex.text.Contains("d") && int.Parse(str) < 10){
				break;
			}
			if (tex.text.Contains("f") && int.Parse(str) < 14){
				break;
			}
		}
		else{
			break;
		}
		
	}
	linusLinha.GetComponent(UI.Text).text = linusConca;
	if (soma == limite){
		if(PlayerPrefs.GetInt("bolleanfase4") == 1){
			PlayerPrefs.SetInt("resultado",2);
		}
		Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}	
}
function clicouEm(botao:GameObject){
	ultimoBotao = botao;
	if (ultimoInstanciado != null){
	Destroy(ultimoInstanciado);
	}
	if (botao.gameObject.name.Contains("s")){
		ultimoInstanciado = Instantiate(canvasInstancia[0],this.transform.position,Quaternion.identity);
		for (i = 1; i <=2; i++){
			but = ultimoInstanciado.transform.Find(""+i).gameObject.GetComponent("LinusAuxilia");
			but.seta(this);
		}
	}
	else if (botao.gameObject.name.Contains("p")){
		ultimoInstanciado = Instantiate(canvasInstancia[1],this.transform.position,Quaternion.identity);
		for (i = 1; i <=6; i++){
			but = ultimoInstanciado.transform.Find(""+i).gameObject.GetComponent("LinusAuxilia");
			but.seta(this);
		}
	
	}
	else if (botao.gameObject.name.Contains("d")){
		ultimoInstanciado = Instantiate(canvasInstancia[2],this.transform.position,Quaternion.identity);
		for (i = 1; i <=10; i++){
			but = ultimoInstanciado.transform.Find(""+i).gameObject.GetComponent("LinusAuxilia");
			but.seta(this);
		}
	}
	else if (botao.gameObject.name.Contains("f")){
		ultimoInstanciado = Instantiate(canvasInstancia[3],this.transform.position,Quaternion.identity);
		for (i = 1; i <=14; i++){
			but = ultimoInstanciado.transform.Find(""+i).gameObject.GetComponent("LinusAuxilia");
			but.seta(this);
		}
	}
	
}
function setNumeroNoUltimo(numero:int){
	Destroy(ultimoInstanciado);
	ultimoInstanciado = null;
	if (ultimoBotao != null){
		
		tex = ultimoBotao.transform.Find("Text").GetComponent(UI.Text);
		tex.text = ultimoBotao.name + numero;
		
	}
}
