var confirmasfx = new Audio('sons/urna.mp3');//,botaosfx = new Audio('sons/.mp3');
var teclafx = new Audio('sons/tecla.mp3');//Som ao teclar.
var numero = '', count = 0, troca_img, csv, hiddenElement,contadorVotos = 0, somaColuna='';
var hora, minuto, segundo;
let data = [];
var votosC1, votosC2, votosC3, votosC4, votosC5, votosC6, votosNulo = 0;
//console.log(data)


function confirma()
{
	//console.log(numero);

	console.log(tempo());
	if(numero != '01' && numero != '02' && numero != '03' && numero != '04' && numero != '05' && numero != '06')
		votosNulo++;
	data[contadorVotos] = [numero,'1',tempo()]
	contadorVotos++;
	somaColuna = data.length;
	/*setTimeout(function(){
				window.location.href = 'final.html';
			}, 1000);*/
}

//botão corrige, para apagar os numeros digitados
function corrige()
{
	teclafx.play();
	//se mandar a variavel sem nada, aparece a imagem do voto nulo, por isso esse if
	if(numero != '' && count == 3)
		showHide(numero);
	numero = '';
	count = 0;
	document.getElementById("tela_numero").innerHTML = '';
}

//botões para inserir o numero da chapa
function botao(clicked_id)
{
	//olha se o contador é menor do que 1, ou seja, foi digitado um numero ou menos
	if(count <= 1){
		numero = numero + clicked_id + '';
		//console.log(numero)
		count++;
	}
	if(count == 2){
		//incrementa o contador pra ele não ter perigo de voltar
		count++;
		//chama a função pra mostrar a foto do candidato
		showHide(numero);
	}
	//imprime os números pressionados na tela
	document.getElementById("tela_numero").innerHTML = numero;
	teclafx.play();
}



//fazer download dos resultados pra excel
function download_csv()
{
	//ainda falta contar os votos brancos
	votosC1 = '=SOMASE(A12:A300;"01";B12:B300)';
	votosC2 = '=SOMASE(A12:A300;"02";B12:B300)';
	votosC3 = '=SOMASE(A12:A300;"03";B12:B300)';
	votosC4 = '=SOMASE(A12:A300;"04";B12:B300)';
	votosC5 = '=SOMASE(A12:A300;"05";B12:B300)';
	votosC6 = '=SOMASE(A12:A300;"06";B12:B300)';
	csv = 'sep=,\nChapa,Quantidade de Votos\n01,'+votosC1+'\n02,'+votosC2+'\n03,'+votosC3+'\n04,'+votosC4+'\n05,'+votosC5+'\n06,'+votosC6+'\nNulos,'+votosNulo+'\nBrancos,\n\nChapa,Votos,Hora\n';
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

function tempo()
{
	let currentDate = new Date();
	hora = botar_zeros(currentDate.getHours());
	minuto = botar_zeros(currentDate.getMinutes());
	segundo = botar_zeros(currentDate.getSeconds());
	let time = hora + ":" + minuto + ":" + segundo;
	return time;
}

//colocar zeros no tempo, se não, ficaria, por ex: 22:2:5
function botar_zeros(x)
{
	if(x < 10)
		x = "0" + x;
	return x;
}

//função pra mostrar a foto do candidato baseado no numero
function showHide(my_id)
{
	//olha se foi digitado algum numero que nao é uma chapa, se sim, altera o id para nulo
	if(my_id != '01' && my_id != '02' && my_id != '03' && my_id != '04' && my_id != '05' && my_id != '06')
	    my_id = 'nulo'

	troca_img = document.getElementById(my_id);
	if(troca_img.style.display == "block")
		troca_img.style.display = "none";
	else
		troca_img.style.display = "block";
}
