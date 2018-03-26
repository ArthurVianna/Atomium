#pragma strict

	public class Quest2{
		private var ask:String;
		private var cor:String;
		private var alt:String[];
		public function Quest2(questao:String, correta:String, alternativa:String[]){
			ask = questao;
			cor = correta;
			alt = alternativa;
		}
		public function getPergunta(){
			return ask;
		}
		public function getCorreta(){
			return cor;
		}
		public function getAlternativa(n:int){
			return alt[n];
		}
		

	}

///////////////////////////////////////////////////////////////////

private var questoes:Quest2[];
var tempoLimiteEmS:float;
var botoes:GameObject[];
var questao:GameObject;
var tempoNoCanvas:GameObject;
var pontuacao:GameObject;
var ponto:int;
var certo : AudioClip;
var errado : AudioClip;
var fase1: boolean;
private var respostaCerta:int;// alternativa certa
private var cont:int;
private var tempo:float;
private var qualQuestao:int;
private var vidas:int;
function Start () {
ponto = 0;
vidas = 5;
questoes = new Quest2[11];
questoes[0] = new Quest2("Os elementos O (Z = 8, A = 16) e O (Z = 8, A = 17) são:", "isótopos",geraAlt("isótonos","isóbaros"," isoeletrônicos"));
questoes[1] = new Quest2("Os átomos  H(Z = 1, A = 1), H(Z = 1, A = 2) e H(Z = 1, A = 3) são:", "isótopos",geraAlt("isóbaros","isóbaros","isótonos"));
questoes[2] = new Quest2("Isótopos são átomos com:", "mesmo número de prótons",geraAlt("mesmo número de elétrons","número de prótons diferentes","mesmo número de massa"));
questoes[3] = new Quest2("Isóbaros são átomos com:", "mesmo número de massa",geraAlt("mesmo número atômico","mesmo número de prótons","mesmo número de elétrons"));
questoes[4] = new Quest2("Isótonos são átomos com mesmo número de:", "nêutrons",geraAlt("massa","prótons ","elétrons"));
questoes[5] = new Quest2("Os átomos Cl(Z = 17, A = 37) e Ca(Z = 20, A = 40) são:", "isótonos",geraAlt("isóbaros","isótopos","isoeletrônicos"));
questoes[6] = new Quest2("Átomos de um mesmo elemento químico têm sempre o mesmo número de ___ e, portanto, o mesmo número ___", "prótons, atômico",geraAlt("elétrons, de nêutrons","nêutrons, atômico","massa, de nêutrons"));
questoes[7] = new Quest2("Quantos nêutrons possui o seguinte elemento Cl(Z = 17, A = 37)", "20",geraAlt("54","30","14"));
questoes[8] = new Quest2("Quantos nêutrons possui o seguinte elemento O(Z = 8, A = 16)", "8",geraAlt("54","30","14"));
questoes[9] = new Quest2("Um átomo é isóbaro de O (Z = 8, A = 16) e isótopo de Mg (Z = 12, A = 24) quantos nêutrons ele possui", "4",geraAlt("28"," 8"," 20"));
questoes[10] = new Quest2("Um átomo é isótopo de Cl(Z = 17, A = 37) e isótono de Mg (Z = 12, A = 24) quantos elétrons ele possui", "17",geraAlt("5"," 10"," 13"));

tempo = tempoLimiteEmS;
resetQuestao();
AtualizaPontuacao();
}
function Update(){
	if(tempo < 0 ){// reset questao
		ponto -= 50;
		vidas -=1;
		if (ponto < 0){
			
			ponto = 0;
		}
		
		AtualizaPontuacao();
		resetQuestao();
		tempo = tempoLimiteEmS;
	}
	tempo -= Time.deltaTime;
	tempoNoCanvas.GetComponent(UI.Text).text = "" + Mathf.Round(tempo);
	if(ponto>=500&&fase1==true){
			Application.LoadLevel("Quarto2");
	}
	if(PlayerPrefs.GetInt("bolleanfase4") == 1 && vidas <= 0){
		PlayerPrefs.SetInt("resultado",1);
		Application.LoadLevel(PlayerPrefs.GetInt("scene"));
	}
	else if(ponto>=500&&fase1==false){
		if(PlayerPrefs.GetInt("bolleanfase4") == 1){
			PlayerPrefs.SetInt("resultado",2);
			Application.LoadLevel(PlayerPrefs.GetInt("scene"));
		}
		else{
			Application.LoadLevel(PlayerPrefs.GetInt("scene"));
		}
	}
}
function resetQuestao(){
		tempo = tempoLimiteEmS;
		var q;
		q =Random.Range(0,questoes.Length);
		while (qualQuestao == q){
			q = Random.Range(0,questoes.Length);
		}
		qualQuestao = q;
		
	  	questao.GetComponent(UI.Text).text = questoes[qualQuestao].getPergunta();
		respostaCerta = Random.Range(0,3);
		cont = 0;
		for(var i:int = 0; i < 4; i++){
			if (i == respostaCerta){
			 	botoes[i].GetComponentInChildren(UI.Text).text = questoes[qualQuestao].getCorreta();//alternativas
				
			}
			else{
		  		botoes[i].GetComponentInChildren(UI.Text).text = questoes[qualQuestao].getAlternativa(cont);//alternativas
				cont++;
			}
		}
}
function geraAlt(alternativa0:String , alternativa1:String , alternativa2:String){
var arrAlt:String[];
arrAlt = new String[3];
arrAlt[0] = alternativa0;
arrAlt[1] = alternativa1;
arrAlt[2] = alternativa2;
return arrAlt;
}
function GetQuestion(limit:int){
	if (limit > questoes.Length){
		return questoes[Random.Range(0,questoes.Length)];
	}
}
function ClicoBotao(numeroBotao:int){
	if(respostaCerta == numeroBotao){
		AudioSource.PlayClipAtPoint(certo,Camera.main.transform.position);
		ponto += 100;
	}
	else{
		AudioSource.PlayClipAtPoint(errado,Camera.main.transform.position);
		ponto -= 50;
		vidas -=1;
		if (ponto < 0){
			ponto = 0;
		}
	}
	AtualizaPontuacao();
	resetQuestao();
	tempo = tempoLimiteEmS;
}
function AtualizaPontuacao(){
	pontuacao.GetComponent(UI.Text).text =  "" + ponto;
}