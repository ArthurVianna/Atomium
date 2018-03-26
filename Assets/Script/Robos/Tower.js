#pragma strict
var puz:int;
var fase:GameObject;
var torre:int;
function Start () {

}

function Update () {
if(PlayerPrefs.GetInt("torre"+torre.ToString())==1){
gameObject.collider2D.enabled = false;
}
}
function OnTriggerEnter2D(coll: Collider2D){
	if (coll.gameObject.tag == "Player"&&PlayerPrefs.GetInt("torre"+torre.ToString())==0){
	puz = Random.Range(6f,9f);
	PlayerPrefs.SetInt("torre"+torre.ToString(),1); 
	Application.LoadLevel(puz);
	}

}