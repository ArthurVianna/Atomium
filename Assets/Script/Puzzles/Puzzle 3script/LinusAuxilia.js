#pragma strict
import UnityEngine.UI;
public var puzzle:LinusResolver;
public var but:Button;
function Start () {
	
}

function Update () {

}
function manda(){
	puzzle.setNumeroNoUltimo(int.Parse(this.gameObject.name));
}
function seta(puz:LinusResolver){
	puzzle = puz;
	but = this.gameObject.GetComponent(UI.Button);
	but.onClick.AddListener(manda);
}