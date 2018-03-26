#pragma strict

	public class Quest{
		private var ask:String;
		private var cor:String;
		private var alt:String[];
		public function Quest(questao:String, correta:String, alternativa:String[]){
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

private var questoes:Quest[];
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
questoes = new Quest[9];
questoes[0] = new Quest("Os raios catódicos são constituídos por:", "elétrons",geraAlt("prótons","cátions","ânions"));
questoes[1] = new Quest("Algumas correções feitas por Böhr ao átomo de Rutherford referem-se:", "à quantização de energia",geraAlt("ao eletromagnetismo","à teoria da relatividade","ao núcleo do átomo"));
questoes[2] = new Quest("Deve-se a Böhr a idéia de: ", "níveis de energia",geraAlt("núcleo atômico","número atômico","ânions"));
questoes[3]= new Quest("Rutherford bombardeou uma delgada lâmina com partículas alfa demonstrando que: ", "o raio nuclear é muito pequeno em relação ao raio do átomo",geraAlt(" os elétrons tem carga elétrica negativa","matéria é compacta e impenetrável","todos os átomos dos elementos possuem elétrons"));
questoes[4] = new Quest("O modelo no qual se afirmava que o atomo era semelhante a uma bola de bilhar foi proposto por: ", "Dalton",geraAlt("prótons","Thomson","Niels bohr"));
questoes[5] = new Quest("Átomos de um mesmo elemento químico têm sempre o mesmo número de ___ e, portanto, o mesmo número ___", "prótons, atômico",geraAlt("elétrons, de nêutrons","nêutrons, atômico","massa, de nêutrons"));
questoes[6] = new Quest("A experiência do espalhamento das partículas (Rutherford) evidenciou a existência do: ","próton no núcleo",geraAlt("próton na eletrosfera","nêutron no núcleo","elétron no núcleo"));
questoes[7] = new Quest("Como Dalton caracterizava o átomo criado por ele?", "sem divisão",geraAlt("sem peso","sem fim","sem significado"));
questoes[8] = new Quest("O átomo, na visão de Thomson, é constituído de: ", "cargas positivas e negativas",geraAlt("niveis e subniveis de energia","nêutrons","n.d.a."));
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
	if(ponto>=500&& Application.loadedLevelName == "puzzle1"){
			Application.LoadLevel("busão");
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