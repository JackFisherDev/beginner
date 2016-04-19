// CHECK COOKIE

var player = document.getElementById('user').value,
	totalCookie = document.cookie,
	playerSearchRegExp = new RegExp('\\bName=', 'g');

var playerName = (function checkPlayer() {
	if(playerSearchRegExp.test(totalCookie) == true) {
	
		document.getElementById('start').style.display = 'none';
		document.getElementById('wrapper').style.display = 'block';

		var playerNamePosition = totalCookie.search(playerSearchRegExp),
			playerNamePositionStart = totalCookie.indexOf('=', playerNamePosition),
			playerNamePositionEnd = totalCookie.indexOf(';', playerNamePosition);

		if(playerNamePositionEnd < 0) {
			return unescape(totalCookie.slice(playerNamePositionStart + 1));
		} else {
			return unescape(totalCookie.slice(playerNamePositionStart + 1, playerNamePositionEnd));
		}

	}
})();

/*******************************************************************

	ENTER IN THE GAME

******************************************************************/

function setCookie(name, val, expPeriod) {
	var cooks = name + "=" + escape(val) + ";";

	if(expPeriod != 0) {
		var currentDay = new Date();
		currentDay.setMonth(currentDay.getMonth() + expPeriod);
		cooks += "expires=" + currentDay.toUTCString() + ";";
	}

	document.cookie = cooks;
}

// console.log(document.cookie);

function enterInGame() {
	var userName = document.getElementById('user').value,
		expDate = new Date();
	var registrRegExp = new RegExp('^\[0-9a-zA-Z\]+$', 'i');

	if(userName == '' || registrRegExp.test(userName) == false) {
		// document.getElementById('enter-warning').style.display = 'block';
		// document.getElementById('warning-message').style.display = 'block';
		$( '#enter-warning').fadeIn(300);
		$( '#warning-message').fadeIn(300);
	} else {
		setCookie("Name", userName, 3);

		document.getElementById('start').style.display = 'none';
		document.getElementById('wrapper').style.display = 'block';
	}

	return false;
}

/***************************************************************

	GAME

***************************************************************/
function rand(min_num, max_num){
	return Math.round(Math.random() * (max_num - min_num) + min_num);
}

var player = document.getElementsByClassName('player');

for(var i = 0; i < player.length; i++) {
	player[i].innerHTML = playerName;
}

var questions = ['Что из этого не является косметическим средством?', 'Кто, в конце концов, скушал Колобка?', 'Какой шахматной фигуры не существует?', 'Что означает буква «О» в аббревиатуре ОРТ?', 'Главный герой в романе Ф. И. Достоевского «Преступление и наказание».', 'В состав любого органического вещества входит…', 'Какое слово здесь лишнее?', 'Как назывался самый младший гражданский чин, присваивавшийся согласно Табели о рангах?', 'Кто изобрел громоотвод?', 'Как в России в 15-17вв. назывались феодально-зависимые люди, не имевшие своего хозяйства, жившие и работавшие во дворах крестьян или посадских людей?', 'В каком городе находится штаб-квартира Microsoft?', 'При каком правителе к России была присоединена территория Финляндии?', 'Ричард Львиное Сердце был пленен во время', 'Известно, что в кириллице многие буквы имели и цифровое значение. Чему равна буква К (како)?', 'Кто такой «молотоглав»?'];
var answers = ['Помада', 'Татуировка', 'Крем', 'Пудра', 'Дед', 'Баба', 'Заяц', 'Лиса', 'Пешка', 'Конь', 'Король', 'Дама', 'Олигархическое', 'Объективное', 'Общественное', 'Однообразное', 'Расторгуев', 'Чикатило', 'Тумбочкин', 'Раскольников', 'кислород', 'углерод', 'водород', 'азот', 'Автор', 'Товар', 'Отвар', 'Ворот', 'Синодский регистратор', 'Провинциальный секретарь', 'Коллежский регистратор', 'Кабинетский регистратор', 'Франклин', 'Рузвельт', 'Вашингтон', 'Линкольн', 'Дворовые', 'Захребетники', 'Нахлебники', 'Бестягольные', 'Нью-Йорк', 'Ричмонд', 'Новый Орлеан', 'Сиэтл', 'Петр I', 'Екатерина II', 'Павел I', 'Александр I', 'крестового похода', 'столетней войны', 'войны алой и белой розы', 'войны за независимость', '10', '20', '70', '90', 'Рыба', 'Птица', 'Змея', 'Насекомое'];
var rightAnswers = [1,3,3,2,3,1,3,2,0,1,1,3,0,1,1];
var variants = ['A:', 'B:', 'C:', 'D:']
var level = 0;
var bank = ['100', '200', '300', '500', '1 000', '2 000', '4 000', '8 000', '16 000', '32 000', '64 000', '125 000', '250 000', '500 000', '1 000 000'];
var inputAnswer = document.getElementsByName('answer');
var label = document.getElementsByTagName('label');
var span = document.getElementsByClassName('variantAnswer');
var timerInterval;

function gameStart() {
	$( '#gameStart' ).attr( 'disabled', 'disabled' ).css({ background: '#53bb61' });
	$( '#out' ).removeAttr( 'disabled' ).attr( 'onclick', 'getMoney()' );
	$( '#answer' ).removeAttr( 'disabled' ).attr( 'onclick', 'answerBtn()' );
	$( '.choise' ).css({ 
		background: 'transparent',
		color: '#efefef'
	 })

	$( '#table table tr:eq(' + (14 - level) + ')').children( 'th' ).css({
		background: '#f1b400',
		color: '#222'
	})
	$( '#table table tr:eq(' + (14 - level) + ')').children( 'td:last' ).css({
		background: '#f1b400',
		color: '#222'
	})

	$( 'button.fifty' ).removeAttr( 'disabled' );
	$( 'button.phoneCall' ).removeAttr( 'disabled' );
	$( 'button.auditory' ).removeAttr( 'disabled' );

	getQuestion();
	timerInterval = setInterval(timer, 1000);
}

function getQuestion() {
	$( '#quest' ).text(questions[level]);

	for(var i = 0; i < 4; i++){
		var spanVar = document.createElement('span');
		
		spanVar.setAttribute('class', 'variant');
		
		spanVar.innerHTML = variants[i];
		span[i].innerHTML = answers[i + (level * 4)];
		
		label[i].appendChild(spanVar);
	}

	$( '.variantAnswer' ).each(function() {
		$( this ).css({ color: '#efefef' })
	})
}

var minute = 60;
var timer = function() {
	minute--;
	if(minute == 0) {
		getMoney();
		clearInterval(timerInterval);
	}else {
		document.getElementById('timer').innerHTML = minute;
	}
}

var resAnswer = 0;
$( '.choise' ).click(function() {
	return resAnswer = $( this ).children( 'input[type=radio]' ).val();
})

function answerBtn() {
	var verno = false;

	clearInterval(timerInterval);
	minute = 60;
	console.log(resAnswer);

	if(resAnswer == rightAnswers[level]) {
		verno = true;
		document.getElementById('bank').innerHTML = 'Bank: ' + bank[level] + ' $';
	}

	if(verno == true) {
		if(level == 14) {
			$( '#win').fadeIn(300);
			$( '#win').children( 'div' ).fadeIn(300);
			document.getElementById('sumWin').innerHTML = '1 000 000 $';
		}

		$( '#table table tr:eq(' + (14 - level) + ')').children( 'th' ).css({
			background: '#53bb61',
			color: '#efefef'
		})
		$( '#table table tr:eq(' + (14 - level) + ')').children( 'td:last' ).css({
			background: '#53bb61',
			color: '#efefef'
		})
		
		level += 1;
		gameStart();
	} else {	
		$( '#win').fadeIn(300);
		$( '#win').children( 'div' ).fadeIn(300);
		if(level <= 0) {
			document.getElementById('sumWin').innerHTML = '0 $';
		} else {
			if(level < 5) {
				document.getElementById('sumWin').innerHTML = '0 $';
			} else if(level >= 5 && level < 10) {
				document.getElementById('sumWin').innerHTML = '1000 $';
			} else if(level >= 10 && level < 14) {
				document.getElementById('sumWin').innerHTML = '32 000 $';
			}
		}
		
		document.getElementById('gameStart').removeAttribute( 'disabled' );
		document.getElementById('out').setAttribute('disabled');
		document.getElementById('answer').setAttribute('disabled');
		
		document.getElementById('bank').innerHTML = 'Bank: 0 $';
		level = 0;
	}
	
	// return level;
	console.log(level);
	console.log(verno);
}

//// TOP LINKS
$( '#rulesLink' ).click(function() {
	$( '#information' ).fadeIn(300);
	$( '#rules' ).fadeIn(300);
	$( '#record' ).fadeOut(150);

	return false;
})

$( '#recordLink' ).click(function() {
	$( '#information' ).fadeIn(300);
	$( '#record' ).fadeIn(300);
	$( '#rules' ).fadeOut(150);

	return false;
})

/////// OK BUTTON
$( '.ok' ).click(function() {
	if($( this ).hasClass('closeWindow')) {
		$( this ).parent().fadeOut(150);
		$( this ).parent().parent().fadeOut(150);
	} else {
		$( this ).parent().parent().fadeOut(150);
		$( this ).parent().parent().parent().fadeOut(150);
	}

	return false;
})

///// CHOOSE VARIANT
$( '.choise' ).click(function() {
	$( '.choise' ).each(function() {
		$( this ).css({
			background: "transparent",
			color: "#efefef"
		})
	})

	$( this ).css({
		background: "#f1b400",
		color: "#222"
	})

	return false;
})

var arrAnsw = [];
////////////// HINTS
$( '#hints ul li button' ).click(function() {
	if($( this ).hasClass( 'fifty' )) {
		$( this ).attr( 'disabled', 'disabled' );
		$( this ).css({
			backgroundPosition: '0 0'
		})

		var variantsAnsw = document.getElementsByClassName('variantAnswer');

		for(var i = 0; i < variantsAnsw.length; i++) {
			arrAnsw[i] = variantsAnsw[i];
		}
				
		arrAnsw.splice(rightAnswers[level], 1);

		var firstVar = rand(0,2);
		var secondVar = rand(0,2);
		
		if(firstVar == secondVar) {
			do {
				secondVar = rand(0,2);
			} while(firstVar == secondVar);
		}
			
		arrAnsw[firstVar].style.color = '#10171f';
		arrAnsw[secondVar].style.color = '#10171f';
	} else if($( this ).hasClass( 'phoneCall' )) {
		$( this ).attr( 'disabled', 'disabled' );
		$( this ).css({
			backgroundPosition: '-75px 0'
		})
		$( '#getHint' ).fadeIn(300);
		$( '#phoneCall' ).fadeIn(300);
		$( '#auditory' ).hide();

		$( '#friendHelp' ).text( variants[rand(0,3)]);

		return false;
	} else if($( this ).hasClass( 'auditory' )) {
		$( this ).attr( 'disabled', 'disabled' );
		$( this ).css({
			backgroundPosition: '-150px 0'
		})
		$( '#getHint' ).fadeIn(300);
		$( '#phoneCall' ).hide();
		$( '#auditory' ).fadeIn(300);

		var hundredPercent = 100;
		var percent = rand(40, 60);
		var variantsAnsw = document.getElementsByClassName('audit');
		console.log(percent);
		for(var i = 0; i < variantsAnsw.length; i++) {
			arrAnsw[i] = variantsAnsw[i];
		}

		arrAnsw[rightAnswers[level]].innerHTML = percent + '%';
		arrAnsw[rightAnswers[level]].parentNode.style.width = percent + '%';
		hundredPercent -= percent;

		for(var j = 0; j < variantsAnsw.length; j++) {
			if(j != rightAnswers[level]) {
				percent = rand(0, hundredPercent);
				console.log(percent);
				if(percent < 7) {
					arrAnsw[j].innerHTML = percent + '%';
					arrAnsw[j].parentNode.style.width = '50px';
				} else {
					arrAnsw[j].innerHTML = percent + '%';
					arrAnsw[j].parentNode.style.width = percent + '%';
				}
			
				hundredPercent -= percent;
			}
		}
	}
})

/////////////// GET MONEY
function getMoney() {
	$( '#win').fadeIn(300);
	$( '#win').children( 'div' ).fadeIn(300);
	if(level == 0) {
		document.getElementById('sumWin').innerHTML = '0 $';
	} else {
		document.getElementById('sumWin').innerHTML = bank[level - 1] + ' $';
	}
}