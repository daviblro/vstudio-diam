// ex1
function hideImage() {
    document.getElementById("image").style.opacity = "0";
}
function showImage() {
    document.getElementById("image").style.opacity = "1";
}
//ex2
const palavra = ["Abécula", "Abentesma", "Achavascado", "Alimária", "Andrajoso", "Barregã", "Biltre", "Cacóstomo", "Cuarra", "Estólido",
    "Estroso", "Estultilóquio", "Nefelibata", "Néscio", "Pechenga", "Sevandija", "Somítico", "Tatibitate", "Xexé ou Cheché", "Xexelento"];

function validarComentario() {
    var InputText = document.getElementById("comentario");
    var text = InputText.value;
    for (word of palavra) {
        if (text.includes(word)) {
            InputText.value = "";
            temInsulto();
            return;
        }
    }
    hideMessage();
}
function temInsulto() {
    document.getElementById("error").style.opacity = "1";
}

function hideMessage() {
    document.getElementById("error").style.opacity = "0";
}
//ex3
function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

