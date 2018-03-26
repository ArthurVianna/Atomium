var acel:float;
var vel:float;
private var limitVel: float;

var alo:boolean;
function Start () {
	acel = 0.2;
	vel = 0;
	limitVel = 2.0;
	alo = false;
	
}

function Update () {
	if(alo){
		
		if (vel > -limitVel){
			vel -= acel;
		}
		this.gameObject.transform.position.x += vel/10;
		if (this.gameObject.transform.localScale.x > 0){
			this.gameObject.transform.localScale.x = -this.gameObject.transform.localScale.x;
					
		}
	
		
		
	}
}
function anda () {
	alo = true;
}