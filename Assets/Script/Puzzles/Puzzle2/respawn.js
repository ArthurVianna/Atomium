#pragma strict

function Start () {
	var respawn :GameObject;
	var f1A :GameObject;
	var f2A :GameObject;
}

function Update () {

}
function OnTriggerEnter2D(other: Collider2D) {
	if(other.gameObject.tag == "F1A"){
	other.gameObject.tag = "";
	}
}