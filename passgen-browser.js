var arr=[], fixes = [], arrResult=[], arrResultFixes=[],arrResultReplace=[], replace1=[], replace2=[];
var arrru = new Array ('Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н','О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э', 'э','в','В');
var arren = new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E','e','w','W');
var arrre = new Array ('Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н','О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ', 'Э', 'э');
var arrer = new Array ('Z', 'z', '>', '.', 'X', 'x', 'I', 'i', 'O', 'o', ':', ';', 'F','f','<',',','D','d','U','u','L','l','T','t','~','`','P','p','B','b','Q','q','R','r','K','k','V','v','Y','y','J','j','G','g','H','h','C','c','N','n','E','e','A','a','{','\[','W','w','S','s','M','m','}','\]', '\"', '\'');


window.onload = function(){ 
	
		
	document.getElementById("go").onclick = function () { 	
		arr   = document.getElementById("area").value.split('\n');
		fixes = document.getElementById("fixes").value.split('\n');
		replace1 = document.getElementById("leftside").value.split('\n');
		replace2 = document.getElementById("rightside").value.split('\n');	
		arr.forEach(function(item){                  //убираем пробелы
			arrResult.push(strTrim(item)); 
		})
		
		
		for(var i=0,rlength=arrResult.length; i<=rlength; i++){      //добавляем префиксы и постфиксы
			if (typeof arrResult[i] != 'undefined'){
				for(var j=0,flength=fixes.length; j<=flength; j++){
					if (typeof fixes[j] != 'undefined'){
						arrResultFixes.push(postPreFix(arrResult[i],fixes[j]));
						arrResultFixes.push(preFix(arrResult[i],fixes[j]));
						arrResultFixes.push(postFix(arrResult[i],fixes[j]));
					}
				}
			}
		}
 
 	
	 
		arrResult.forEach(function(item){
			arrResult.push(toUp(item));
 			arrResult.push(toLo(item));
			arrResult.push(firstUp1(item));
			arrResult.push(firstUp2(item));
			arrResult.push(firstLastLo1(item));
			arrResult.push(firstLastLo2(item));
			arrResult.push(firstLo1(item));
			arrResult.push(firstLo2(item));
			arrResult.push(lastLo1(item));
			arrResult.push(lastLo2(item));
			arrResult.push(firstLastUp2(item));
			arrResult.push(firstLastUp1(item));
			arrResult.push(lastUp1(item));
			arrResult.push(lastUp2(item));
			arrResult.push(everOddUp(item));
			arrResult.push(everEvenUp(item));  
			arrResult.push(toTranslitLo(item));
			arrResult.push(toTranslitUp(item));
			arrResult.push(cyrill_to_latin(item));
		//	arrResult.push(latin_to_cyrill(item));
		//	arrResult.push(en_to_ru(item));
			arrResult.push(ru_to_en(item));
			arrResult.push.apply(arrResult,arrResultFixes,arr);     //Объединяем массивы    
		})


		arrResult.forEach(function(item){
			arrResult.push(reverse(item));
		})
		arrResult.forEach(function(item){
			arrResult.push(duble(item));
			arrResult.push(triple(item));
		})

		
		
		
/*   
		
		for(var i=0,alength=arrResult.length; i<=alength; i++){      //делаем замену подстрок
			if (typeof arrResult[i] != 'undefined'){
				for(var j=0,blength=replace1.length; j<=blength; j++){
					if ((typeof replace1[j] != 'undefined') && typeof (replace1[j] != 'undefined')){
						arrResultReplace.push(replaceAll(arrResult[i], replace1[j], replace2[j]));
					}
				}
			}
		}
		arrResult.push.apply(arrResult,arrResultReplace);     //Объединяем массивы     
		

		
		 */

		
 
		
		
		
		
		
		
		
		
	arrResult.sort();                                         //Сортируем массив
		var i = arrResult.length;                                 //Удаляем дубликаты
		while (i--) {
			if (arrResult[i] == arrResult[i-1]) {
				arrResult.splice(i, 1);
			}
		}
		document.getElementById("area").value = arrResult.join('\n');
	};
};



//Удаление дубликатов
/* var uniqueArr = function(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos
  })
} */



 
function replaceAll(str, what, to) { 
   return str.split(what).join(to); 
} 

function cyrill_to_latin(text){       //Пассворд  - Password 
	for(var i=0, length = arrru.length; i < length; i++){
		var reg = new RegExp(arrru[i], "g");
		text = text.replace(reg, arren[i]);
    }
	return text;
}

function latin_to_cyrill(text){     //Password - Пассворд
	for(var i=0, length = arren.length; i < length; i++){
		var reg = new RegExp(arren[i], "g");
		text = text.replace(reg, arrru[i]);
    }
	return text;
}

function ru_to_en(text){       //Пассворд - Gfccdjhl
	for(var i=0, length = arrre.length; i < length; i++) {
		var reg = new RegExp(arrre[i], "g");
		text = text.replace(reg, arrer[i]);
    }
	return text;
}

function en_to_ru(text){       //Password - Зфыыцщкв
	for(var i = 0, length = arrer.length; i < length; i++) {
		var reg = new RegExp(arrre[i], "g");
		text = text.replace(reg, arrer[i]);
    }
	return text;
}



function toTranslitLo(text) {  // Пароль - parol
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
}


function toTranslitUp(text) {  // Пароль - PAROL
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
}



//" paSSword " - "paSSword"
var strTrim= function(str){str=str.trim();return str;}
	
//paSSword - paSSwordX 	
var postFix = function(fix,str){str+=fix;return str;}

//paSSword - XpaSSword 
var preFix = function(fix,str){str=fix+str;return str;}

//paSSword - XpaSSwordX 
var postPreFix = function(fix,str){str=str+fix+str;return str;}

//paSSword - PASSWORD 
var toUp = function(str){str = str.toUpperCase();return str;}

//paSSWORD - password 
var toLo = function(str){str = str.toLowerCase();return str;}

//paSSword - Password 
var firstUp1 = function(str){str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();return str;}
	
//paSSword - PaSSword 
var firstUp2 = function(str){str = str.charAt(0).toUpperCase()+str.substr(1);return str;}

//paSSword - passworD
var lastUp1 = function(str){str = str.substr(0,str.length-1).toLowerCase()+ str.charAt(str.length-1).toUpperCase();return str;}

//paSSword - paSSworD
var lastUp2 = function(str){str = str.substr(0,str.length-1) + str.charAt(str.length-1).toUpperCase();return str;}     
	
//paSSword - PaSSworD	
var firstLastUp1 = function(str){str = str.charAt(0).toUpperCase() + str.substr(1,str.length-2) + str.charAt(str.length-1).toUpperCase();return str;}

//paSSword - PassworD	
var firstLastUp2 = function(str){str = str.charAt(0).toUpperCase() + str.substr(1,str.length-2).toLowerCase() + str.charAt(str.length-1).toUpperCase();return str;}    
	
//paSSword - pASSWORD
var firstLo1 = function(str){str = str.charAt(0).toLowerCase() + str.substr(1).toUpperCase();return str;}    
	
//PassWORD - passWORD 	
var firstLo2 = function(str){str = str.charAt(0).toLowerCase()+str.substr(1);return str;}      
	
//passWORD - PASSWORd
var lastLo1 = function(str){str = str.substr(0,str.length-1).toUpperCase()+ str.charAt(str.length-1).toLowerCase();return str;}     
	
//passWORD - passWORd	
var lastLo2 = function(str){str = str.substr(0,str.length-1) + str.charAt(str.length-1).toLowerCase();return str;}     
	
//PAssWORD - pAssWORd	
var firstLastLo1 = function(str){str = str.charAt(0).toLowerCase() + str.substr(1,str.length-2) + str.charAt(str.length-1).toLowerCase();return str;}      
	
//PAssWORD - pASSWORd	
var firstLastLo2 = function(str){str = str.charAt(0).toLowerCase() + str.substr(1,str.length-2).toUpperCase() + str.charAt(str.length-1).toLowerCase();return str;}   
	
//password - PaSsWoRd	
var everOddUp = function(str){
	var  i = -1, a = "";
	str = str.toLowerCase();
    while(++i < str.length)  i % 2 ? a += str[i].toUpperCase() : a += str[i];
 	return a;
}   

//password - pAsSwOrD	
var everEvenUp = function(str){
	var  i = -1, a = "";
	str = str.toLowerCase();
    while(++i < str.length)  i % 2 ? a += str[i] : a += str[i].toUpperCase();
 	return a;
}   
	
//Пароль - ьлораП	
var reverse = function(str){return str === '' ? '' : reverse(str.slice(1)) + str[0];}   
 
 //Пароль - ПарольПароль
var duble = function(str){return str+str;}   
 
//Пароль - ПарольПарольПароль
var triple = function(str){return str+str+str;}   
 

 
 
	
/* 
 -----------------------------------------------
$.fn.shuffleValueRows = function() {
  var rows = this.val().trim().split('\n');
  var shuffled = shuffle(rows).join('\n');
  this.val(shuffled);
  return this;
  
  function shuffle(o) {
    for(var j, x, i = o.length; i; 
      j = Math.random() * i |0, 
      x = o[--i], 
      o[i] = o[j], 
      o[j] = x);
    return o;
  };
}

$(document).on('click', '.shuffleBtn', function() {
  $($(this).data('selector')).shuffleValueRows();
}); 
 ----------------------------------------
 
document.querySelector('#shuffle').addEventListener('click', _ => {
  let textarea = document.querySelector('#siteList');
  
  textarea.value = textarea.value.split('\n').filter(_ => _).reduce((a, e) => (a.splice(Math.random() * (a.length + 1), 0, e), a), []).join('\n'); 
  /*var chanks = textarea.value.split("\n"),
      shuffled = [];
  
  for(var i = 0; i < chanks.length; i++){
    var chank = chanks[i];
    
    if(/^\s*$/.test(chank)){
      continue;
    }
    
    shuffled.splice(Math.random() * (shuffled.length + 1), 0, chank);
  }
  
  textarea.value = shuffled.join("\n");
}); 
 

*/
