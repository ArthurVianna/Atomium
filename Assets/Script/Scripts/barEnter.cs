	using UnityEngine;
	using UnityEngine.UI;
	using System.Collections;
	using System.Collections.Generic;

	public class barEnter : MonoBehaviour {
		public GameObject barra;
		public GameObject limite;
		public int lifeEnemy = 100;
		public int life = 100;
		public List<UIBarScript> HPScriptList = new List<UIBarScript>();
		public List<UIBarScript> HPScriptListPlayer = new List<UIBarScript>();
		private int golpes = 0;
		public GameObject idleBlue;
		public GameObject idleRed;
	
		void Start()
		{
		if(PlayerPrefs.GetInt("lifeE")!=100){
		    lifeEnemy = PlayerPrefs.GetInt("lifeE");
			foreach (UIBarScript HPS in HPScriptList)
			{
				HPS.UpdateValue(lifeEnemy,100);
			}
			
		}if(PlayerPrefs.GetInt("life")!=100){
		life = PlayerPrefs.GetInt("life");
			foreach (UIBarScript HPS in HPScriptListPlayer)
			{
				HPS.UpdateValue(life,100);
			}
		}
	}
		
		// Update is called once per frame
		void UpdateBar () 
		{
			//get the string in the input boxes
			string StrHP = gameObject.transform.FindChild("HP").gameObject.GetComponent<InputField>().text;
			string StrMaxHP = gameObject.transform.FindChild("MaxHP").gameObject.GetComponent<InputField>().text;
			
			//convert to int
			int HP = int.Parse(StrHP);
			int MaxHP = int.Parse(StrMaxHP);
			
			//for every UIScript_HP update it.
			foreach (UIBarScript HPS in HPScriptList)
			{
				HPS.UpdateValue(HP,MaxHP);
			}
			
		}
		void Update () {
		if(golpes>=3){
			PlayerPrefs.SetInt("life",life);
			PlayerPrefs.SetInt("lifeE",lifeEnemy);
			int temp = Random.Range(11,13);
			PlayerPrefs.SetInt("scene",Application.loadedLevel); 
			Application.LoadLevel(temp);
		}
		if(life<=0){
			PlayerPrefs.SetInt("scene",Application.loadedLevel); 
			Application.LoadLevel("GameOver");
		}if(lifeEnemy<=0){
			PlayerPrefs.SetInt("scene",Application.loadedLevel); 
			Application.LoadLevel("fimGeral");
		}
		idleBlue.GetComponent<Animator>().SetInteger("teste",0);
		idleRed.GetComponent<Animator>().SetInteger("teste",0);
			if (Input.anyKeyDown){
			if(barra.gameObject.transform.position.x>=limite.gameObject.transform.position.x-20&&barra.gameObject.transform.position.x<=limite.gameObject.transform.position.x+46){
						lifeEnemy-=10;
				golpes++;
						idleBlue.GetComponent<Animator>().SetInteger("teste",Random.Range(1,3));
						idleRed.GetComponent<Animator>().SetInteger("teste",1);

						foreach (UIBarScript HPS in HPScriptList)
						{
						HPS.UpdateValue(lifeEnemy,100);
						}
			}
			else{
				life-=10;
				idleRed.GetComponent<Animator>().SetInteger("teste",Random.Range(2,4));
				idleBlue.GetComponent<Animator>().SetInteger("teste",3);

				foreach (UIBarScript HPS in HPScriptListPlayer)
					{
						HPS.UpdateValue(life,100);
					}
				}
			}
		}
	}
