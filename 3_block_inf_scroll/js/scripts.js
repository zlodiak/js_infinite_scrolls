

window.onload=function(){
	var wrap = document.getElementById('body');

	wrap.addEventListener('scroll', function() {
		var O = wrap.clientHeight;	// высота блока, который вмещает записи

		var S = wrap.scrollTop,			// на сколько скролл отстоит от верхней границы этого блока
				C = wrap.scrollHeight;	// реальная высота блока(с учётом содержимого)

		/*console.log('==============');
		console.log('O', O);
		console.log('S', S);
		console.log('C', C);*/

		if (O + S >= C) {
			console.log('add');
			start = step;
			step += step;
			constructValute(start, step);
		}	
	});
}

var start = 0, 
		step = 10;
var valuteArr = [],
		valuteArrLength = 0;

function constructValute(start, end) {
	var bodyEl = document.getElementById('body'),
			valuteArrLength = valuteArr.length;

	for(i = start; i < end; i++) {
		var tpl = document.getElementById('item');
	  var itemEl = document.createElement('div');	  

	  if(i < valuteArrLength) {
		  var CharCode = valuteArr[i].CharCode;
		  var Name = valuteArr[i].Name;
		  var Value = valuteArr[i].Value;

			tpl_ = tpl.innerHTML.replace('__CharCode__', CharCode)
													.replace('__Name__', Name)
													.replace('__Value__', Value);

		  itemEl.className = 'item';
		  itemEl.innerHTML = tpl_;
		  bodyEl.appendChild(itemEl);
	  } else {
	  	console.log('stopeed add')
	  	break;
	  }

	}
};

function ajaxReq() {
	var this_ = this;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://www.cbr-xml-daily.ru/daily_json.js');
	xhr.onload = function() {
    if (xhr.status === 200) {
    	var responseText = xhr.responseText;
    	var responseTextParsed = JSON.parse(xhr.responseText);
    	var vauteList = responseTextParsed.Valute;

      //console.log('responseTextParsed is ', JSON.parse(xhr.responseText));
      console.log('valute list is ', vauteList);

      var valuteArr = [],
      		i = 0;

    	for(var prop in vauteList) {
    		valuteArr[i] = vauteList[prop];
    		++i;			  
			};

			valuteArrLength = valuteArr.length;
			console.log(valuteArrLength, valuteArr);

			this_.valuteArr = valuteArr;
      constructValute(0, step);
    }
    else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
	};
	xhr.send();	
};

ajaxReq();
