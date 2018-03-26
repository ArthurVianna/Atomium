#pragma strict
function Start () {
PlayerPrefs.SetInt("torre1",0);
PlayerPrefs.SetInt("torre2",0); 
PlayerPrefs.SetInt("torre3",0);  
PlayerPrefs.SetInt("vida",3);
PlayerPrefs.SetInt("life",100);
PlayerPrefs.SetInt("lifeE",100);
}

function Update () {
if (Input.anyKeyDown){
	Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}
}