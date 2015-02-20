 function GetAnswer() {
	if ($('#answer').val() == answer) {
		alert("Correct");
		score ++;
	}
	else {
		alert("Wrong");
	}
	$('#score').text('Score: ' + score);
	CreateSum();
 }
 
 var answer;
 var score;
 
 function CreateSum() {
	var x = Math.floor((Math.random() * 10) + 1);
	var y = Math.floor((Math.random() * 10) + 1);
	
	answer = x + y;
	
	$('#sum').text(x + ' + ' + y + ' = ');
 }
 
function StartGame() {
	score = 0;
	CreateSum();
}