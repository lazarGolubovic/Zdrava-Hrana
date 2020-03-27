$(document).ready(function(){

    $(document).on("click",".obrisiProizvod",obrisi);
    prikazi();
})
function prikazi(){

    let proizvodi;
    if(localStorage.getItem("proizvod")){
        proizvodi = JSON.parse(localStorage.getItem("proizvod"));
        
        var ispiskopra = `
        <table class="tabelaKorpa">
                <tr class="redTabele">
                    <th>Redni Br.</th>
                    <th>Slika</th>
                    <th>Ime Proizvoda</th>
                    <th>Cena</th>
                    <th>Obrisi</th>
                </tr>
            `;
            brojac=1;
            for(let p of proizvodi){
                ispiskopra+=`<tr class="redProizvod">
                        <td class="prodKolona">${brojac++}</td>
                        <td class="prodKolona">
                                <img src="${p.putanja}" style='height:100px' alt="${p.naziv}" class="img-responsive">
                        </td>
                        <td class="prodKolona">${p.naziv}</td>
                        <td class="prodKolona">$${p.cena}</td>
                        <td class="prodKolona">
                            <div class="prodKolona">
                                <div class="obrisiProizvodDugme"><button class="obrisiProizvod" data-ukloniId="${p.id}">Ukloni</button> </div>
                            </div>
                        </td>
                    </tr>`;
            }
            ispiskopra += `</table>`;
            console.log(proizvodi)
            $("#prodTabela").html(ispiskopra);
            
            
    } 
    
}
function obrisi(){ 
    
    var ukloniProizvod = $(this).data("ukloniid");
   
    var nizKorpa= JSON.parse(localStorage.getItem("proizvod"));
    
    for(let l of nizKorpa){
        if(ukloniProizvod==l.id){
            const prodId = nizKorpa.indexOf(l);
            var obrisiProd = nizKorpa.splice(prodId,1);
            console.log(nizKorpa)
            localStorage.setItem("proizvod",JSON.stringify(nizKorpa));
            $(this).parent().parent().parent().parent().remove();
        }
    }
}