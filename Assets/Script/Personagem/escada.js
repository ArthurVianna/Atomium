#pragma strict
var acel:float;
var vel:float;
private var limitVel: float;
var anim:Animator;
var alo:boolean;
function Start () {
	acel = 0.2;
	vel = 0;
	limitVel = 1;
	alo = true;
	anim = this.GetComponent("Animator");
}
var proxFase:int;
function Update () {
	if(alo){
	if (vel > -limitVel){
		vel -= acel;
	}
	this.gameObject.transform.position.x -= vel/10;
	if (this.gameObject.transform.localScale.x > 0){
		this.gameObject.transform.localScale.x = this.gameObject.transform.localScale.x;
				
	}
	anim.SetFloat("Vel",-vel);
	}
	else{
	anim.SetFloat("Vel",0);
	}
}
function OnTriggerEnter2D(coll: Collider2D){
	if ( coll.gameObject.tag.Contains("chao")){
		
		alo = false;
		transform.parent = coll.transform;
		coll.gameObject.GetComponent("subir").SendMessage("funciona");
	}

	if ( coll.gameObject.tag.Contains("morte")){
		Application.LoadLevel(proxFase);
	}

}