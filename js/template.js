/*!
 * Copyright 2015 By Editora do Brasil
 * By: Tiago Juvenal de Lima, tiago.jlima.developer@gmail.com

 * Foca no Código

        .---.
       /o   o\
    __(=  "  =)__
     //\'-=-'/\\
        )   (_
       /      `"=-._
      /       \     ``"=.
     /  /   \  \         `=..--.
 ___/  /     \  \___      _,  , `\
`-----' `""""`'-----``"""`  \  \_/
                             `-`
*/

'use strict';
localStorage.removeItem("novaInstrucao");
localStorage.removeItem("novaNavegacao");
var CONFIG = CONFIG,
	EbsaGame = $('.EbsaGame');

// ************** Inicia o objeto construtor **************

// INJEÇÃO DE TEMPLATES
(function(){
	if(CONFIG[0].infoOed.template == 'akpalo'){
		EbsaGame.prepend('<div class="Template-akpalo">\n<div id="cobertura_cliques"></div>\n<div id="cobertura_menu_atvidao"></div>\n<div class="capa trocaCor" data-cor="capa">\n<div class="iniciar trocaCor" data-cor="iniciar">Iniciar</div>\n<div class="akpalo_btn_creditos trocaCor" data-cor="btn_creditos">Créditos</div>\n<div class="akpalo_capa_disciplina capaNomeDisciplina"></div>\n<div class="akpalo_capa_logotipo trocaCor" data-cor="capa_logotipo"></div>\n<div class="akpalo_capa_logotipo_ebsa"></div>\n<div class="akpalo_capa_quadro_ano trocaCor" data-cor="capa_quadro_ano">\n<div class="akpalo_capa_quadro_ano_contagem trocaAno"></div>\n</div>\n<div class="akpalo_capa_titulo trocaCor tituloCapa" data-cor="capa_titulo"></div>\n</div>\n<div id="grupo_creditos" style="display:none">\n<div class="creditos_cobertura"></div>\n<div class="akpalo_quadro_creditos">\n<div class="akpalo_quadro_creditos_titulo trocaCor" data-cor="quadro_creditos_titulo"><span class="quadroCreditos"></span> <span class="capaNomeDisciplina disciplinaCreditos"></span></div>\n<div class="akpalo_quadro_creditos_divisa"></div>\n<div class="akpalo_quadro_rodape"></div>\n<div class="akpalo_area_txt_creditos">\n<div class="creditos"></div>\n</div>\n<div class="akpalo_quadro_creditos_fechar trocaCor" data-cor="quadro_creditos_fechar">Fechar</div>\n</div>\n</div>');
	}else if(CONFIG[0].infoOed.template == 'apoema'){
		EbsaGame.prepend('<div class="Template-apoema">\n<div id="cobertura_cliques"></div>\n<div id="cobertura_menu_atvidao"></div>\n<div class="capa trocaCor" data-cor="capa">\n<div id="headerCover" class="blend multiply bgCoverHeader-default trocaCor" data-cor="headerCover">\n<div class="contentHeader">\n<h1 class="tituloCapa trocaCor" data-cor="tituloCapa"></h1>\n</div>\n<div class="anoHeader trocaAno trocaCor" data-tipo="texto" data-cor="anoHeader">\n7\n</div>\n<div class="logo"></div>\n</div>\n<div id="navHeader" class="cl-effect-10 bgCoverNav trocaCor" data-cor="navHeader">\n<a href="javascript:void(0)" class="btnIniciar" data-hover="Iniciar"><span class="trocaCor" data-cor="btnIniciar">Iniciar</span></a>\n<div class="btnCreditos">Créditos</div>\n</div>\n<div id="creditos" class="bgCreditos-default trocaCor" data-cor="bgCreditos">\n<h2></h2>\n<div class="overlayCreditos"></div>\n<div class="boxText">\n<div class="text-creditos creditos">\n<div class="img"></div>\n</div>\n</div>\n</div>\n</div>\n</div>');
	}
})();

// Chama função videoFull somente se objeto for = video
if(CONFIG[0].infoOed.tipo == 'video'){
	$('iframe').attr('src','');
	document.querySelector(".btn_menu").style.display="inherit";
	$('#videoPrincipalOedVideo').append('<source src="conteudo/media/video/video.mp4" type="video/mp4">Seu navegador não suporta vídeo.');
	(function(window, document){
	    var seletor = function(selector,context){return(context||document).querySelector(selector)};
	    var video  = seletor("video"),
	        domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');

	    seletor(".iniciar, .btnIniciar").addEventListener("click", function(){
	        var capinha = seletor(".capa");
	        seletor('#videoPrincipalOedVideo').style.display = 'block';
	        setTimeout(function(){
	            capinha.remove();
	            animacao_saida_capa();
	            video.play();
	            $('#videoPrincipalOedVideo').on('ended', function(){
	            	window.location.href = 'index.html';
	            });
	        },1300);
	    }, false);

	    var fullscreen = function(elem) {
	        var prefix;
	        // Mozilla and webkit intialise fullscreen slightly differently
	        for ( var i = -1, len = domPrefixes.length; ++i < len; ) {
	        prefix = domPrefixes[i].toLowerCase();
	        if(elem[prefix + 'EnterFullScreen']){
	            // Webkit uses EnterFullScreen for video
	            return prefix + 'EnterFullScreen';
	            break;
	        }else if(elem[prefix + 'RequestFullScreen']){
	            // Mozilla uses RequestFullScreen for all elements and webkit uses it for non video elements
	            return prefix + 'RequestFullScreen';
	            break;
	        }
	    }
	    return false;
	    };
	    // Will return fullscreen method as a string if supported e.g. "mozRequestFullScreen" || false;
	    var fullscreenvideo = fullscreen(document.createElement("video"));

	    // Webkit uses "requestFullScreen" for non video elements
	    var fullscreenother = fullscreen(document.createElement("iframe"));

	    // Should add prefixed events for potential ms/o or unprefixed support too
	    
	    seletor(".iniciar, .btnIniciar").addEventListener("click", function(){
	        // The test returns a string so we can easily call it on a click event
	        video[fullscreenvideo]();
	        video.style.display = "block";
	    }, false);
	})(this, this.document);
}

var Game = function(){
	animacao_saida_capa();
	document.querySelector(".conteudo").style.background="#ffffff";
};

$('.iniciar, .btnIniciar').on('click', function(){
	if(!(CONFIG[0].infoOed.tipo == 'video')){
		new Game();
		chamar_funcao_frame();
	}
});

// ************** Configuração do jogo, arquivo se encontra em js/config.js **************

//Centralizando na tela o container EbsaGame
var centralizaEbsa = function(){
	var	larguraDocumento = $(window).width()
      , alturaDocumento = $(window).height();
	EbsaGame.css({
		'left': (larguraDocumento / 2) - 1024 / 2+'px',
		'top': (alturaDocumento / 2) - 660 / 2+'px'
	});
};
centralizaEbsa();
// ************** Criando estrutura do template ***************

//Configurações do OED
(function(){
	//Configuração das disciplinas
	var infoOed = CONFIG[0].infoOed,
		infoCreditos = CONFIG[0].infoCreditos,
	    infoTemplate = infoOed.template,
	    disciplina = infoOed.disciplina,
		ano = infoOed.ano,
	    trocaCor = EbsaGame.find('.trocaCor'),
	    trocaAno = EbsaGame.find('.trocaAno'),
	    textoInstrucoes = EbsaGame.children('.InstrucoesPrincipal').find('.texto_instrucoes'),
	    textoNavegacao = EbsaGame.children('.InstrucoesPrincipal').find('.texto_navegabilidade'),
	    tituloPrincipal = $('title'),
	    titulosOED = $('.titulo_objeto, .tituloCapa'),
	    tituloCredito = $('.quadroCreditos'),
	    creditos = $('.creditos'),
	    fullCreditos = infoCreditos.join('<br /><br />'),
	    nomeDisciplinaCapa = $('.capaNomeDisciplina');

    // Aqui insere as classes(cores) das discplinas de acordo com o template
    // Botoes e Titulos
	for(var i = 0; i < trocaCor.length; i++){
		// var selfClass = $(trocaCor[i]).attr('class').replace('akpalo_','').replace(' trocaCor','');
		var selfClass = $(trocaCor[i]).attr('data-cor');
		$(trocaCor[i]).addClass(infoTemplate+'_'+selfClass+'_'+disciplina);
		$(trocaCor[i]).removeClass('trocaCor');
	}

	// Função troca ano
	if(infoTemplate == 'apoema'){
		trocaAno.html(ano);
	}else{
		var selfClassAno = $(trocaAno).attr('class').replace('akpalo_','').replace('_contagem','').replace(' trocaAno','');

		$(trocaAno).addClass(infoTemplate+'_'+selfClassAno+'_'+ano+'_'+disciplina);
		$(trocaAno).removeClass('trocaAno');
	}

	// Função para inserir texto de instrução e texto de navegação
	textoInstrucoes.html(infoOed.instrucoes);
	textoNavegacao.html(infoOed.navegacao);

	// Senão tiver nenhum texto em navegação, não irá aparecer o mesmo.
	if(!(infoOed.navegacao.length > 1)){
		localStorage.setItem('novaNavegacao','sem navegacao');
		$('.abaNavegabilidade').hide();
	}
	// Títulos
	titulosOED.html(infoOed.titulo);
	tituloPrincipal.text($('.titulo_objeto').text());
	// PROJETO OU COLEÇÃO
	tituloCredito.html(infoOed.tituloCreditoAkpalo);
	// Nome da disciplina
	nomeDisciplinaCapa.html(infoOed.disciplina);

	// Inserindo assentuação no titulo disciplina
	if(disciplina == 'portugues'){
		$('.capaNomeDisciplina').text('Língua Portuguesa');
		$('body').addClass("akpalo_fundo_portugues");
	}else if(disciplina == 'matematica'){
		$('.capaNomeDisciplina').text('Matemática');
		$('body').addClass("akpalo_fundo_matematica");
	}else if(disciplina == 'geografia'){
		$('.capaNomeDisciplina').text('Geografia');
		$('body').addClass("akpalo_fundo_geografia");		
	}else if(disciplina == 'historia'){
		$('.capaNomeDisciplina').text('História');
		$('body').addClass("akpalo_fundo_historia");		
	}else if(disciplina == 'ciencias'){
		$('.capaNomeDisciplina').text('Ciências');
		$('body').addClass("akpalo_fundo_ciencias");		
	}
	
	// Inserindo Creditos
	creditos.append(fullCreditos);
	
	switch(infoTemplate){
		case 'akpalo':
			var disciplina = CONFIG[0].infoOed.disciplina;
			// VERIFICA DISCPLINAS PARA INSERIR UMA DEFAULT
			if( !(disciplina == 'portugues' || disciplina == 'matematica' || disciplina == 'historia' || disciplina == 'geografia' || disciplina == 'ciencias') ){
				$('.errorDisciplina').show();
			}else{
				$('.errorDisciplina').hide();
			}

			// Ajustando os créditos
			if(disciplina == 'portugues'){
				$('.disciplinaCreditos').html('<br />Língua Portuguesa').parent().css('top','18px');
			}

			break;

		case 'apoema':

			var disciplina = CONFIG[0].infoOed.disciplina;
			// VERIFICA DISCPLINAS PARA INSERIR UMA DEFAULT
			if( !(disciplina == 'gramatica' )){
				$('.errorDisciplina').show();
			}else{
				$('.errorDisciplina').hide();
			}

			// FUNÇÕES TEMPLATE APOEMA
			var template = $('.Template-apoema'),
				capa = template.children('.capa'),
				creditos = capa.children('#creditos'),
				btnCredito = capa.children('#navHeader').children('.btnCreditos');


			// AJUSTANDO CSS DO TITULO DO OED
			$('.titulo_disciplina').css({
				'z-index':'0',
				'left':'500px',
				'top':'0px',
				'background':'none'
			});
			$('.titulo_objeto').addClass('titulo_apoema');
			$('.InstrucoesPrincipal').addClass('InstrucoesPrincipal-apoema');
			// LIMITANDO DIV COM OVERFLOW DOS CREDITOS
			capa.css('overflow','hidden');
			// INSERINDO NOME DO PROJETO NOS CREDITOS
			creditos.children('h2').append(CONFIG[0].infoOed.disciplina);
			
			var textCreditos = creditos.children('h2').text();
			if(textCreditos == 'portugues'){
				creditos.children('h2').text('Português');
			}else if(textCreditos == 'matematica'){
				creditos.children('h2').text('Matemática');
			}else if(textCreditos == 'historia'){
				creditos.children('h2').text('História');
			}else if(textCreditos == 'ciencias'){
				creditos.children('h2').text('Ciências');
			}else if(textCreditos == 'ingles'){
				creditos.children('h2').text('Inglês');
			}else if(textCreditos == 'gramatica'){
				creditos.children('h2').text('Gramática');
			}

			creditos.children('h2').prepend(CONFIG[0].infoOed.tituloCreditoApoema+' ');
			
			$('body').css('background','url(../img/bgBody_apoema.png) repeat');

			// AQUI: AÇÕES DOS CREDITOS, ALÉM DE SUBIR E DESCER.
			var acaoCreditos = function(){
				var textoCreditos = creditos.children('.boxText').children('.text-creditos');

				// ANIMAÇÃO TEXTO DOS CRÉDITOS SUBINDO
				var subirTexto = function(){
					var alturaBoxCreditos = textoCreditos.height();

					textoCreditos.animate({
						'marginTop': -alturaBoxCreditos+'px'
					}, 60000, 'linear', function(){
						textoCreditos.css('margin-top','370px');
						subirTexto();
					});
				}, stopTexto = function(){
					setTimeout(function(){
						textoCreditos.stop().css('margin-top','370px');
					}, 1000);
				};

				if(!(creditos.is(':visible'))){

					creditos.show().addClass('magictime slideLeftRetourn');
					setTimeout(function(){
						creditos.removeClass('magictime slideLeftRetourn');
					}, 1000);
					
					subirTexto();
				}else{
					stopTexto();
					creditos.addClass('magictime slideLeft');
					setTimeout(function(){
						creditos.removeClass('magictime slideLeft').hide();
					}, 1000);
				}
			};

			// FUNÇÃO DO BOTÃO NO BOTÃO CRÉDITOS
			$(btnCredito).on('click', function(){
				acaoCreditos();				
			});
			$(creditos).on('click', function(){
				acaoCreditos();				
			});

			break;		
	}
})();

// ************** Redimensiona Elemento ***************
function redimensionaElemento() {
	var elemento = EbsaGame;

    var larguraJanela = $(window).width();
    var alturaJanela = $(window).height();
    var larguraInicialElemento = 1024;
    var alturaInicialElemento = 660;

    var relacaoAspecto = larguraInicialElemento / alturaInicialElemento;

	if(alturaJanela <= larguraJanela) {
		var alturaRedimensionada = alturaJanela;
		var larguraRedimensionada = alturaRedimensionada * relacaoAspecto;
		if (larguraJanela < larguraRedimensionada) {
			var larguraRedimensionada = larguraJanela;
			var alturaRedimensionada = larguraRedimensionada / relacaoAspecto;
		}
	}else {
		var larguraRedimensionada = larguraJanela;
		var alturaRedimensionada = larguraRedimensionada / relacaoAspecto;
	}
	
	var escalaLargura = ((larguraRedimensionada / larguraInicialElemento) * 100) / 100.1;
	var escalaAltura = ((alturaRedimensionada / alturaInicialElemento) * 100) / 100.1;
	if(escalaLargura <= 1){
		elemento.css({
			'-webkit-transform': 'scale(' + escalaLargura + ',' + escalaAltura + ')',
			'-moz-transform': 'scale(' + escalaLargura + ',' + escalaAltura + ')',
			'-ms-transform': 'scale(' + escalaLargura + ',' + escalaAltura + ')',
			'-o-transform': 'scale(' + escalaLargura + ',' + escalaAltura + ')',
			'transform': 'scale(' + escalaLargura + ',' + escalaAltura + ')'
		});
	}else{
		elemento.css({
			/*'-webkit-transform': 'scale(1.1))',
			'-moz-transform': 'scale(1.1)',
			'-ms-transform': 'scale(1.1)',
			'-o-transform': 'scale(1.1)',
			'transform': 'scale(1.1)'*/
			'-webkit-transform': 'scale(1))',
			'-moz-transform': 'scale(1)',
			'-ms-transform': 'scale(1)',
			'-o-transform': 'scale(1)',
			'transform': 'scale(1)'
		});
	}
};
redimensionaElemento();

var centerError = function(){
	var alturaTela = $(window).height();
	$('.errorDisciplina').children('img').css({
		'margin-top': (alturaTela / 2) - $('.errorDisciplina').children('img').height() / 2 +'px'
	});
};
centerError();

$(window).resize(function(){
	centralizaEbsa();
	redimensionaElemento();
	centerError();
});