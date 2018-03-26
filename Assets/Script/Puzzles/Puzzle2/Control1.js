#pragma strict
public var arr : Sprite[];
var respawn :GameObject;
var rand : int;
var pontos : int;
var textObject:GameObject;
var certo : AudioClip;
var errado : AudioClip;
var fase2: boolean;
private var tempo:float;
private var sprote : SpriteRenderer;
function Start () {
	rand = Random.Range(1f,12f);
	tempo = 120;
	sprote = this.GetComponent("SpriteRenderer");
	textObject = GameObject.Find('pontos');
}

function Update () {
	tempo -= Time.deltaTime;
	if(tempo <=0 && PlayerPrefs.GetInt("bolleanfase4") == 1){
		//perdeu :(
		PlayerPrefs.SetInt("resultado",1);
		Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}
	sprote.sprite = arr[rand];
	this.transform.Translate(new Vector3(0,-0.1f,0));
	if(Input.GetKey("a")){
	this.transform.Translate(-0.1,0,0);
	}
	
	if(Input.GetKey("d")){
	this.transform.Translate(0.1,0,0);
	}
	if(pontos>=500&&fase2==true){
			Application.LoadLevel("t23");
	}
	if(pontos>=500&&fase2==false){
		if(PlayerPrefs.GetInt("bolleanfase4") == 1){
			PlayerPrefs.SetInt("resultado",2);
		}
		Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}
}
function OnTriggerEnter2D(other: Collider2D) {
	if((other.gameObject.tag == "F1A" && rand <= 7) ||(other.gameObject.tag == "F2A" && rand > 7)){
	    AudioSource.PlayClipAtPoint(certo,Camera.main.transform.position);
	  	Debug.Log(pontos);
		pontos+=50;
		textObject.GetComponent(UI.Text).text = "Pontos: "+pontos;
	}
	if(other.gameObject.tag == "Finish"){
		AudioSource.PlayClipAtPoint(errado,Camera.main.transform.position);
	  	Debug.Log(pontos);
		textObject.GetComponent(UI.Text).text = "Pontos: "+pontos;
	}
	this.transform.position = respawn.transform.position;
	rand = Random.Range(1f,12.0f);
	Debug.Log(rand);
	if (rand == 13f){
		rand = 12f;
	}
}