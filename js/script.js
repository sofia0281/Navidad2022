var numImg = 0;
var btncontinuar = "#btn-close-modal";
var idBotonReiniciar = ".botonReiniciar";
var audioPareja = 1;


//questions

var imagenes = [
    'parejaModal01',
    'parejaModal02',
    'parejaModal03',
    'parejaModal04',
    'parejaModal05',
    'parejaModal06',
    'parejaModal07',
    'parejaModal08'
];

var nombres = [
    'María',
    'José',
    'Niño jesus',
    'Melchor',
    'Gaspar',
    'Baltazar',
    'Pastor',
    'La mula y el buey'
];

var classes = [
    '.maria',
    '.jose',
    '.jesus',
    '.melchor',
    '.gaspar',
    '.baltazar',
    '.pastor',
    '.mula-buey'
];

var mensaje = [
    '<p>La primera celebración navideña en la que se montó un pesebre para la conmemoración del nacimiento de Jesús, fue en la nochebuena del año 1223, realizada por San Francisco de Asís.</p>',

    '<p>En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias,  la figura del Niño Jesús se coloca después de la llegada de la Navidad.</p>',

    '<p>El villancico es un género de canción cuya letra hace referencia a la Navidad.</p>',

    '<p>El villancico es un género de canción cuya letra hace referencia a la Navidad.</p>',

    '<p>La palabra Tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.</p>',

    '<p>A la nanita nana es un villancico compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.</p>',

    '<p>A las novenas se les llama “Las Posadas” y  son fiestas populares en México, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.</p>',

    '<p>En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.</p>',
];


function copyArray(array) {
    var aux = [];
    for (var i = 0; i < array.length; i++) {
        var elem = array[i];
        aux.push(elem);
    }
    return aux;
}

var questions = {
    "questions": copyArray(mensaje),
    "max_time": 15
}

function refreshQuestions() {
    if (questions.questions.length <= 0) {
        questions.questions = copyArray(mensaje);
    }
}

var timer_chronometer;

$(document).ready(inicia);

function inicia() {
    $("img").mousedown(function () {
        return false;
    });
}


// to disabled modal close
$('#modal_game').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
});


// objects
function question_card(question) {
    this.type_card = "question";
    this.question = question || "";
    this.source = "tarjeta_pregunta.png";
}

function food_card(food, question, nombre, imagen, className) {
    this.type_card = "food";
    this.food = food;
    this.source = food + ".png";
    this.state = false;
    this.img = imagen + ".png";
    this.name = nombre;
    this.className = className;
    this.question = question;
}

// function point_card(point) {
//     this.type_card = "point";
//     this.val = point;
//     this.source = "tarjeta_puntos.png";
// }

// function pass_card() {
//     this.type_card = "pass";
//     this.source = "tarjeta_ceda.png";
// }

// global variables

var foods;
var points;
var questions;
var board;
var logic_board;
var num_food;
var num_point;
var num_pass;
var num_questions;

var window_card;
var pair_card;
var delay;


// Function to mixing array
function shuffle(a, count, num_iter) {
    count = count || 0;
    num_iter = num_iter || (count + 1);
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    if (count >= num_iter)
        return a;
    else
        return shuffle(a, count + 1, num_iter);

}

// Function to make ordered array
function make_ordered_array(finish) {
    var array = []
    for (var i = 0; i < finish; i++) {
        array.push(i);
    }
    return array;
}


// Function to make object struct board
function make_array_board() {
    var array = [];

    for (var i = 0; i < num_food; i++) {
        //var aux= Math.floor((Math.random() * foods.length) + 0)
        //asigna las parejas de comidas
        array.push(new food_card(foods[i], mensaje[i], nombres[i], imagenes[i], classes[i]));
        array.push(new food_card(foods[i], mensaje[i], nombres[i], imagenes[i], classes[i]));
    }
    for (var i = 0; i < num_point; i++) {
        array.push(new point_card(points[Math.floor((Math.random() * points.length) + 0)]));
    }
    for (var i = 0; i < num_pass; i++) {
        array.push(new pass_card());
    }

    var aux_pos_questions = shuffle(make_ordered_array(num_questions), 0, 5)
    for (var i = 0; i < num_questions; i++) {
        array.push(new question_card(questions[aux_pos_questions[i]]));
    }
    return array;
}

// Function for conver to matrix make_array_board
function make_logic_board() {
    var array = shuffle(make_array_board(), 0, 5)
    var aux_logic_board = []
    var count = 0;
    for (var i = 0; i < board; i++) {
        var aux_row = [];
        for (var j = 0; j < board; j++) {
            aux_row.push(array[count])
            count++;
        }
        aux_logic_board.push(aux_row);
    }
    return aux_logic_board;
}

// Function to make board
function make_board() {
    $("#game_board").empty();

    for (var i = 0; i < board; i++) {

        $("#game_board").append('<div class="row_board" id="row_board_' + i + '">');
        for (var j = 0; j < board; j++) {

            var card = logic_board[i][j]

            $("#row_board_" + i).append('<div class="card_board" id="card_board_' + i + '_' + j + '">');
            $("#card_board_" + i + "_" + j).append('<input type="checkbox" id="check_board_' + i + '_' + j + '">');

            var html_card = '<label class="content_card" for="check_board_' + i + '_' + j + '">' +
                '<div class="face_card">' +
                '<img src="img/tarjeta_cubierta.png" alt="img"></div>' +
                '<div class="face_card">' +
                '<img src="img/' + card.source + '" alt="img_2"></div></label>';

            $("#card_board_" + i + "_" + j).append(html_card);
        }
    }
}

// Function to the logic game
function check_card(i, j) {
    var card = logic_board[i][j];
    // compai if the last card is equal to card current
    if (window_card != "") {
        if (card.type_card != "food") {
            $("#check_board_" + window_card[0] + "_" + window_card[1]).prop('disabled', false);
            $("#check_board_" + window_card[0] + "_" + window_card[1]).prop('checked', false);
            window_card = "";
        }
    }

    if (card.type_card == "point") {
        // open modal
        //$("#modal_game .modal__texto").text("¡¡ Estupendo !! ahora tienes +"+card.val+" puntos.");
        // open and block the point_card
        $("#card_board_" + i + "_" + j + " > label").addClass("open_card");
        $("#check_board_" + i + "_" + j).remove();
    } else if (card.type_card == "pass") {
        // open modal
        //$("#modal_game .modal__texto").text("¡¡ Pierdes tu turno !!");
        // open and block the pass_card
        $("#card_board_" + i + "_" + j + " > label").addClass("open_card");
        $("#check_board_" + i + "_" + j).remove();
    } else if (card.type_card == "question") {
        // open and block the question_card
        $("#card_board_" + i + "_" + j + " > label").addClass("open_card");
        $("#check_board_" + i + "_" + j).remove();
        // open modal
        // $("#modal_game .modal__texto").html(card.question);
        setTimeout(function () {
            $("#modal_game").modal({
                backdrop: 'static',
                keyboard: true,
                show: true
            });
        }, delay);
    } else if (card.type_card == "food") {
        if (window_card == "") {
            window_card = [i, j];
            $("#check_board_" + window_card[0] + "_" + window_card[1]).prop('disabled', true);
        } else if (pair_card == "") {
            pair_card = [i, j];
            $("#check_board_" + pair_card[0] + "_" + pair_card[1]).prop('disabled', true);
        }

        if (window_card != "" && pair_card != "") {

            if (logic_board[window_card[0]][window_card[1]].food == logic_board[pair_card[0]][pair_card[1]].food) {
                // open and block the last-food_card and current-food_card
                $("#card_board_" + window_card[0] + "_" + window_card[1] + " > label").addClass("open_card");
                $("#card_board_" + pair_card[0] + "_" + pair_card[1] + " > label").addClass("open_card");
                $("#check_board_" + window_card[0] + "_" + window_card[1]).remove();
                $("#check_board_" + pair_card[0] + "_" + pair_card[1]).remove();
                refreshQuestions();
                //$("#modal_game .modal__texto").text(questions.questions[0]);
                $("#modal_game .modal__nombre").text(card.name);
                $("#modal_game .modal__texto").html(card.question);
                questions.questions.shift();

                document.querySelector('#modal_game').querySelector(card.className).classList.add('showItem');

                setTimeout(() => {
                    new Audio('audio/correcta.mp3').play();
                }, 500);

                setTimeout(() => {
                    document.querySelector('#modal_game').querySelector(card.className).classList.add('dNone');

                    document.querySelector('#modal_game').querySelector(card.className).classList.remove('showItem');
                }, 5000);

                setTimeout(function () {
                    const audio = new Audio(`audio/pareja${audioPareja}.mp3`);
                    audioPareja++;
                    audio.play();
                    document.querySelector('body').style.overflow = 'hidden';
                    $("#modal_game").modal({
                        backdrop: 'static',
                        keyboard: true,
                        show: true
                    });
                    document.querySelector('#modal_game').querySelector('button').addEventListener('click', () => {
                    document.querySelector('body').style.overflow = 'initial';
                    audio.pause();
                    audio.currentTime = 0;
                    })
                    chronometer();
                }, delay);

                numImg = numImg + 1;
                if (numImg < 8) {
                    $('.feedback').removeClass('feedback--activo');
                } else {
                    $(btncontinuar).text('Finalizar');
                    $(btncontinuar).on('click', modalMensaje);
                }
            } else {
                setTimeout(() => {
                    new Audio('audio/incorrecta.mp3').play();
                }, 500);

                var temp_1 = window_card;
                var temp_2 = pair_card;
                // restart the last-food_card and current-food_card
                setTimeout(function () {
                    $("#check_board_" + temp_1[0] + "_" + temp_1[1]).prop('disabled', false);
                    $("#check_board_" + temp_1[0] + "_" + temp_1[1]).prop('checked', false);
                    $("#check_board_" + temp_2[0] + "_" + temp_2[1]).prop('disabled', false);
                    $("#check_board_" + temp_2[0] + "_" + temp_2[1]).prop('checked', false);
                }, delay);
            }
            window_card = "";
            pair_card = "";
        }
    }
}

function modalMensaje() {
    setTimeout(() => {
        new Audio('audio/final.mp3').play();
        document.querySelector('body').style.overflow = 'hidden';
        $('.feedback').addClass('feedback--activo');
    }, 700);
}

// Function to listen event in the board
function game() {
    $("#game_board .card_board input[type='checkbox']").change(function (element) {
        var check_element = $(element.target).parent(".card_board").attr("id").split("_");

        var i = check_element[check_element.length - 2];
        var j = check_element[check_element.length - 1];

        check_card(i, j);
    });
}

//start the game
function init() {
    $('.feedback').removeClass('feedback--activo');

    // all foods

    //////////////////////////////////////////////////////////////////////////////////
    ////////////// THE NAME FOODS MUST BE EQUIALS TO THE NAME IMAGES /////////////////
    //////////////////////////////////////////////////////////////////////////////////

    foods = ["parejas-001", "parejas-002", "parejas-003", "parejas-004", "parejas-005", "parejas-006", "parejas-007", "parejas-008"];
    // points to win
    points = [5];
    // length board
    board = 4;

    //Tiempo de espera
    delay = 1500;
    // count card for the board
    num_food = 8; // numero de parejas
    num_point = 0;
    num_pass = 0;
    num_questions = (board * board) - num_point - (num_food * 2) - num_pass;

    // var controls
    window_card = "";
    pair_card = "";
    logic_board = make_logic_board();

    make_board();
    game();

    //escucha el evento de enter para cerrar el modal
    $(document).on('keydown', function (e) {
        if (e.keyCode == 27 || e.keyCode == 13) {
            $('#continue').click();
        }
    });

    $(idBotonReiniciar).off('click');
    $(idBotonReiniciar).on('click', () => location.reload());
}

function welcome() {
    $("#welcome").hide().fadeIn(300);
    $("#start_game").click(function () {
        $("#welcome").fadeOut(300);
        init();
    });
}

init();
welcome();

// chronometer
function chronometer() {
    clearInterval(timer_chronometer);
    var seconds = questions.max_time;
    var k_seconds = 0;
    var text_k_seconds = 0;
    $("#modal_game .modal_chronometer").css('display', 'inline-flex');

    timer_chronometer = setInterval(function () {
        $("#modal_game .seconds").text(seconds);
        text_k_seconds = k_seconds < 10 ? "0" + String(k_seconds) : k_seconds;
        $("#modal_game .k_seconds").text(text_k_seconds);
        if (k_seconds == 0) {
            if (seconds == 0) {
                $("#modal_game").addClass("modal_alert");
                clearInterval(timer_chronometer);
            }
            k_seconds = 99;
            seconds--;
        }
        k_seconds--;
    }, 10);
}

//restart modal
function restart_modal() {
    $("#modal_game .modal_chronometer").hide();
    $("#modal_game").removeClass("modal_alert");

}