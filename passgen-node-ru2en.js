var fs = require('fs'),
arrru = new Array ('Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н','О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э', 'э','в','В'),
arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E','e','w','W'),
arrre = new Array ('Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н','О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э', 'э'),
arrer = new Array ('Z', 'z', '>', '.', 'X', 'x', 'I', 'i', 'O', 'o', ':', ';', 'F','f','<',',','D','d','U','u','L','l','T','t','~','`','P','p','B','b','Q','q','R','r','K','k','V','v','Y','y','J','j','G','g','H','h','C','c','N','n','E','e','A','a','{','\[','W','w','S','s','M','m','}','\]', '\"', '\''),
util = require("util"),
fixes = [],
left = [],
right = [],
base = [],
arrResult=[], 
arrResultFixes=[],
 
 

PG = {
	replaceAll : function(str, what, to) {return str.split(what).join(to);},
	strTrim : function(str){str=str.trim();return str;},
	orig : function(str){return str;},
	remove_rn : function(str){ str=str.replace(/\r?\n/g, ""); return str;},
 
 
	
	//paSSword - paSSwordX 	
	postFix : function(fix,str){str+=fix; str=str.replace(/\r/g, ""); return str;},

	//paSSword - XpaSSword 
	preFix : function(fix,str){str=fix+str; str=str.replace(/\r/g, ""); return str;},

	//paSSword - XpaSSwordX 
	postPreFix : function(fix,str){str=fix+str+fix; str=str.replace(/\r/g, ""); return str;},
 
	//password - XpasswordY 
	leftRight : function(ls,rs,str){str=ls+str+rs; str=str.replace(/\r/g, ""); return str;},
	
	//paSSword - PASSWORD 
	toUp : function(str){str = str.toUpperCase();return str;},

	//paSSWORD - password 
	toLo : function(str){str = str.toLowerCase();return str;},

	//paSSword - Password 
	firstUp1 : function(str){str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();return str;},
		
	//paSSword - PaSSword 
	firstUp2 : function(str){str = str.charAt(0).toUpperCase()+str.substr(1);return str;},

	//paSSword - passworD
	lastUp1 : function(str){str = str.substr(0,str.length-1).toLowerCase()+ str.charAt(str.length-1).toUpperCase();return str;},

	//paSSword - paSSworD
	lastUp2 : function(str){str = str.substr(0,str.length-1) + str.charAt(str.length-1).toUpperCase();return str;},
		
	//paSSword - PaSSworD	
	firstLastUp1 : function(str){str = str.charAt(0).toUpperCase() + str.substr(1,str.length-2) + str.charAt(str.length-1).toUpperCase();return str;},

	//paSSword - PassworD	
	firstLastUp2 : function(str){str = str.charAt(0).toUpperCase() + str.substr(1,str.length-2).toLowerCase() + str.charAt(str.length-1).toUpperCase();return str;},
		
	//paSSword - pASSWORD
	firstLo1 : function(str){str = str.charAt(0).toLowerCase() + str.substr(1).toUpperCase();return str;},
		
	//PassWORD - passWORD 	
	firstLo2 : function(str){str = str.charAt(0).toLowerCase()+str.substr(1);return str;},
		
	//passWORD - PASSWORd
	lastLo1 : function(str){str = str.substr(0,str.length-1).toUpperCase()+ str.charAt(str.length-1).toLowerCase();return str;},
		
	//passWORD - passWORd	
	lastLo2 : function(str){str = str.substr(0,str.length-1) + str.charAt(str.length-1).toLowerCase();return str;},
		
	//PAssWORD - pAssWORd	
	firstLastLo1 : function(str){str = str.charAt(0).toLowerCase() + str.substr(1,str.length-2) + str.charAt(str.length-1).toLowerCase();return str;},
		
	//PAssWORD - pASSWORd	
	firstLastLo2 : function(str){str = str.charAt(0).toLowerCase() + str.substr(1,str.length-2).toUpperCase() + str.charAt(str.length-1).toLowerCase();return str;},

	//Пароль - ьлораП	
 	reverse : function(str){return str === '' ? '' : PG.reverse(str.slice(1)) + str[0];},
	 
	//Пароль - ПарольПароль
	duble : function(str){return str+str;},
	 
	//Пароль - ПарольПарольПароль
	triple : function(str){return str+str+str;},
	
	//password - PaSsWoRd	
	everOddUp : function(str){
		var  i = -1, a = "";
		str = str.toLowerCase();
		while(++i < str.length)  i % 2 ? a += str[i].toUpperCase() : a += str[i];
		return a;
	},

	//password - pAsSwOrD	
	everEvenUp : function(str){
		var  i = -1, a = "";
		str = str.toLowerCase();
		while(++i < str.length)  i % 2 ? a += str[i] : a += str[i].toUpperCase();
		return a;
	},
		
	cyrill_to_latin : function(text){       //Пассворд  - Password 
		for(var i=0, length = arrru.length; i < length; i++){
			var reg = new RegExp(arrru[i], "g");
			text = text.replace(reg, arren[i]);
		}
		return text;
	},

	latin_to_cyrill : function (text){     //Password - Пассворд
		for(var i=0, length = arren.length; i < length; i++){
			var reg = new RegExp(arren[i], "g");
			text = text.replace(reg, arrru[i]);
		}
		return text;
	},

	ru_to_en : function(text){       //Пассворд - Gfccdjhl
		for(var i=0, length = arrre.length; i < length; i++) {
			var reg = new RegExp(arrre[i], "g");
			text = text.replace(reg, arrer[i]);
		}
		return text;
	},

	en_to_ru : function(text){       //Password - Зфыыцщкв
		for(var i = 0, length = arrer.length; i < length; i++) {
			var reg = new RegExp(arrre[i], "g");
			text = text.replace(reg, arrer[i]);
		}
		return text;
	},

	toTranslitLo : function (text) {  // Пароль - parol
		return text.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
		function (all, ch, space, words, i) {
			if (space || words) {
				return space ? '-' : '';
			}
			var code = ch.charCodeAt(0),
				index = code == 1025 || code == 1105 ? 0 :
					code > 1071 ? code - 1071 : code - 1039,
				t = ['yo','a','b','v','g','d','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','c','ch','sh','shch','','y','','e','yu','ya']; 
			return t[index];
		});
	},

	toTranslitUp : function(text) {  // Пароль - PAROL
		return text.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
		function (all, ch, space, words, i) {
			if (space || words) {
				return space ? '-' : '';
			}
			var code = ch.charCodeAt(0),
				index = code == 1025 || code == 1105 ? 0 :
					code > 1071 ? code - 1071 : code - 1039,
				t = ['YO','A','B','V','G','D','E','ZH','Z','I','Y','K','L','M','N','O','P','R','S','T','U','F','H','C','CH','SH','SHCH','','Y','','E','YU','YA']; 
			return t[index];
		});
	},
};


 
fixes = fs.readFileSync("suff.txt", "utf8").split('\n');
left = fs.readFileSync("left.txt", "utf8").split('\n');
right = fs.readFileSync("right.txt", "utf8").split('\n');
base = fs.readFileSync("base.txt", "utf8").split('\n');
fixesLength = fixes.length;
leftLength = left.length;
 
cnt=0;
base.forEach(function(item){                   //убираем пробелы
	if(typeof item != 'undefined'){
		arrResult.push(PG.strTrim(item)); 
	}
 	arrResult.forEach(function(item){
//		arrResult.push(PG.orig(item));            //паРоль - паРоль
//		arrResult.push(PG.toUp(item));            //паРоль - ПАРОЛЬ0
//		arrResult.push(PG.toLo(item));            //паРоль - пароль
//		arrResult.push(PG.firstUp1(item));        //паРоль - Пароль
//		arrResult.push(PG.firstUp2(item));        //паРоль - ПаРоль
//		arrResult.push(PG.firstLastLo1(item));    //ПаРолЬ - паРоль
//		arrResult.push(PG.firstLastLo2(item));    //ПаРолЬ - пАРОЛь
//		arrResult.push(PG.firstLo1(item));        //ПаРоль - пАРОЛЬ
//		arrResult.push(PG.firstLo2(item));        //ПаРоль - паРоль
//		arrResult.push(PG.lastLo1(item));         //ПАРОЛЬ - ПАРОЛь
//		arrResult.push(PG.lastLo2(item));         //ПаРолЬ - ПаРоль
//		arrResult.push(PG.firstLastUp2(item));    //пароль - ПаролЬ
//		arrResult.push(PG.firstLastUp1(item));    //паРоль - ПаРолЬ
//		arrResult.push(PG.lastUp1(item));         //паРоль - паролЬ
//		arrResult.push(PG.lastUp2(item));         //паРоль - паРолЬ
//		arrResult.push(PG.everOddUp(item));       //пароль - пАрОлЬ
//		arrResult.push(PG.everEvenUp(item));      //пароль - ПаРоЛь
	//	arrResult.push(PG.toTranslitLo(item));    //Пароль - parol
	//	arrResult.push(PG.toTranslitUp(item));    //Пароль - PAROL
		arrResult.push(PG.cyrill_to_latin(item)); //паРоль - paRol'
	//	arrResult.push(PG.latin_to_cyrill(item));  
	//	arrResult.push(PG.en_to_ru(item));
		arrResult.push(PG.ru_to_en(item));        //паРоль - gfHjkm
	})

	 
/* 	arrResult.forEach(function(item){
		arrResult.push(PG.reverse(item));          //пароль - ьлорап
	})
	
			
	arrResult.forEach(function(item){
		arrResult.push(PG.duble(item));            // пароль - парольпароль
		arrResult.push(PG.triple(item));           // пароль - парольпарольпароль
	})
	
	 */
	
	arrResult.sort();                               // Сортируем итоговый массив
	var i = arrResult.length;                       // Удаляем дубликаты
	while (i--){
		if (arrResult[i] == arrResult[i-1]) {
			arrResult.splice(i, 1);
		}
	}
	
		
/*  
	//добавляем префиксы и постфиксы
	arrResult.forEach(function(item){
		for(var j=0; j<=fixesLength; j++){
			if(typeof fixes[j] != 'undefined'){
				arrResultFixes.push(PG.postPreFix(fixes[j],item));
				arrResultFixes.push(PG.preFix(fixes[j],item));
				arrResultFixes.push(PG.postFix(fixes[j],item));
			}
		}
		for(var z=0; z<=leftLength; z++){
			if(typeof left[z] != 'undefined'){
				arrResultFixes.push(PG.leftRight(left[z],right[z],item));
			}
		} 
	})  
	
	
 
 
 
	
	arrResult.push.apply(arrResult,arrResultFixes);          //Объединяем массивы    
 */ 

 
	fs.appendFile('result.txt', '\r\n','utf8');
	fs.appendFile('result.txt', arrResult.join('\r\n'),'utf8');
	arrResult =[];
//	arrResultFixes  =[];
 
	console.log(cnt++);
})