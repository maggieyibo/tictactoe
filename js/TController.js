angular
.module('tttApp', ['firebase'])
.controller("TController", TController);

TController.$inject = ['$firebase'];

function TController($firebase) {
	t = this;

	function getFirebaseGame() {
		var ref = new Firebase("https://tictactoegame.firebaseio.com/");
		var game = $firebase(ref).$asObject();
		return game;
	}

	t.game = getFirebaseGame();
	var g = t.game;

	t.player = '';

	g.$loaded().then(function() {
		if(g.needPlayerTwo) {
			t.player = 2;
			g.needPlayerTwo = false;
		}
		else {
			t.player = 1;
			g.needPlayerTwo = true;
			g.board = ['','','','','','','','',''];
			g.playerTurn = 1;
			g.winner = false;			
		}
		g.$save();
	});

	t.click = function(i) {
		if(g.winner) {
			return;
		}
		if(g.board[i] === '' && t.player === 1 && g.playerTurn === 1) {
			g.board[i] = 'X';
			g.playerTurn = 2;
		}
		else if(g.board[i] === '' && t.player === 2 && g.playerTurn === 2) {
			g.board[i] = 'O';
			g.playerTurn = 1;
		}
		g.winner = checkWinner();
		g.$save();
	};


	t.newGame = function() {
		g.board = ['','','','','','','','',''];
		g.playerTurn = 1;
		g.winner = false;
		g.$save();
	};

	function checkWinner() {
		if(g.board[0] !== '' && g.board[1] !== '' && g.board[2] !== '' &&
			g.board[3] !== '' && g.board[4] !== '' && g.board[5] !== '' &&
			g.board[6] !== '' && g.board[7] !== '' && g.board[8] !== '' &&
			"X" == g.board[0] && g.board[0] == g.board[1] && g.board[1] == g.board[2] ||
			"X" == g.board[3] && g.board[3] == g.board[4] && g.board[4] == g.board[5] ||
			"X" == g.board[6] && g.board[6] == g.board[7] && g.board[7] == g.board[8] ||
			"X" == g.board[0] && g.board[0] == g.board[3] && g.board[3] == g.board[6] ||
			"X" == g.board[1] && g.board[1] == g.board[4] && g.board[4] == g.board[7] ||
			"X" == g.board[2] && g.board[2] == g.board[5] && g.board[5] == g.board[8] ||
			"X" == g.board[0] && g.board[0] == g.board[4] && g.board[4] == g.board[8] ||
			"X" == g.board[2] && g.board[2] == g.board[4] && g.board[4] == g.board[6]) {
			return "X";
		}

		else if(g.board[0] !== '' && g.board[1] !== '' && g.board[2] !== '' &&
			g.board[3] !== '' && g.board[4] !== '' && g.board[5] !== '' &&
			g.board[6] !== '' && g.board[7] !== '' && g.board[8] !== '' &&
			"O" == g.board[0] && g.board[0] == g.board[1] && g.board[1] == g.board[2] ||
			"O" == g.board[3] && g.board[3] == g.board[4] && g.board[4] == g.board[5] ||
			"O" == g.board[6] && g.board[6] == g.board[7] && g.board[7] == g.board[8] ||
			"O" == g.board[0] && g.board[0] == g.board[3] && g.board[3] == g.board[6] ||
			"O" == g.board[1] && g.board[1] == g.board[4] && g.board[4] == g.board[7] ||
			"O" == g.board[2] && g.board[2] == g.board[5] && g.board[5] == g.board[8] ||
			"O" == g.board[0] && g.board[0] == g.board[4] && g.board[4] == g.board[8] ||
			"O" == g.board[2] && g.board[2] == g.board[4] && g.board[4] == g.board[6]) {
			return "O";
		}


		else if(g.board[0] !== '' && g.board[1] !== '' && g.board[2] !== '' &&
			g.board[3] !== '' && g.board[4] !== '' && g.board[5] !== '' &&
			g.board[6] !== '' && g.board[7] !== '' && g.board[8] !== '')
		{
			return 'tie';
		}

		else {
			return false;
		}

	}



}