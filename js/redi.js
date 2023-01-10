$(document).ready(function () {
    edModalInit();

    copyLink();
    $(".footerED__infoWow").on('click', mostrarMensajeWow);

    $(".vuaHeader__close").on('click', cerrarRedi);

    document.querySelector('body').style.overflow = 'hidden';

    window.scrollTo(0, 0);
});

//funcion responsable de inicializar todos los modales
function edModalInit() {
    $('#btnModalContinuar').on("click", cerrarModal);

    //crea dianamicamente el atributo de  data-edModal en el boton cerrar de cada modal
    $('[data-edModal]').each(function (index) {
        var IdModal = $(this).attr('data-edModal');
        $('#edModal-' + IdModal + ' .js-edModal__cerrar').attr('data-edModalId', IdModal);
    });
    //activa el evento para abrir el modal 
    $('[data-edModal]').click(function () {
        var modal = $(this).attr('data-edModal');
        $('.js-edModal').removeClass('edModal--activo fadeOut');
        $('.js-edModal').addClass('edModal--activo');
        $('body').css('overflow', 'hidden');
    });
    //activa el evento de cierre del modal
    $('.js-edModal__cerrar').on('click', edModalClose);
    $('#btn-close-redi').on('click', edModalClose);
    $('.js-edModal__fondo').on('click', function () {
        $(this).parent().removeClass('edModal--activo');
        $('body').css('overflow', 'initial');
    });

    $('.js-redi__btnCerrar').off('click');
    $('#closeRedi').on('click', cerrarRedi);

    var nombre = localStorage.getItem('nombre');
    if (nombre) {
        $('.js-modalCalificacion__nombre').text(nombre);
    }

}

function cerrarRedi() {
    var data = {
        'cerrarRedi': 'cerrar',
    };
    window.parent.postMessage(data, '*');
}

//funcion responsable de cerrar el modal
function edModalClose(event) {
    cerrarRedi();
    var IdModal = $(this).attr('data-edModalId');
    $('.js-edModal').addClass('fadeOut');
    setTimeout(() => {
        $('.js-edModal').removeClass('edModal--activo');
    }, 1000);
    $('body').css('overflow', 'initial');
}


//Modal intro
function cerrarModal() {
    new Audio('audio/intro.mp3').play();
    $('#modalIntro').fadeOut(300);
    document.querySelector('body').style.overflow = 'initial';
}

// Funcion para copiar el link
function copyLink() {
    $('.btnCopy').on('click', () => {
        navigator.clipboard.writeText($('.btnCopy').attr('data-clipboard-text'));
        mensajeCopyLink();
        $(".footerED__linkCopy").addClass("footerED__linkCopy--active");
        $(".footerED__linkCopy").html("Link copiado");
    });
}

// Funcion que muestra el mensaje copiar link
function mensajeCopyLink() {
    $(".footerED__linkCopy").addClass("footerED__linkCopy--active");

    setTimeout(() => {
        $(".footerED__linkCopy").removeClass("footerED__linkCopy--active");
    }, 2000);
}

// Funcion que muestra el mensaje info ED - Wow
function mostrarMensajeWow() {
    $(".footerED__info").addClass("footerED__info--active");

    $('.footerED__infoMensaje__close').on('click', ocultarMensajeWow);
}

// Funcion que oculta el mensaje info ED - Wow
function ocultarMensajeWow() {
    $(".footerED__info").removeClass("footerED__info--active");
}