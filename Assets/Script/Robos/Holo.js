#pragma strict
var roboAzul:Sprite;
var nome: GameObject;
var x: float;
var y: float;
function Start () {

}
function mudaSprite(){
 	GetComponent(SpriteRenderer).sprite = roboAzul;
}
function Update () {

}
function OnTriggerEnter2D(coll: Collider2D){
	if (coll.gameObject.tag == "Player"){
		GetComponent(SpriteRenderer).sprite = roboAzul;
		transform.position.x = x;
		transform.position.y = y;
		nome.transform.position.z = 2.50;
	}

}