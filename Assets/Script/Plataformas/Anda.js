#pragma strict

var cima:boolean;
var vel:float;
var limit:float;
private var volta:boolean;
private var start:float;
function Start () {
	if (cima){
		start = this.transform.position.y;
	}
	else{
		start = this.transform.position.x;
	}
}

function Update () {
	if (cima){
		if(!volta){
			this.transform.position.y += vel;
		}
		else{
			this.transform.position.y -= vel;
		}
		if (this.transform.position.y >= start + limit){
			volta = true;
		}
		if (this.transform.position.y <= start){
			volta = false;
		}
	}
	else{
		if(!volta){
			this.transform.position.x += vel;
		}
		else{
			this.transform.position.x -= vel;
		}
		if(!volta){
			this.transform.position.x += vel;
		}
		else{
			this.transform.position.x -= vel;
		}
		if (this.transform.position.x >= start + limit){
			volta = true;
		}
		if (this.transform.position.x <= start){
			volta = false;
		}
	}
}