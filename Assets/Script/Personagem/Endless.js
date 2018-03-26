#pragma strict

var acel:float;
var forcaPulo :float;
private var puloTemp: float;
private var pulo:float;
var vel:float;
private var ar :boolean;
private var limitVel: float;
private var vida:int;
var puloDuplo:int;
var coracao:Animator;
var respawn:GameObject;
var anim:Animator;
var opcoes:String[];
var luvasNoCanvas:GameObject;
var atualOpcao:int;
var footstep : AudioClip;
var jump : AudioClip;

//354,2.5
var textObject:GameObject; // you can also just drag it if its not prefabbed


function Start () {
	
	PlayerPrefs.SetInt("scene",Application.loadedLevel); 
	coracao = GameObject.Find("Vida").GetComponent("Animator");
	acel = 0.2;
	vel = 0;
	vida = 3;
	puloDuplo = 0;
	limitVel = 1.3;
	forcaPulo = 3.2;
	puloTemp = 0;
	atualOpcao = 0;
	anim = this.GetComponent("Animator");
	coracao.SetInteger("Vida",vida);
	textObject = GameObject.Find('Texto');
	if(PlayerPrefs.GetInt("torre"+"1")==1){
	
	vida = PlayerPrefs.GetInt("vida");
	}else{
	PlayerPrefs.SetInt("x",this.gameObject.transform.position.x ); 
	PlayerPrefs.SetInt("y",this.gameObject.transform.position.y ); 
	vida = PlayerPrefs.GetInt("vida");
	}
}

function Update () {
	if (Input.GetKeyDown("q")){
		atualOpcao -=1;
		if (atualOpcao < 0){
			atualOpcao = opcoes.Length - 1;
		}
		textObject.GetComponent(UI.Text).text = opcoes[atualOpcao];
		
	}
	else if (Input.GetKeyDown("e")){
	atualOpcao +=1;
	if (atualOpcao >= opcoes.Length){
			atualOpcao = 0;
		}
	textObject.GetComponent(UI.Text).text = opcoes[atualOpcao];
		
		
	}else if(Input.GetKeyDown("k")){
		respawnar();
	}
		if (vel < limitVel){
			vel += acel;
		}
		this.gameObject.transform.position.x += vel/10;
		if (this.gameObject.transform.localScale.x < 0){
			this.gameObject.transform.localScale.x = -this.gameObject.transform.localScale.x;
		}
		anim.SetFloat("Vel",vel);
	
	if (Input.GetKeyDown("w") || Input.GetKeyDown("up")&& puloDuplo <2){
		transform.parent = null;
		puloDuplo++;
		rigidbody2D.AddForce(new Vector2(0, 10)*forcaPulo, ForceMode2D.Impulse);
		AudioSource.PlayClipAtPoint(jump, transform.position);
	}
}
function OnCollisionEnter2D(coll: Collision2D){
	if (coll.gameObject.tag == "chao"){
	   // AudioSource.PlayClipAtPoint(footstep, transform.position);
		puloDuplo = 0;
	}
	if (coll.gameObject.tag == "chao2"){
	    //AudioSource.PlayClipAtPoint(footstep, transform.position);
		puloDuplo = 0;
		transform.parent = coll.transform;
	}else{
	transform.parent = null;
	}
	if (coll.gameObject.tag == "Finish"){
	//Application.LoadLevel("Obrigado");
	}
}
function OnCollision2D(coll: Collision2D){
	if (coll.gameObject.tag == "chao"){
		puloDuplo = 0;
	}
	if (coll.gameObject.tag == "chao2"){
		puloDuplo = 0;
	}
}

function OnTriggerEnter2D(coll: Collider2D){
	
	if ( coll.gameObject.name.Contains("robo")){
		if(coll.gameObject.tag == opcoes[atualOpcao]){
		coll.gameObject.rigidbody2D.collider2D.enabled = false;
		coll.gameObject.rigidbody2D.gravityScale = 0;
		coll.gameObject.transform.position.z = 1;
		coll.gameObject.GetComponent("RobosPrincipal").SendMessage("mudaSprite");
		}else{
		respawnar();
		}
	}
	
	
	if ( coll.gameObject.name.Contains("Fimfase1")){
	PlayerPrefs.SetInt("scene",2); 
	Application.LoadLevel("puzzle1");
	}
	if ( coll.gameObject.name.Contains("Fimfase2")){
	PlayerPrefs.SetInt("scene",3); 
	Application.LoadLevel("puzzle2");
	}
	if(coll.gameObject.tag == "tower"){
	PlayerPrefs.SetInt("x",this.gameObject.transform.position.x ); 
	PlayerPrefs.SetInt("y",this.gameObject.transform.position.y ); 
	PlayerPrefs.SetInt("vida",vida );
	}
	if (coll.gameObject.tag == "vidaExtra"){
		if (vida <3){
			vida += 1;
			coracao.SetInteger("Vida",vida);
		}
	}
	if (coll.gameObject.tag == "morte"){
		respawnar();
	}
	if (coll.gameObject.tag == "Respawn"){
		respawn = coll.gameObject;
	}

}
function respawnar(){
	vida -= 1;
	if(vida<=0){
	 PlayerPrefs.SetInt("scene",Application.loadedLevel); 
	Application.LoadLevel("GameOver");
	}else{
	puloDuplo = 0;
	coracao.SetInteger("Vida",vida);
	transform.parent = null;
	this.transform.position = respawn.transform.position;
	transform.parent = null;
	}
}