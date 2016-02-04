/* Declaração de variáveis globais */
info_local = sessionStorage;
sessionStorage.setItem('iniciar_oed', 'nao');
var acesso_menu_entrada;
var status_menu;
acesso_menu_entrada=1;
status_menu=0;


var dadosDeInstrucaoNavegacao = function(){
	if(localStorage.getItem('novaInstrucao') == 'sem instrucao'){
		CONFIG[0].infoOed.instrucoes = '';
		localStorage.removeItem("novaInstrucao");
	}else{
		if(localStorage.getItem('novaInstrucao')){
	    	CONFIG[0].infoOed.instrucoes = localStorage.getItem('novaInstrucao');
	    	$('.EbsaGame').children('.InstrucoesPrincipal').find('.texto_instrucoes').html(CONFIG[0].infoOed.instrucoes);
			localStorage.removeItem("novaInstrucao");
		}
	}
	if(localStorage.getItem('novaNavegacao') == 'sem navegacao'){
		CONFIG[0].infoOed.navegacao = '';
		localStorage.removeItem("novaInstrucao");
		// Senão tiver nenhum texto em navegação, não irá aparecer o mesmo.
		$('.instrucoes_aba_navegabilidade ').hide();

	}else{ 
		// Senão tiver nenhum texto em navegação, não irá aparecer o mesmo.
		$('.instrucoes_aba_navegabilidade ').show();

		if(localStorage.getItem('novaNavegacao')){
			CONFIG[0].infoOed.navegacao = localStorage.getItem('novaNavegacao');
	    	$('.EbsaGame').children('.InstrucoesPrincipal').find('.texto_navegabilidade').html(CONFIG[0].infoOed.navegacao);
			localStorage.removeItem("novaNavegacao");
		}
	}
}

/* Lista de funções para animações e movimentos */
	function animacao_entrada_capa(){
			setTimeout(function(){
			document.querySelector(".akpalo_capa_titulo").style.height=($(".akpalo_capa_titulo").height())+"px";
			document.querySelector(".akpalo_capa_titulo").style.marginTop=(($(".akpalo_capa_titulo").height()+50)/2)*(-1)+"px";
			// console.log($(".quadro_instrucoes").height());
			// document.querySelector(".quadro_instrucoes").style.marginTop=(($(".quadro_instrucoes").height())/2)*(-1)+"px";
		}, 100);
		document.querySelector(".capa").style.display="inherit";
		$(".capa").addClass("animacao_tempo_2 zoomInUp");
		// SCRIPT BY TIAGO LIMA
		if(CONFIG[0].infoOed.template == 'apoema'){
			$('.tituloCapa').textillate({
				initialDelay: 0,
				autoStart: true,
				in: {
					delayScale: .6,
					effect: 'spaceInUp',
					callback: function () {
						$('.anoHeader').show().addClass('magictime boingInUp');
					}
				}
			});
		}
		// END SCRIPT BY TIAGO LIMA

		$(".iniciar").addClass("animacao_1 bounceInUp");
		$(".akpalo_btn_creditos").addClass("animacao_1 bounceInUp");
		$(".akpalo_capa_logotipo").addClass("animacao twisterInUp");
		$(".akpalo_capa_quadro_ano").addClass("animacao_1 spaceInLeft");
		$(".akpalo_capa_quadro_ano_contagem").addClass("animacao_1 zoomInUp");
		$(".akpalo_capa_titulo").addClass("animacao twisterInUp");
		$(".akpalo_capa_logotipo_ebsa").addClass("animacao_1 bounceInUp");
		$(".akpalo_capa_disciplina").addClass("animacao_1 fadeIn");
	}
	function animacao_saida_capa(){

		if(CONFIG[0].infoOed.template == 'akpalo'){
			localStorage.setItem('iniciar_oed', 'sim');
			document.querySelector("#cobertura_cliques").style.display="inherit";
			document.querySelector(".conteudo").style.display="inherit";
			document.querySelector(".header").style.display="inherit";
			$(".capa").removeClass("animacao_tempo_2 zoomInUp");
			$(".iniciar").removeClass("animacao_1 bounceInDown");
			$(".akpalo_btn_creditos").removeClass("animacao_1 bounceInDown");
			$(".akpalo_capa_logotipo").removeClass("animacao twisterInUp");
			$(".akpalo_capa_quadro_ano").removeClass("animacao_1 spaceInLeft");
			$(".akpalo_capa_quadro_ano_contagem").removeClass("animacao_1 zoomInUp");
			$(".akpalo_capa_titulo").removeClass("animacao twisterInUp");
			$(".akpalo_capa_logotipo_ebsa").removeClass("animacao_1 bounceInUp");
			$(".akpalo_capa_disciplina").removeClass("animacao_1 fadeIn");	
			$(".iniciar").addClass("animacao bounceOutRight");
			$(".akpalo_btn_creditos").addClass("animacao bounceOutRight");
			$(".akpalo_capa_logotipo").addClass("animacao magic");
			$(".akpalo_capa_quadro_ano").addClass("animacao vanishOut");
			$(".akpalo_capa_quadro_ano_contagem").addClass("animacao puffOut");
			$(".akpalo_capa_titulo").addClass("animacao magic");
			$(".akpalo_capa_logotipo_ebsa").addClass("animacao bounceOutDown");
			$(".akpalo_capa_disciplina").addClass("animacao fadeOut");
			$(".capa").addClass("animacao_saida_capa fadeOut");
			$(".conteudo").addClass("animacao zoomInUp");
			if($(".capa").is(":visible") != false){
				setTimeout(function(){
					document.querySelector(".capa").style.display="none";
					document.querySelector("#cobertura_cliques").style.display="none";
					$(".conteudo").removeClass("animacao spaceInUp");
					document.querySelector(".btn_menu").style.display="inherit";
				}, 1000);
			}
			setTimeout(function(){
				animacao_entrada_menu();
			}, 500);			
			setTimeout(function(){
				if(acesso_menu_entrada==1){
					animacao_saida_menu();
				}
			}, 4000);	
		}else if(CONFIG[0].infoOed.template == 'apoema'){
			localStorage.setItem('iniciar_oed', 'sim');
			$(".capa").removeClass("animacao_tempo_2 zoomInUp");
			
			$(".capa").addClass("animacao_saida_capa bombLeftOut");
			$(".conteudo").show().addClass("animacao zoomInUp");
			document.querySelector(".header").style.display="inherit";
			if($(".capa").is(":visible") != false){
				setTimeout(function(){
					document.querySelector(".capa").style.display="none";
					$(".conteudo").removeClass("animacao spaceInUp");
					document.querySelector(".btn_menu").style.display="inherit";
				}, 1000);
			}
			setTimeout(function(){
				animacao_entrada_menu();
			}, 500);			
			setTimeout(function(){
				if(acesso_menu_entrada==1){
					animacao_saida_menu();
				}
			}, 4000);	
		}
	}

	function animacao_entrada_creditos(){
		document.querySelector("#grupo_creditos").style.display="inherit";
		document.querySelector(".creditos_cobertura").style.display="inherit";
		document.querySelector("#cobertura_cliques").style.display="inherit";
		$(".capa").addClass("blur-in");
		$(".akpalo_quadro_creditos").addClass("animacao twisterInDown");
		setTimeout(function(){
			document.querySelector("#cobertura_cliques").style.display="none";
			subir_creditos();
			function subir_creditos(){
				document.querySelector(".creditos").style.top="354px";
				altura_creditos=$(".creditos").height();
				$(".creditos").animate({top:(altura_creditos*-1)+'px'},(altura_creditos/20)*1000, "linear", function(){subir_creditos();});
			}
		}, 1000);
	}	
	function animacao_saida_creditos(){
		$(".capa").removeClass("blur-in");
		$(".capa").addClass("blur-out");
		document.querySelector("#cobertura_cliques").style.display="inherit";
		document.querySelector("#grupo_creditos").style.display="inherit";
		$(".akpalo_quadro_creditos").removeClass("animacao twisterInDown");
		$(".akpalo_quadro_creditos").addClass("animacao zoomOutDown");
		setTimeout(function(){
			$(".capa").removeClass("blur-in");
			$(".capa").removeClass("blur-out");
			document.querySelector("#grupo_creditos").style.display="none";
			$(".akpalo_quadro_creditos").removeClass("animacao zoomOutDown");
			document.querySelector(".creditos_cobertura").style.display="none";
			document.querySelector("#cobertura_cliques").style.display="none";
			$(".creditos").stop();
			document.querySelector(".creditos").style.top="354px";
		}, 1000);			
	}
	function animacao_menu_sobre(){
		$(".btn_menu").removeClass("menu_on menu_out");
		$(".btn_menu").addClass("menu_on");
	}
	function animacao_menu_fora(){
		$(".btn_menu").removeClass("menu_on menu_out");
		$(".btn_menu").addClass("menu_out");
	}
	function animacao_entrada_menu(){

		// SE NÃO EXISTIR INSTRUCOES, O BOTAO NÃO IRÁ TER AÇÃO
		if(CONFIG[0].infoOed.instrucoes.length < 1){

			document.querySelector(".btn_home").style.display="inherit";
			document.querySelector(".btn_instrucoes").style.display="inherit";
			document.querySelector(".titulo_objeto").style.display="inherit";
			document.querySelector(".titulo_disciplina").style.display="inherit";
			$(".btn_home").addClass("animacao twisterInUp");
			$(".btn_instrucoes").addClass("animacao twisterInDown");
			$(".btn_menu").addClass("animacao rubberBand");		
			$(".titulo_objeto").addClass("animacao fadeInDown");
			$(".titulo_disciplina").addClass("animacao fadeInDown");
			setTimeout(function(){
				$(".btn_instrucoes").addClass('noClick').removeClass("animacao").css({
					'opacity':'0.5',
					'cursor':'default'
				});
				$(".btn_menu").removeClass("animacao rubberBand");	
				$(".btn_menu").addClass("menu_ativado");	
			}, 1000);
		}else{

			document.querySelector(".btn_home").style.display="inherit";
			document.querySelector(".btn_instrucoes").style.display="inherit";
			document.querySelector(".titulo_objeto").style.display="inherit";
			document.querySelector(".titulo_disciplina").style.display="inherit";
			$(".btn_home").addClass("animacao twisterInUp");
			$(".btn_instrucoes").addClass("animacao twisterInDown");
			$(".btn_menu").addClass("animacao rubberBand");		
			$(".titulo_objeto").addClass("animacao fadeInDown");
			$(".titulo_disciplina").addClass("animacao fadeInDown");
			setTimeout(function(){
				$(".btn_instrucoes").removeClass('noClick').addClass("animacao twisterInDown").css({
					'opacity':'1',
					'cursor':'pointer'
				});
				$(".btn_menu").removeClass("animacao rubberBand");	
				$(".btn_menu").addClass("menu_ativado");	
			}, 1000);
		}
	}
	function animacao_saida_menu(){
		status_menu=1;
		animacao_saida_instrucoes();
		$(".btn_home").removeClass("animacao twisterInUp");
		$(".btn_instrucoes").removeClass("animacao twisterInDown");
		$(".titulo_objeto").removeClass("animacao fadeInDown");
		$(".titulo_disciplina").removeClass("animacao fadeInDown");
		$(".btn_home").addClass("animacao magic");
		$(".btn_instrucoes").addClass("animacao magic");
		$(".titulo_objeto").addClass("animacao fadeOutUp");
		$(".titulo_disciplina").addClass("animacao fadeOutUp");		
		$(".btn_menu").addClass("animacao rubberBand");	
		setTimeout(function(){
			$(".btn_menu").removeClass("menu_ativado");	
		}, 500);			
		setTimeout(function(){
			$(".btn_menu").removeClass("animacao rubberBand");	
			$(".btn_menu").addClass("animacao zoomOut");
			document.querySelector(".btn_home").style.display="none";
			document.querySelector(".btn_instrucoes").style.display="none";
			document.querySelector(".titulo_objeto").style.display="none";
			document.querySelector(".titulo_disciplina").style.display="none";
			document.querySelector("#cobertura_cliques").style.display="none";
			$(".titulo_objeto").removeClass("animacao fadeOutUp");
			$(".titulo_disciplina").removeClass("animacao fadeOutUp");
		}, 1000);
		setTimeout(function(){
			$(".btn_menu").removeClass("animacao zoomOut");	
		}, 2000);
	}
	function animacao_entrada_instrucoes(){

		if(CONFIG[0].infoOed.template == 'akpalo'){
			document.querySelector("#cobertura_menu_atvidao").style.display="inherit";
			$(".conteudo").removeClass("blur-in_conteudo blur-out");
			$("video").removeClass("blur-in_conteudo blur-out");
			$(".conteudo").addClass("blur-in_conteudo");
			$("video").addClass("blur-in_conteudo");
			document.querySelector(".btn_instrucoes_ativado").style.display="inherit";
			document.querySelector("#cobertura_cliques").style.display="inherit";
			
			$('.quadro_instrucoes').parent().parent().css('display','table');
			$(".quadro_instrucoes").removeClass("animacao_500ms twisterInDown animacao magic");
			$(".quadro_instrucoes").addClass("animacao_500ms twisterInDown");
			setTimeout(function(){
				document.querySelector("#cobertura_cliques").style.display="none";
			}, 500);		
		}else if(CONFIG[0].infoOed.template == 'apoema'){
			$(".conteudo").removeClass("blur-in_conteudo blur-out");
			$("video").removeClass("blur-in_conteudo blur-out");
			$(".conteudo").addClass("blur-in_conteudo");
			$("video").addClass("blur-in_conteudo");
			document.querySelector(".btn_instrucoes_ativado").style.display="inherit";
			document.querySelector("#cobertura_cliques").style.display="inherit";
			
			$('.quadro_instrucoes').parent().parent().css('display','table');
			$(".quadro_instrucoes").removeClass("animacao_500ms twisterInDown animacao magic");
			$(".quadro_instrucoes").addClass("animacao_500ms twisterInDown");
			setTimeout(function(){
				document.querySelector("#cobertura_cliques").style.display="none";
			}, 500);		
		}
	}
	function animacao_saida_instrucoes(){
		
		if(CONFIG[0].infoOed.template == 'akpalo'){
			document.querySelector("#cobertura_menu_atvidao").style.display="none";
			$(".conteudo").removeClass("blur-in_conteudo blur-out");
			$("video").removeClass("blur-in_conteudo blur-out");
			$(".conteudo").addClass("blur-out");
			$("video").addClass("blur-out");
			document.querySelector(".btn_instrucoes_ativado").style.display="none";
			document.querySelector("#cobertura_cliques").style.display="inherit";
			
			$(".quadro_instrucoes").removeClass("animacao_500ms twisterInDown animacao magic rollIn");
			$(".quadro_instrucoes").addClass("animacao magic");	
			setTimeout(function(){
				$('.quadro_instrucoes').parent().parent().css('display','none');
				document.querySelector("#cobertura_cliques").style.display="none";
			}, 1000);
		}else if(CONFIG[0].infoOed.template == 'apoema'){
			$(".conteudo").removeClass("blur-in_conteudo blur-out");
			$("video").removeClass("blur-in_conteudo blur-out");
			$(".conteudo").addClass("blur-out");
			$("video").addClass("blur-out");
			document.querySelector(".btn_instrucoes_ativado").style.display="none";
			
			$(".quadro_instrucoes").removeClass("animacao_500ms twisterInDown animacao magic rollIn");
			$(".quadro_instrucoes").addClass("animacao magic");	
			setTimeout(function(){
				$('.quadro_instrucoes').parent().parent().css('display','none');
				document.querySelector("#cobertura_cliques").style.display="none";
			}, 1000);
		}
		
	}		
	function animacao_abrir_instrucoes_navegabilidade(){
		document.querySelector(".instrucoes_aba_ativada").style.display="inherit";
		$(".instrucoes_aba_navegabilidade").text("Instruções");
		$(".instrucoes_aba_instrucoes").text("Navegabilidade");
		document.querySelector(".texto_navegabilidade").style.display="inherit";
		document.querySelector(".texto_instrucoes").style.display="none";
		document.querySelector(".instrucoes_aba_navegabilidade").style.left="14px";		
		document.querySelector(".instrucoes_aba_instrucoes").style.left="152px";
		document.querySelector(".instrucoes_aba_ativada").style.left="14px";
	}
	function animacao_fechar_instrucoes_navegabilidade(){
		document.querySelector(".instrucoes_aba_ativada").style.display="none";
		$(".instrucoes_aba_navegabilidade").text("Navegabilidade");
		$(".instrucoes_aba_instrucoes").text("Instruções");
		document.querySelector(".texto_instrucoes").style.display="inherit";
		document.querySelector(".texto_navegabilidade").style.display="none";
		document.querySelector(".instrucoes_aba_navegabilidade").style.left="152px";		
		document.querySelector(".instrucoes_aba_instrucoes").style.left="14px";
		document.querySelector(".instrucoes_aba_ativada").style.left="152px";		
	}	
	function animacao_reiniciar_oed(){
		$(".EbsaGame").addClass("animacao fadeOut");	
		setTimeout(function(){
			location.reload();
		}, 900);		
	}	
/* Organização de interações: click, over, out, etc. */
    $(".akpalo_btn_creditos").click(function(){
		animacao_entrada_creditos();
    });
    $(".akpalo_quadro_creditos_fechar").click(function(){
		animacao_saida_creditos();
    });
    $(".akpalo_quadro_creditos_fechar, .creditos_cobertura").click(function(){
		animacao_saida_creditos();
    });
    $(".titulo_objeto, .titulo_disciplina").click(function(){
		animacao_saida_menu();
		acesso_menu_entrada=2;
		status_menu++;
    });
    $(".btn_menu").click(function(){
		status_menu++;
		if(status_menu>=2){

			dadosDeInstrucaoNavegacao();
			status_menu=0;
			acesso_menu_entrada=2;
			animacao_entrada_menu();
		}else{
			animacao_saida_menu();
			acesso_menu_entrada=2;
		}
    });
    $(".btn_menu").mouseover(function(){
		animacao_menu_sobre();
    });	
    $(".btn_menu").mouseout(function(){
		animacao_menu_fora();
    });		
    $(".btn_home").click(function(){
		animacao_reiniciar_oed();
    });	
    $(".btn_instrucoes").click(function(){
    	if(!($(this).hasClass('noClick'))){
    	    	
    		dadosDeInstrucaoNavegacao();

			animacao_entrada_instrucoes();
			acesso_menu_entrada=2;
			//status_menu++;
		}

		// Senão tiver nenhum texto em navegação, não irá aparecer o mesmo.
		if(!(CONFIG[0].infoOed.navegacao.length > 1)){
			$('.instrucoes_aba_navegabilidade').hide();
		}
    });	
    $(".btn_instrucoes_ativado").click(function(){
		animacao_saida_instrucoes();
		acesso_menu_entrada=2;
    });	
    $(".instrucoes_aba_ativada").click(function(){
    	$('.quadro_instrucoes').removeClass('animacao_500ms twisterInDown').addClass('bounceIn animated');
    	setTimeout(function(){
    		$('.quadro_instrucoes').removeClass('bounceIn animated');
    	}, 1000);
		animacao_fechar_instrucoes_navegabilidade();
    });	
    $(".instrucoes_aba_navegabilidade").click(function(){
    	$('.quadro_instrucoes').removeClass('animacao_500ms twisterInDown').addClass('bounceIn animated');
    	setTimeout(function(){
    		$('.quadro_instrucoes').removeClass('bounceIn animated');
    	}, 1000);
		animacao_abrir_instrucoes_navegabilidade();
    });	
    $(".btn_fechar_instrucoes, #cobertura_menu_atvidao").click(function(){
		animacao_saida_instrucoes();
    });	

	function chamar_funcao_frame(){
		sessionStorage.setItem('iniciar_oed', 'sim');
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			window.parent.frame_game.iniciar_oed_frame();
	}

} 