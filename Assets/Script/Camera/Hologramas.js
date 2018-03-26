#pragma strict

public var hologramas:GameObject[];
public var atual:GameObject;
public var atualNumero:int;
private var muda:boolean;
public var ondeInstancia:GameObject;
public var fase:String;
function Start () {
	atualNumero = 0;
	atual = Instantiate(hologramas[atualNumero],ondeInstancia.transform.position,Quaternion.identity);
}

function Update () {
	if (Input.anyKeyDown){
		muda = true;
		atualNumero+= 1;
	}
	if(atualNumero >= hologramas.Length){
		Application.LoadLevel(fase);
	}
	else if(atualNumero < 0){
		atualNumero = hologramas.Length;
	}
	if(muda){
		muda = false;
		Destroy(atual);
		atual = Instantiate(hologramas[atualNumero],ondeInstancia.transform.position,Quaternion.identity);
	}
}