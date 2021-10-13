var confirmasfx = new Audio('sons/urna.mp3');
var teclafx = new Audio('sons/tecla.mp3');//Som ao teclar.
var numero = '', count = 0, troca_img;// csv, hiddenElement,contadorVotos = 0, somaColuna='';
var hora, minuto, segundo;//ver se precisa
let listaVoto = [];//,data = [];
var ls_keys, botaoConfirmar,botaoConfirmarOff;
preenche_lista();


//registra o voto digitado
function confirma()
{
	if(numero != '')
	{
		if(numero != '01' && numero != '02' && numero != '03' && numero != '04' && numero != '05' && numero != 'BR')
			numero = 'nulo';

		botaoConfirmar = document.getElementById('buttonON')
		botaoConfirmarOff = document.getElementById('buttonOFF')
		botaoConfirmar.style.display = "none";
		botaoConfirmarOff.style.display = "initial";

		confirmasfx.play();
		//serve para adicionar um voto ao número digitado
		for(i = 0; i < listaVoto.length; i++)
		{
			if(listaVoto[i].numero == numero)
				listaVoto[i].votos = parseInt(listaVoto[i].votos + 1)
		}

		atualizarLocalStorage()

		if(numero != '' && count == 3)
			showHide(numero);

		numero = '';
		count = 0;
		document.getElementById("tela_numero").innerHTML = '‎ ';
		setTimeout(function(){
				location.replace("final.html");
			}, 1800);
		}
}

function branco()
{
	numero = 'BR';
	count = 3;
	showHide(numero)
	document.getElementById("tela_numero").innerHTML = numero;
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
	document.getElementById("tela_numero").innerHTML = '‎ ';
}

//serve para registrar os numeros quando um botão numero é pressionado
function botao(clicked_id)
{
	if(count <= 1){
		numero = numero + clicked_id + '';
		count++;
	}
	if(count == 2){
		count++;
		showHide(numero);
	}
	teclafx.play();
	document.getElementById("tela_numero").innerHTML = numero;
}

//função pra mostrar a foto do candidato baseado no numero
function showHide(my_id)
{
	//olha se foi digitado algum numero que nao é uma chapa, se sim, altera o id para nulo
	if(my_id != '01' && my_id != '02' && my_id != '03' && my_id != '04' && my_id != '05')
	    my_id = 'nulo'
		
	//tem um bug quando coloca uma chapa, clica no branco, corrige e coloca uma chapa de novo

	troca_img = document.getElementById(my_id);
	sem_nada = document.getElementById('nada');
	if(troca_img.style.display == "block")
	{
		troca_img.style.display = "none";
		sem_nada.style.display = "block";
	}
	else
	{
		sem_nada.style.display = "none";
		troca_img.style.display = "block";
	}
}

function convertePDF() {
	let doc = new jsPDF('p','pt','a4');

	doc.addHTML(document.body,function() {
		doc.save('html.pdf');
	});
}

//retorna uma lista com todos os itens guardados no localstorage
function preenche_lista(){
	ls_keys = Object.keys(localStorage)

	for(i in ls_keys)
		listaVoto.push(JSON.parse(localStorage.getItem(ls_keys[i])))

	return listaVoto
}

//atualiza os novos itens no localstorage
function atualizarLocalStorage() {
	for(i = 0; i < listaVoto.length; i++){
		localStorage.setItem(listaVoto[i].nome, JSON.stringify(listaVoto[i]))
	}
}

/*faz download dos resultados pra excel
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
}*/
