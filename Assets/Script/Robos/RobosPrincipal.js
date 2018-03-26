#pragma strict
private var StartingX:float;
var Limite:float;
var esquerda:boolean;
var andando:boolean;
var vel: float;
private var elemento:String;
private var tempo:float;
private var scaleTextoDefault:float;
var roboAzul:Sprite;

var mostraTexto:GameObject;
function Start () {
	//transform.GetComponent("TabelaPeriodica").SendMessage("geraElemento",this.gameObject);
	StartingX = this.gameObject.transform.position.x;
	scaleTextoDefault = mostraTexto.transform.localScale.x;
	resetComportamento();
}

function mudaSprite(){
 	GetComponent(SpriteRenderer).sprite = roboAzul;
}
function Update () {
	comportamento();
	
}
function setElemento(element:String){
	elemento = element;
	mostraTexto.GetComponent(UI.Text).text = elemento;
}
function setTag(tagui:String){
	this.gameObject.tag = tagui;
}


function comportamento(){
	if (this.gameObject.transform.position.x >= StartingX + Limite){
		esquerda = !esquerda;
	}
	else if (this.gameObject.transform.position.x <= StartingX - Limite){
		esquerda = !esquerda;
	}
	if(andando){
		if(esquerda){
			if (this.gameObject.transform.localScale.x > 0){
				this.gameObject.transform.localScale.x = -this.gameObject.transform.localScale.x;
				mostraTexto.gameObject.transform.localScale.x = -mostraTexto.gameObject.transform.localScale.x;
			}
			this.gameObject.transform.position.x -= vel;
		}
		else{
			if (this.gameObject.transform.localScale.x < 0){
				this.gameObject.transform.localScale.x = -this.gameObject.transform.localScale.x;
				mostraTexto.gameObject.transform.localScale.x = -mostraTexto.gameObject.transform.localScale.x;
			}
			this.gameObject.transform.position.x += vel;		
		}
	}
	if(tempo > 2){
		resetComportamento();
		tempo = 0;
	}
	tempo += Time.deltaTime;
}
function resetComportamento(){
	if(Random.Range(0,100) < 15){
		andando =  false;
	}
	else{
		andando =  true;
	}
	if(Random.Range(0,100) < 50){
		esquerda =  false;
	}
	else{
		esquerda =  true;
	}
}