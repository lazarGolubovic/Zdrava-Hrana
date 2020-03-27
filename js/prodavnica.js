$(document).ready(function(){

    $(document).on('change','#kategorijeOpcije', prikaziPodKateg);

    $(document).on('change','#kategorijeOpcije', filt);

    $(document).on('change','#sort', finalSort);

    $(document).on('change','#kategorijeOpcijePod', filtPod);


    $.ajax({

        url : "assets/proizvodi.json",
        method : "GET",
        dataType : 'json',
        success : function(data){

            console.log(data);
            proizvodi(data);

        },

        error : function(msg){

            console.log(msg);

        }

    })

})


$.ajax({

    url : 'assets/kategorije.json',
    method : "GET",
    dataType : 'json',
    success : function(data){

        console.log(data);

        prikaziKategorije(data);

    }

})

function prikaziKategorije(data){

    var drop = '<select name="opcijeProdavnica" id="kategorijeOpcije"><option value="0">Izaberite kategoriju</option>';

    for(let el of data){

        drop += `<option value="${el.idGlavneKat}">${el.nazivGlavneKat}</option>`;

    }

    drop += '</select>';

   document.getElementById('izborGlavni').innerHTML += drop;

}

function prikaziPodKateg(){

    var vrednostGlavneKateg = this.value;

    $.ajax({

        url : 'assets/kategorije.json',
        method : "GET",
        dataType : 'json',
        success : function(data){
    
            if(vrednostGlavneKateg != 0){

                for(let el of data){

                    if(vrednostGlavneKateg == el.id){

                        var drop = '<select name="opcijeProdavnicaPod" id="kategorijeOpcijePod"><option value="0">Izaberite tip</option>';

                            for(let i of el.podKateg){

                                drop += `<option value="${i.idPodKateg}">${i.nazivPodKateg}</option>`;

                            }

                        drop += '</select>';

                    }

                }

                document.getElementById('podKategDrop').innerHTML = drop;

            }

            else{

                document.getElementById('podKategDrop').innerHTML = '';

            }
    
        }
    
    })

}


function proizvodi(niz){

    var prod = '';

    for(let i of niz){

        prod += `<div class="col-lg-4 col-md-6 prodCol">

        <div class="proizvod">

            <div class="pictureProd">

                <img src="${i.putanja}" class='img-fluid' alt="${i.naziv}"/>

            </div>

            <div class="infoProd">

                <h3>${i.naziv}</h3>

                <div class="vrsta">

                    <h4>Vrsta</h4>

                    <p>${i.kategorija}, ${i.podKateg}</p>

                </div>

                <p>Cena : ${i.cena}din.</p>

                <button class='poruciProd' data-idProizvod="${i.id}">Poruci</button>

            </div>

        </div>

    </div>`;

    }

    document.querySelector('.rowProd').innerHTML = prod;

}

var niz = [];

var nizPod = [];

function filt(){

    var glavni = document.getElementById('kategorijeOpcije').value;

    var sorted = document.getElementById('sort').value;

    if(document.getElementById('kategorijeOpcijePod') != null){

        var podPolje = document.getElementById('kategorijeOpcijePod').value;

    }

    console.log(podPolje)

    $.ajax({

        url : "assets/proizvodi.json",
        method : "GET",
        dataType : 'json',
        success : function(data){

            if(glavni != '0'){

                    niz = data.filter(el => {
    
                        if(el.kategId == glavni)return el;
    
                    })

                podPolje = 0;

                if(podPolje != '0' && podPolje !== undefined){

                    if(sorted == 'asce'){

                        nizPod.sort((a,b) => {

                            if(a.cena > b.cena)return 1;

                            if(a.cena < b.cena)return -1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'desc'){

                        nizPod.sort((a,b) => {

                            if(a.cena > b.cena)return -1;

                            if(a.cena < b.cena)return 1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'aToz'){

                        nizPod.sort((a,b) => {

                            if(a.naziv > b.naziv)return 1;

                            if(a.naziv < b.naziv)return -1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }

                    if(sorted == 'zToa'){

                        nizPod.sort((a,b) => {

                            if(a.naziv > b.naziv)return -1;

                            if(a.naziv < b.naziv)return 1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }

                

                    proizvodi(nizPod);

                }

                else{

                    if(sorted == 'asce'){

                        niz.sort((a,b) => {

                            if(a.cena > b.cena)return 1;

                            if(a.cena < b.cena)return -1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'desc'){

                        niz.sort((a,b) => {

                            if(a.cena > b.cena)return -1;

                            if(a.cena < b.cena)return 1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'aToz'){

                        niz.sort((a,b) => {

                            if(a.naziv > b.naziv)return 1;

                            if(a.naziv < b.naziv)return -1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }

                    if(sorted == 'zToa'){

                        niz.sort((a,b) => {

                            if(a.naziv > b.naziv)return -1;

                            if(a.naziv < b.naziv)return 1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }

                    proizvodi(niz);

                }

            }

            else{


                    if(sorted == 'asce'){

                        data.sort((a,b) => {

                            if(a.cena > b.cena)return 1;

                            if(a.cena < b.cena)return -1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'desc'){

                        data.sort((a,b) => {

                            if(a.cena > b.cena)return -1;

                            if(a.cena < b.cena)return 1;

                            if(a.cena == b.cena)return 0;

                        })

                    }

                    if(sorted == 'aToz'){

                        data.sort((a,b) => {

                            if(a.naziv > b.naziv)return 1;

                            if(a.naziv < b.naziv)return -1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }

                    if(sorted == 'zToa'){

                        data.sort((a,b) => {

                            if(a.naziv > b.naziv)return -1;

                            if(a.naziv < b.naziv)return 1;

                            if(a.naziv == b.naziv)return 0;

                        })

                    }
                
                

                proizvodi(data);

            }

        },

        error : function(msg){

            console.log(msg);

        }

    })

}

function filtPod(){

    var pod = document.getElementById('kategorijeOpcijePod').value;

    var sorted = document.getElementById('sort').value;

    console.log(pod);

    if(pod != '0'){

        nizPod = niz.filter(el => {

             if(el.podKategId == pod)return el;   

        })

        if(sorted == 'asce'){

            nizPod.sort((a,b) => {

                if(a.cena > b.cena)return 1;

                if(a.cena < b.cena)return -1;

                if(a.cena == b.cena)return 0;

            })

        }

        if(sorted == 'desc'){

            nizPod.sort((a,b) => {

                if(a.cena > b.cena)return -1;

                if(a.cena < b.cena)return 1;

                if(a.cena == b.cena)return 0;

            })

        }

        if(sorted == 'aToz'){

            nizPod.sort((a,b) => {

                if(a.naziv > b.naziv)return 1;

                if(a.naziv < b.naziv)return -1;

                if(a.naziv == b.naziv)return 0;

            })

        }

        if(sorted == 'zToa'){

            nizPod.sort((a,b) => {

                if(a.naziv > b.naziv)return -1;

                if(a.naziv < b.naziv)return 1;

                if(a.naziv == b.naziv)return 0;

            })

    }
    
    proizvodi(nizPod);

}

    else{

        proizvodi(niz);

    }

}

function finalSort(){

    var kateg = document.getElementById('kategorijeOpcije').value

    if(document.getElementById('kategorijeOpcijePod') != null){

        var podKateg = document.getElementById('kategorijeOpcijePod').value

    }

    var sorted = this.value;

    console.log(nizPod)

    console.log(kateg, podKateg, sorted);

    if(sorted != '0'){

        if(kateg != '0' && podKateg != '0' && podKateg != undefined){

            if(sorted == 'asce'){

                nizPod.sort((a,b) => {
    
                    if(a.cena > b.cena)return 1;
    
                    if(a.cena < b.cena)return -1;
    
                    if(a.cena == b.cena)return 0;
    
                })
    
            }
    
            if(sorted == 'desc'){
    
                nizPod.sort((a,b) => {
    
                    if(a.cena > b.cena)return -1;
    
                    if(a.cena < b.cena)return 1;
    
                    if(a.cena == b.cena)return 0;
    
                })
    
            }
    
            if(sorted == 'aToz'){
    
                nizPod.sort((a,b) => {
    
                    if(a.naziv > b.naziv)return 1;
    
                    if(a.naziv < b.naziv)return -1;
    
                    if(a.naziv == b.naziv)return 0;
    
                })
    
            }
    
            if(sorted == 'zToa'){
    
                nizPod.sort((a,b) => {
    
                    if(a.naziv > b.naziv)return -1;
    
                    if(a.naziv < b.naziv)return 1;
    
                    if(a.naziv == b.naziv)return 0;
    
                })
    
            }

            proizvodi(nizPod);

        }

        if(kateg != '0' && podKateg == '0'){

            if(sorted == 'asce'){

                niz.sort((a,b) => {
    
                    if(a.cena > b.cena)return 1;
    
                    if(a.cena < b.cena)return -1;
    
                    if(a.cena == b.cena)return 0;
    
                })
    
            }
    
            if(sorted == 'desc'){
    
                niz.sort((a,b) => {
    
                    if(a.cena > b.cena)return -1;
    
                    if(a.cena < b.cena)return 1;
    
                    if(a.cena == b.cena)return 0;
    
                })
    
            }
    
            if(sorted == 'aToz'){
    
                niz.sort((a,b) => {
    
                    if(a.naziv > b.naziv)return 1;
    
                    if(a.naziv < b.naziv)return -1;
    
                    if(a.naziv == b.naziv)return 0;
    
                })
    
            }
    
            if(sorted == 'zToa'){
    
                niz.sort((a,b) => {
    
                    if(a.naziv > b.naziv)return -1;
    
                    if(a.naziv < b.naziv)return 1;
    
                    if(a.naziv == b.naziv)return 0;
    
                })
    
            }

            proizvodi(niz);

        }

        if(kateg == '0'){

            $.ajax({

                url : "assets/proizvodi.json",
                method : "GET",
                dataType : 'json',
                success : function(data){

                    if(sorted == 'asce'){

                        data.sort((a,b) => {
            
                            if(a.cena > b.cena)return 1;
            
                            if(a.cena < b.cena)return -1;
            
                            if(a.cena == b.cena)return 0;
            
                        })
            
                    }
            
                    if(sorted == 'desc'){
            
                        data.sort((a,b) => {
            
                            if(a.cena > b.cena)return -1;
            
                            if(a.cena < b.cena)return 1;
            
                            if(a.cena == b.cena)return 0;
            
                        })
            
                    }
            
                    if(sorted == 'aToz'){
            
                        data.sort((a,b) => {
            
                            if(a.naziv > b.naziv)return 1;
            
                            if(a.naziv < b.naziv)return -1;
            
                            if(a.naziv == b.naziv)return 0;
            
                        })
            
                    }
            
                    if(sorted == 'zToa'){
            
                        data.sort((a,b) => {
            
                            if(a.naziv > b.naziv)return -1;
            
                            if(a.naziv < b.naziv)return 1;
            
                            if(a.naziv == b.naziv)return 0;
            
                        })
            
                    }

                    proizvodi(data)

                },

                error : function(msg){

                    console.log(msg);

                }

            })

        }

    }

}

