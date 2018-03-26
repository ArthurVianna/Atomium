#pragma strict
private var familias:String[,];
private var elemento:int;
private var familia:int;
private var maxFamilia:int;
public var robo:GameObject;
function Start () {

	maxFamilia = 2;
	familias = new String[maxFamilia,6];
	familias[0,0] = "Li";
	familias[0,1] = "Na";
	familias[0,2] = "K";
	familias[0,3] = "Rb";
	familias[0,4] = "Cs";
	familias[0,5] = "Fr";
	//---------------------//
	familias[1,0] = "Be";
	familias[1,1] = "Mg";
	familias[1,2] = "Ca";
	familias[1,3] = "Sr";
	familias[1,4] = "Ba";
	familias[1,5] = "Ra";
	
	familia = Random.Range(0,2);
	elemento = Random.Range(0,6);
	robo.transform.GetComponent("RobosPrincipal").SendMessage("setElemento",familias[familia,elemento]);
	robo.transform.GetComponent("RobosPrincipal").SendMessage("setTag",(familia +1) + "A");
}

function Update () {

}
function geraElemento(){
	
}