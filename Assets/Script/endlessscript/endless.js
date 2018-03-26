#pragma strict

public var player : GameObject;
public var fim: GameObject;
public var terrenos : GameObject[];


function Start () {
	player = GameObject.FindGameObjectWithTag("Player"); 
}

function Update () {

	if(player.transform.position.x > this.transform.position.x + 50){
		if (Random.Range(0,9) < 5){
			var temp = fim.transform.position.x;
			Instantiate(terrenos[0],new Vector2(temp+50,transform.position.y),transform.rotation);
		}
		else{
			var temp2 = fim.transform.position.x;
			Instantiate(terrenos[0],new Vector2(temp2+50,transform.position.y),transform.rotation);	
		}
		Destroy(this.gameObject);
	}
}
