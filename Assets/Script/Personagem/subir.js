#pragma strict
var alo:boolean;
function Start () {
	alo = false;
}

function Update () {
	if (alo){
		this.gameObject.transform.position.y += 0.05;
	}
}
function funciona(){
alo = true;
}