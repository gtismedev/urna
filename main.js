var confirmasfx = new Audio('sons/urna.mp3');
var teclafx = new Audio('sons/tecla.mp3');//Som ao teclar.
var numero = '', count = 0, troca_img,cont = 0;// csv, hiddenElement,contadorVotos = 0, somaColuna='';
let listaVoto = [];//,data = [];
const p = 'edu@2021';
var ls_keys, botaoConfirmar,botaoConfirmarOff;
var listaVotoNome, listaVotoNumero, listaVotoVotos;
preenche_lista();

function carregaDados() {
	console.log("Rodou")
	elementoPai = document.getElementById("tabela_corpo")

	for(i = 0; i < listaVoto.length; i++){
		tr = document.createElement("tr")
		td1 = document.createElement("td")
		td2 = document.createElement("td")
		td3 = document.createElement("td")


		td1.textContent = listaVoto[i].nome
		td2.textContent = listaVoto[i].numero
		td3.textContent = listaVoto[i].votos

		tr.appendChild(td1)
		tr.appendChild(td2)
		tr.appendChild(td3)

		elementoPai.appendChild(tr)
	}

}
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
	if(numero == '')
	{
		teclafx.play();
		numero = 'BR';
		count = 3;
		showHide(numero)
		document.getElementById("tela_numero").innerHTML = numero;
	}
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
	if(my_id != '01' && my_id != '02' && my_id != '03' && my_id != '04' && my_id != '05' && my_id != 'BR')
	    my_id = 'nulo';

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

function end()
{
	var verificante = prompt('Insira a senha para continuar')
	if(verificante == p)
	{
		location.replace("resultados.html");
	}
	else
	{
		alert('Senha incorreta. Tente novamente.')
	}
}

function convertePDF()
{
	let pdf = new jsPDF('p', 'pt', 'letter');

	pdf.text(160, 50, 'RESULTADOS DA ELEIÇÃO');
	pdf.text(90, 500, 'ASSINATURA DO MESÁRIO');
	pdf.text(100, 530, '_____________________');
    source = $('#div_tabela')[0];
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer)
		{
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML
	(
		source, // HTML string or DOM elem ref.
		margins.left, // x coord
		margins.top, { // y coord
		    'width': margins.width, // max width of content on PDF
		    'elementHandlers': specialElementHandlers
		},

		function (dispose) {

		    pdf.save('resultados.pdf');
			//window.open(pdf.output('bloburl')); // to debug
		}, margins
	);
	alert('Sua votação foi baixada!')
}

//retorna uma lista com todos os itens guardados no localstorage
function preenche_lista(){
	ls_keys = Object.keys(localStorage)

	for(i in ls_keys)
		listaVoto.push(JSON.parse(localStorage.getItem(ls_keys[i])))

	//sort listaVoto
	var i = 5;
	while(cont <= 3)
	{
		listaVotoNome = listaVoto[cont].nome
		listaVotoNumero = listaVoto[cont].numero
		listaVotoVotos = listaVoto[cont].votos
		listaVoto[cont].nome = listaVoto[i].nome
		listaVoto[cont].numero = listaVoto[i].numero
		listaVoto[cont].votos = listaVoto[i].votos
		listaVoto[i].nome = listaVotoNome
		listaVoto[i].numero = listaVotoNumero
		listaVoto[i].votos = listaVotoVotos
		if(cont != 2)
		{
			cont++;
			i--;
		}
		else if(cont == 2)
		{
			cont++;
			i+=2;
		}

	/*cont=0,i=5;
	cont=1,i=4;
	cont=2,i=3;
	cont=3,i=5*/
	}

	return listaVoto;
}

//atualiza os novos itens no localstorage
function atualizarLocalStorage() {
	for(i = 0; i < listaVoto.length; i++){
		localStorage.setItem(listaVoto[i].nome, JSON.stringify(listaVoto[i]))
	}
}
