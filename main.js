var confirmasfx = new Audio('sons/urna.mp3')//,botaosfx = new Audio('sons/.mp3');
var numero = ' ', count = 0, troca_img, csv, hiddenElement;
var numUmBool = numDoisBool = numTresBool = numQuatroBool = numCincoBool = numSeisBool = false;
var data = new Array(5);
data[0] = data[1] = data[2] = data[3] = data[4] = data[5] = new Array(2);

console.log(data)
function confirma()
{
	//window.location = 'final.html';
	console.log(numero)
	confirmasfx.play();
}

function nothing(){}

function fotoP(num)
{
	if(num == 01)
	{
		troca_img = document.getElementById("um");
		troca_img.style.display = "block";
		numUmBool = true;
	}
	else if(num == 02)
	{
		troca_img = document.getElementById("dois");
		troca_img.style.display = "block";
		numDoisBool = true;
	}
	else if(num == 03)
	{
		troca_img = document.getElementById("tres");
		troca_img.style.display = "block";
		numTresBool = true;
	}
	else if(num == 04)
	{
		troca_img = document.getElementById("quatro");
		troca_img.style.display = "block";
		numQuatroBool = true;
	}
	else if(num == 05)
	{
		troca_img = document.getElementById("cinco");
		troca_img.style.display = "block";
		numCincoBool = true;
	}
	else if(num == 06)
	{
		troca_img = document.getElementById("seis");
		troca_img.style.display = "block";
		numSeisBool = true;
	}
	//document.getElementById("tela_numero").innerHTML = '';
}

function corrige()
{
	if(numero == 01)
	{
		troca_img = document.getElementById("um");
		troca_img.style.display = "none";
		numUmBool = false;
	}
	else if(numero == 02)
	{
		troca_img = document.getElementById("dois");
		troca_img.style.display = "none";
		numDoisBool = false;
	}
	else if(numero == 03)
	{
		troca_img = document.getElementById("tres");
		troca_img.style.display = "none";
		numTresBool = false;
	}
	else if(numero == 04)
	{
		troca_img = document.getElementById("quatro");
		troca_img.style.display = "none";
		numQuatroBool = false;
	}
	else if(numero == 05)
	{
		troca_img = document.getElementById("cinco");
		troca_img.style.display = "none";
		numCincoBool = false;
	}
	else if(numero == 06)
	{
		troca_img = document.getElementById("seis");
		troca_img.style.display = "none";
		numSeisBool = false;
	}
	numero = ' ';
	count = 0;
	document.getElementById("tela_numero").innerHTML = '';
}

//botões para inserir o numero da chapa
function botao(clicked_id)
{
	//olha se o contador é menor do que 1, ou seja, foi digitado um numero ou menos
	if(count <= 1){
		//adiciona o id do botao a variável
		numero = numero + clicked_id + '';
		console.log(numero)
		count++;
	}
	if(count == 2){
		//incrementa o contador pra ele não ter perigo de voltar
		count+=2;
		fotoP(numero);
	}
	//imprime os números pressionados na tela
	document.getElementById("tela_numero").innerHTML = numero;
}

//fazer download dos resultados
function download_csv()
{
    csv = 'Chapa,Votos\n';
    data.forEach(function(row) {
	    csv += row.join(',');
	    csv += "\n";
    });

    console.log(csv);
    hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'resultado.csv';
    hiddenElement.click();
}
