#pragma strict
private var cair:boolean;
var tempoCair:float;
private var tempo:float;
function Start () {

}

function Update () {
	if(cair){
		tempo += Time.deltaTime;
	}
	if (tempo > tempoCair){
		this.transform.position.y -= 0.1;
	}
}
function OnTriggerEnter2D(coll :Collider2D){
	if(coll.gameObject.tag == "Player"){
		transform.DetachChildren();
		cair = true;
		
	}
	if(coll.gameObject.tag == "morte"){
		Destroy(this.gameObject);
	}

}
