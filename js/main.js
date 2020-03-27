jQuery(document).ready(function(){

    $.ajax({

        url : 'assets/meni.json',
        method : "GET",
        dataType : 'json',
        success : function(data){

            prikaziMeni(data);

        }

    })

    $('.backTop').click(function(){
        $('html').animate({scrollTop: 0}, 250);
    })
    $('#pojaviSide').click(function(){
        $('.sideNavigation').toggleClass('side1') 
        $('.sideNavigation li a').click(function(){
          $('.sideNavigation').removeClass('side1')
        })
      })

    $(document).on("click",".poruciProd",proizvodKorpa);

    $(window).scroll(function(){

        const motaj = $(this).scrollTop();

        if(motaj > 70) {

            $('.logoPic').addClass('logoPic1');
            $('#navigacija').addClass('bgColor');

        } else {
            
            $('.logoPic').removeClass('logoPic1');
            
            $('#navigacija').removeClass('bgColor');
 
        }

    })
    $(document).on('load','.clockinner',odbrojavanje);

})

function prikaziMeni(meni){

    var navigacija = '<ul>';

    for(let el of meni){
        if(el.id==5){
            navigacija += `<li><a href="${el.href}"><i class="fas fa-shopping-cart"></i></a></li>`;
        }
        else{
        navigacija += `<li><a href="${el.href}">${el.naziv}</a></li>`;
        }

    }

    navigacija += '</ul>';

    var navigacije = document.getElementsByClassName('meni');

    for(let i = 0 ; i < navigacije.length ; i++) {

        navigacije[i].innerHTML = navigacija;

    }

}

var logos = document.getElementsByClassName('logo');

for(let i = 0 ; i < logos.length ; i++) {

    logos[i].innerHTML = '<a href="#!"><img src="images/logo.png" alt="Logo" class="img-fluid logoPic"/></a>';

}

function proizvodKorpa(){

    let proizvodId = $(this).data("idproizvod");   
    var nizProizvodId;
    if(localStorage.getItem("proizvod")){
        nizProizvodId = JSON.parse(localStorage.getItem("proizvod")) || localStorage.getItem('proizvod');
    }
    else{
        nizProizvodId=[];
    }
    $.ajax({
        url:"assets/proizvodi.json",
        method:"get",
        dataType:"json",
        success: function(proizvodi){
            if(localStorage.getItem("proizvod")){
                for(let p of nizProizvodId){
                    if(proizvodId==p.id){
                        alert("Vec postoji u korpi");
                        return;
                    }
                    
                }
            }
            for(let p of proizvodi){
                if(p.id==proizvodId){
                    nizProizvodId.push(p);
                    console.log(nizProizvodId);
                    localStorage.setItem("proizvod",JSON.stringify(nizProizvodId));
                    nizProizvodId = JSON.parse(localStorage.getItem("proizvod"));
                    alert("proizvod je dodat");
                }
            }
            
        }
    })
   
}



function odbrojavanje(){
    var trenutniDatum=new Date();
    var buduciDatum=new Date(2020,3,20);

    var trenutnoVreme=trenutniDatum.getTime();
    var buducevreme=buduciDatum.getTime();

    var trajanje=buducevreme-trenutnoVreme;

    var s=Math.floor(remTime/1000);
    var m=Math.floor(s/60);
    var h=Math.floor(m/60);
    var d=Math.floor(h/24);

    h%=24;
    m%=60;
    s%=60;

    h=(h<10)? "0" + h:h;
    m=(m<10)? "0" + m:m;
    s=(s<10)? "0" + s:s;

    document.getElementsByClassName("days").textContent=d;
    document.getElementsByClassName("hours").textContent=h;
    document.getElementsByClassName("minutes").textContent=m;
    document.getElementsByClassName("secunds").textContent=s;

    setTimeout(odbrojavanje,1000);


}
function sortFilterByRemembered(products){
    if(!isEmptyStorage()){
        let selection = getStorage();
        console.log(selection)
        if(selection.sort){
            sortProducts(products, selection.sort.sortBy, selection.sort.order);
        }
    }
}
/**
 * Metod za upis u localStorage
 * @param {*sort: { sortBy: string, order: string }} 
 * @param {*filter: { category: string, sizes: string[], color: string } } 
 */
function rememberSelection(sort = null, filter = null){
    if(!sort && !filter) return;

    let selection = {
        sort: {
            sortBy: null,
            order: null
        },
        filter: {
            category: null,
            sizes: [],
            color: null
        }
    };

    if(!isEmptyStorage()){ // Ako postoji nesto u localStorage
        selection = getStorage();
    }

    if(sort) // ili == null
        selection.sort = sort;
    if(filter){
        if(filter.category)
            selection.filter.category = filter.category;
        if(filter.sizes)
            selection.filter.sizes = filter.sizes;
        if(filter.color)
            selection.filter.color = filter.color;
    }
    
    setStorage(selection);
}

function getStorage(){
    return JSON.parse(localStorage.getItem('selection'));
}
function setStorage(value){
    return localStorage.setItem('selection', JSON.stringify(value));
}
function isEmptyStorage(){
    return localStorage.getItem('selection') == null; // ili == null
}