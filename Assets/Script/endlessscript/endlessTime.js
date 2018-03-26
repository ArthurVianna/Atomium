#pragma strict
var timeLeft:float;
function Start () {

}

function Update () {
timeLeft -= Time.deltaTime;
if(timeLeft < 0){
Application.LoadLevel("t34");
}
}