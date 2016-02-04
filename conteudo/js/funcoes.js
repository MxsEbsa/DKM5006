'use strict';

// ----- NARRAÇÃO ----- //
var audio_total = new Howl({
	buffer: false,
    urls: ['media/audio/audio_total.ogg', 'media/audio/audio_total.wav', 'media/audio/audio_total.mp3'],
    sprite: {
		/* Efeitos */
		efeito1: [68000, 1000],
		efeito2: [70600, 1000],
		/* Narrações*/
        text1: [0, 34000],
        text2: [33000, 6000],
        text3: [39000, 8000],
        text4: [47500, 10000],
        text5: [57500, 5000],
    }
});


var startGame = {

    init: function () {
        // TrocaInstrucao('Regras<br/>1. O objetivo do jogo é decompor o número do canto inferior esquerdo da tela. Para isso, você precisa acertar os divisores primos desse número no alvo.<br>2. Se você acertar o alvo, ao lado da igualdade surgirá a multiplicação desse primo por outro número. Esse novo número também precisa ser decomposto.<br>3. O jogo termina quando não for possível decompor mais nenhum número.');

        // ----- INICIAR VARIAVEIS ----- //

        var positionDardo = [[92, 438], [113, 593], [207, 468], [207, 530], [254, 320], [234, 442], [247, 587], [277, 678], [327, 458], [347, 568], [387, 418], [387, 598], [-170, 400]];
        var ativaClique = true;
        var reset = false;
        var decom = 0;
        var select = [];
        var concat = 0;
        var n = 0;

        // ----- EXIBIR TELA ----- //

        numRandom();
        $('.tela').fadeOut(function () { $('.tela').fadeIn(2500); });
        $('.overlay').fadeOut(function () { $('.overlay').delay(2000).fadeIn(); });
        $('#mapHid').fadeOut(function () { $('#mapHid').delay(3000).fadeIn(); });
        $('.dardo, .dardoShadow, .regras').fadeOut(500, function () {
            $('.alvo').fadeIn(250).animate({ 'top': '0px', 'left': '0px' }, 1500, 'easeOutBounce');
            $('.dardo').delay(500).fadeIn(480).animate({ 'top': '363px', 'left': '743px' }, 'fast');
            $('.dardoShadow').delay(500).fadeIn(500).animate({ 'top': '553px', 'left': '755px' }, 'fast');
        });
        $('.dardoPin, .dardoBase').fadeOut(1000, function () { $('.dardoPin, .dardoBase').fadeIn(500); });
        setTimeout(function () { audio_total.play('efeito1'); }, 1450);
        setTimeout(function () { audio_total.play('text1'); }, 2700);
        $('#composto').text(decom);

        // ----- SAIR DO LIGHTBOX ----- //

        $('.exit').click(function () {
            audio_total.stop();
            if (reset == true) {
                reset = false;
                decom = 0;
                numRandom();
                select = [];
                $('.lBoxBord-end, .overlay, .exit').fadeOut();
                $('#composto').text(decom);
                $('#expressao').text('');
                $('.dardo').fadeOut(500, function () {
	                $('.dardo').fadeIn(500);
	                $('.dardo').removeClass('transition').css({ 'top': '363px', 'left': '743px', 'transform': 'rotate(0deg) scale(1)' });
                    setTimeout(function () {ativaClique = true;}, 750);
            	});
            }
            else {
                $('.overlay').fadeOut();
                $('.calculo').css('bottom', '0px');
                $('.info, .composto, .sinal, .expressao, .dardoShadow').delay(750).fadeIn();
                $('.regras').delay(600).fadeIn(750);
                if ($('.dardo').hasClass('transition')) {
                	$('.dardo').removeClass('transition');
                	$('.dardo').fadeOut(500, function () {
	                	$('.dardo').fadeIn(500);
	                	$('.dardo').css({ 'top': '363px', 'left': '743px', 'transform': 'rotate(0deg) scale(1)', });
                        setTimeout(function () {ativaClique = true;}, 750);
            		});
            	}
            }
        });

        // ----- EXIBIR REGRAS ----- //

        $('.regras').click(function () {
            if (ativaClique == true) {
                $('.lBoxBord-corr, .lBoxBord-err, .lBoxBord-att').css('display', 'none');
                $('.lBoxBord, .overlay, .exit').fadeIn();
            }
         });

        // ----- DISPARAR DARDO ----- //

        $('.val').click(function () {
            if (ativaClique == true) {
                ativaClique = false;
                n = $(this).attr('n') * 1;
                if (decom % n == 0) {
                    decom = decom / n;
                    select.push(n);
                    select.sort(comparar);
                    var concat = select.join(' x ');
                    if (decom == 2 || decom == 3 || decom == 5 || decom == 7 || decom == 11) {
                        reset = true;
                        select.push(decom);
                        select.sort(comparar);
                        concat = select.join(' x ');
                        $('#expressao').text(concat);
                        setTimeout(function () { audio_total.play('efeito1'); }, 350);
                        $('.info, .calculo').css('z-index', '4');
                        $('.lBoxBord, .lBoxBord-corr, .lBoxBord-err, .lBoxBord-att').fadeOut();
                        $('.lBoxBord-end, .overlay, .exit').delay(500).fadeIn();
                        audio_total.play('text5');
                    }
                    else {
                        $('.info, .calculo').css('z-index', '4');
                        $('#expressao').text(concat + ' x ' + decom + ' =');
                        setTimeout(function () { audio_total.play('efeito1'); }, 350);
                        setTimeout(function () {
                            $('.lBoxBord, .lBoxBord-err, .lBoxBord-att').fadeOut();
                            $('.lBoxBord-corr, .overlay, .exit').delay(800).fadeIn();
                            audio_total.play('text4');
                        }, 800);
                    }
                    animaDardo($(this).index());
                }
                else {
                    $('.info, .calculo').css('z-index', '4');
                    $('.lBoxBord, .lBoxBord-corr, .lBoxBord-att').fadeOut();
                    $('.lBoxBord-err, .overlay, .exit').delay(1000).fadeIn();
                    setTimeout(function () { audio_total.play('efeito2'); }, 750);
                    audio_total.play('text3');
                    animaDardoErro();
                }
            }
        });

        $('.val02, .val10').click(function () {
            if (ativaClique == true) {
                ativaClique = false;
                $('.info, .calculo').css('z-index', '2');
                $('.lBoxBord, .lBoxBord-corr, .lBoxBord-err').fadeOut();
                $('.lBoxBord-att, .overlay, .exit').delay(800).fadeIn();
                setTimeout(function () { audio_total.play('efeito2'); }, 750);
                audio_total.play('text2');
                animaDardoErro();
            }
        });
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		}else{
			$(".hov").mouseover(function () {
				$(".anima").eq($(this).index()).stop().fadeIn()
			});
			$(".hov").mouseout(function () {
				$(".anima").eq($(this).index()).stop().fadeOut()
			});			
		}




        // -------------------------------------------- FUNCOES -------------------------------------------- //



        // -- ANIMA DARDO -- //
        function animaDardo(e) {
            $('.dardoShadow').fadeOut(250);
            $('.dardo').addClass('transition');
            if (e <= 3) {
                $('.dardo').addClass('transition').css({
                    'left': '1000px', 'top': '430px', 'transform': 'rotate(74deg) scale(0.65)', 'transition-timing-function': 'ease-in',
                });
            } else if (e >= 4 && e <= 9) {
                $('.dardo').addClass('transition').css({
                    'left': '1000px', 'top': '430px', 'transform': 'rotate(68deg) scale(0.65)', 'transition-timing-function': 'ease-in',
                });
            } else {
                $('.dardo').addClass('transition').css({
                    'left': '1100px', 'top': '280px', 'transform': 'rotate(44deg) scale(0.65)', 'transition-timing-function': 'ease-in',
                });
            }
            setTimeout(function () {
                $('.dardo').addClass('transition').css({
                    'left': positionDardo[e][1] + 'px', 'top': positionDardo[e][0] + 'px', 'transition-timing-function': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
                });
            }, 150);
        }
        function animaDardoErro() {
            $('.dardoShadow').fadeOut(250);
            $('.dardo').addClass('transition').css({
                'left': '900px', 'top': '330px', 'transform': 'rotate(74deg) scale(0.65)', 'transition-timing-function': 'ease-in'
            });
            setTimeout(function () {
                $('.dardo').addClass('transition').css({
                    'left': positionDardo[12][1] + 'px', 'top': positionDardo[12][0] + 'px', 'transform': 'rotate(110deg) scale(0.45)', 'transition-timing-function': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
                });
            }, 500);
        };

        // -- GERAR NUMERO RANDOMICO -- //
        function numRandom() {
            var rand1 = Math.floor(Math.random() * 3) * 2;
            var rand2 = Math.floor(Math.random() * 3) * 3;
            var rand3 = Math.floor(Math.random() * 3) * 5;
            var rand4 = Math.floor(Math.random() * 2) * 7;
            var rand5 = Math.floor(Math.random() * 2) * 11;
            if (rand1 == 0) { rand1 = 1 };
            if (rand2 == 0) { rand2 = 1 };
            if (rand3 == 0) { rand3 = 1 };
            if (rand4 == 0) { rand4 = 1 };
            if (rand5 == 0) { rand5 = 1 };
            decom = rand1 * rand2 * rand3 * rand4 * rand5;
            console.log(decom);
            if(decom < 78) {
                numRandom();
            };
        };

        // -- ORDENAR EXPRESSAO -- //
        function comparar(a, b) {
            if (a < b) { return -1 }
            else if (a > b) { return 1 }
            else { return 0 }
        }
    }
};

// startGame.init();

function iniciar_com_tap(){
// Testar //
		var is_droid = navigator.userAgent.toLowerCase();
		var true_droid = is_droid.indexOf("android") > -1;
		if(true_droid) {
		}else{
			audio_total.play('text1');
			audio_total.stop();
			Howler.codecs();
	}
	// Testar //	

}
