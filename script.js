document.addEventListener("DOMContentLoaded", () => {

  /* ===== TABLEAU ===== */
  const tbody = document.querySelector("#tableau tbody");
  const boutonAjouter = document.getElementById("ajouterLigne");
  const ligneModele = tbody.querySelector("tr").cloneNode(true);

  function initialiserLigne(ligne){
    ligne.querySelectorAll("input.valeur").forEach(input=>{
      input.value="";
      const td=input.parentElement;
      td.classList.add("valeur-inactif");
      input.addEventListener("input", ()=>{
        td.classList.toggle("valeur-actif", Number(input.value)>0);
        td.classList.toggle("valeur-inactif", Number(input.value)<=0);
        calculerResultat(ligne);
      });
    });

    ligne.querySelectorAll("textarea").forEach(textarea=>{
      textarea.value="";
      textarea.style.height="auto";
      textarea.addEventListener("input", ()=>{
        textarea.style.height="auto";
        textarea.style.height=textarea.scrollHeight+"px";

        if(textarea.classList.contains("date-colonne")){
          let val = textarea.value.replace(/\D/g,"");
          if(val.length > 2 && val.length <= 4) val = val.slice(0,2)+'/'+val.slice(2);
          else if(val.length > 4) val = val.slice(0,2)+'/'+val.slice(2,4)+'/'+val.slice(4,8);
          textarea.value = val;
          const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
          textarea.classList.toggle("erreur", val !== "" && !regex.test(val));
        }
      });
    });

    const boutonSupprimer = ligne.querySelector(".supprimer");
    if(boutonSupprimer) boutonSupprimer.onclick = ()=>ligne.remove();

    calculerResultat(ligne);
  }

  function calculerResultat(ligne){
    const inputs = ligne.querySelectorAll("input.valeur");
    let somme = 0, vide = true;
    inputs.forEach(input=>{
      const val = parseFloat(input.value)||0;
      if(val>0) vide=false;
      somme += val;
    });
    ligne.querySelector(".resultat").textContent = vide ? "REFUSÉ" : somme;
  }

  initialiserLigne(tbody.querySelector("tr"));

  boutonAjouter.addEventListener("click", ()=>{
    const nouvelle = ligneModele.cloneNode(true);
    tbody.appendChild(nouvelle);
    initialiserLigne(nouvelle);
  });

});

