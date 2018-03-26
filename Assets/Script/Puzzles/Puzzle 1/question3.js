#pragma strict

	public class Quest3{
		private var ask:String;
		private var cor:String;
		private var alt:String[];
		public function Quest3(questao:String, correta:String, alternativa:String[]){
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

private var questoes:Quest3[];
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
questoes = new Quest3[11];
questoes[0] = new Quest3("O Carbono (C) pertence à família:", "4A",geraAlt("3A","1A","8A"));
questoes[1] = new Quest3("O Hélio (He) pertence ao grupo dos:", "gases nobres",geraAlt("metais","não-metais","não-metais"));
questoes[2] = new Quest3("O Oxigênio (O) está na família:", "6A",geraAlt("1A","7A","2A"));
questoes[3] = new Quest3("Os elementos da família 1A são denominados:", "metais alcalinos",geraAlt("metais alcalinoterrosos","semi-metais","não-metais"));
questoes[4] = new Quest3("Os gases nobres são os elementos localizados na família:", "8A",geraAlt("3A","2A","7A"));
questoes[5] = new Quest3("Os elementos localizados nas famílias de 3B a 2B são denominados:", "elementos de transição",geraAlt("gases nobres","gases","halogênios"));
questoes[6] = new Quest3("Os elementos da família 7A são também chamados de:", "halogênios",geraAlt("gases nobres","metais alcalinos","calcogênios"));
questoes[7] = new Quest3("Os elementos da família 6A são também chamados de:","calcogênios",geraAlt("gases nobres","metais alcalinos","halogênios"));
questoes[8] = new Quest3("O Carbono (C) pertence à família:", "1A",geraAlt("3A","2A","4A"));
questoes[9] = new Quest3("A que elemento pertence a seguinte distribuição eletrônica : 1s2 - 2s2 - 2p4", "O",geraAlt("H","Cl","Mg"));
questoes[10] = new Quest3("A que elemento pertence a seguinte distribuição eletrônica : 1s2 - 2s2 - 2p6 - 3s1", "Na",geraAlt("O","Cl","K"));
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