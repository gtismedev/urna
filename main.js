var confirmasfx = new Audio('sons/urna.mp3');//,botaosfx = new Audio('sons/.mp3');
var teclafx = new Audio('sons/tecla.mp3');//Som ao teclar.
var numero = '', count = 0, troca_img, csv, hiddenElement,contadorVotos = 0, somaColuna='';
var hora, minuto, segundo;
let data = [];
//data[0][0] = '01'
console.log(data)

function confirma()
{
	//console.log(numero);
	//confirmasfx.play();
	//window.location = 'final.html';
	let currentDate = new Date();
	hora = botar_zeros(currentDate.getHours());
	minuto = botar_zeros(currentDate.getMinutes());
	segundo = botar_zeros(currentDate.getSeconds());
	let time = hora + ":" + minuto + ":" + segundo;
	console.log(time);
	data[contadorVotos] = [numero,'1',time]
	contadorVotos++;
	somaColuna = data.length;
	console.log(data)
}

//botão corrige, para apagar os numeros digitados
function corrige()
{
	teclafx.play();
	//se mandar a variavel sem nada, aparece a imagem do voto nulo, por isso esse if
	if(numero != '')
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
	somaColuna++;
	data[contadorVotos+1] = ['',"=soma(B2:B"+somaColuna+")",'']
    csv = 'Chapa,Votos,Hora\n';
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
