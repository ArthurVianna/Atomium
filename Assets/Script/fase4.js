#pragma strict
private var relogio:float;

function Start () {
	relogio = 0;
	if (PlayerPrefs.GetInt("bolleanfase4") != 1){
		PlayerPrefs.SetInt("bolleanfase4",1);
		PlayerPrefs.SetInt("vidaInimigo",3);
		PlayerPrefs.SetInt("vida",3);
		PlayerPrefs.SetInt("resultado",0);
	}
}

function Update () {
	relogio += Time.deltaTime;
	if (PlayerPrefs.GetInt("resultado") ==1){
		PlayerPrefs.SetInt("vida",PlayerPrefs.GetInt("vida")-1);
		PlayerPrefs.SetInt("resultado",0);
	}
	else if (PlayerPrefs.GetInt("resultado") ==2){
		PlayerPrefs.SetInt("vidaInimigo",PlayerPrefs.GetInt("vidaInimigo")-1);
		PlayerPrefs.SetInt("resultado",0);
	}
	if(PlayerPrefs.GetInt("vidaInimigo") <= 0){
			//ganhou :) GG WP
			Debug.Log("ganhou :) GG WP");
			PlayerPrefs.SetInt("bolleanfase4",0);
			Application.LoadLevel("fimGeral"); 
	}
	if(PlayerPrefs.GetInt("vida") <= 0){
		 PlayerPrefs.SetInt("scene",Application.loadedLevel);
		 PlayerPrefs.SetInt("bolleanfase4",0);
		 Application.LoadLevel("GameOver"); 
	}
	if(relogio >=	5.0){
		if(Random.Range(0,12) <= 4){
			PlayerPrefs.SetInt("scene",Application.loadedLevel);
			Application.LoadLevel(7);
		}
		else if(Random.Range(0,8)<= 4){
			PlayerPrefs.SetInt("scene",Application.loadedLevel);
			Application.LoadLevel(7);
		}
		else{
			PlayerPrefs.SetInt("scene",Application.loadedLevel);
			Application.LoadLevel(7);
		}
	}
}