$(document).ready(function(){

    $('#dugmeSaljiForma').click(provera);

})

function provera(){

    var greske = [];

    var ime = document.getElementById('imeKorisnika');
    
    var mail = document.getElementById('mailKorisnika');

    var tip = document.getElementById('birajVrstu').value;

    var poruka = document.getElementById('areaKontakt');

    var greskaIme = document.getElementById('greska1');

    var greskaMail = document.getElementById('greska2');

    var greskaTip = document.getElementById('greska3');

    var greskaPoruka = document.getElementById('greska4');

    var uspehPoruka = document.querySelector('.uspeh');

    var regexIme = /^[A-Z][a-z]+(\s[A-Z][a-z]+)?$/;

    var regexMail = /^[a-z\.\-\/\_\d]+\@[a-z]+(\.[a-z]{2,15}){1,2}$/;

    var regexPoruka = /^.{1,50}$/;

    function proveriRegex(reg, polje, greska){

        if(reg.test(polje.value)){

            greska.style.display = 'none';

        }

        else{

            greske.push('Greska');

            greska.style.display = 'block';

        }

    }

    proveriRegex(regexIme, ime, greskaIme);

    proveriRegex(regexMail, mail, greskaMail);

    proveriRegex(regexPoruka, poruka, greskaPoruka);

    if(tip == '0'){

        greskaTip.style.display = 'block';
        
        greske.push('greska');

    }

    else{

        greskaTip.style.display = 'none';

    }

    if(greske.length == 0){
        
        uspehPoruka.style.display = 'block';
        
        return true;

    }

    else{

        return false;

    }

}

$.ajax({

    url : 'assets/kategorije.json',
    method : "GET",
    dataType : 'json',
    success : function(data){

        console.log(data);

        ispisiListu(data);

    }

})
function ispisiListu(data){

    var drop = '<option value="0">Tip hrane</option>';

    for(let el of data){

        drop += `<option value="${el.idGlavneKat}">${el.nazivGlavneKat}</option>`;

    }

    drop += '';

   document.getElementById('birajVrstu').innerHTML = drop;

}