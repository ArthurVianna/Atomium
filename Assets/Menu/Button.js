var levelToLoad : String;
var soundhover : AudioClip;
var QuitButton : boolean = false;
function OnMouseEnter(){
audio.PlayOneShot(soundhover);
}
function OnMouseUp(){
yield new WaitForSeconds(0.35);
if(QuitButton){
Application.Quit();
}
else{
Application.LoadLevel(levelToLoad);
}
}
@script RequireComponent(AudioSource)