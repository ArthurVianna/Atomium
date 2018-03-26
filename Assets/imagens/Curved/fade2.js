#pragma strict

var timer : float = 10.0;

function Start () 
{
	renderer.material.color.a = 0;
	
}

function Update()
{

	timer = timer - Time.deltaTime;
	
	if(timer >= 0)
	{
		renderer.material.color.a += 0.3 * Time.deltaTime;
		if(renderer.material.color.a >= 1){
		Application.LoadLevel("tfim");
		}
	}
	
	if(timer <= 0)
	{
		timer = 0;
		Destroy(gameObject);
	}
	
	
}
