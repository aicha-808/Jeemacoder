//  Récuperons les éléments du Dom
const form = document.querySelector("form");
const ChampPrenom = document.getElementById("pre");
const ChampNom = document.getElementById("nom");
const ChampMail = document.getElementById("mail");
const ChampTel = document.getElementById("tel");
const bsubmit = document.getElementById("submit");
const bUpdate = document.getElementById("update");
let tbody = document.querySelector("tbody");
// 
let users = [];

// function ajouter
const craeteUser = (Prenom, Nom, Email, Telephone, index) => {
  // créer les éléments du tableau
  let tr = document.createElement("tr");
  tr.classList = "ligne-tableau";
  // tr.id = index;
  tr.innerHTML = `
  <td class="tdPrenom">${Prenom}</td>
  <td class="tdNom">${Nom}</td>
  <td class="tdEmail">${Email}</td>
  <td class="tdTel">${Telephone}</td>
  <div class="boutActions d-flex justify-content-evenly">
  <button onclick="edite(this)" type="button" class="btn btn-warning" id="edit">Modifier</button>
  <button onclick="supprime(${index})" type="button" class="btn btn-danger ms-5" id="supp">Supprimer</button>
  </div>
  `
  // ajouter dans le DOM
  tbody.appendChild(tr);
 
}
// const index = new Date().getTime.toString();
const addUsers = () => {
  
  const useObjet = {
    // index: index,
    Prenom: ChampPrenom.value,
    Nom: ChampNom.value,
    Email: ChampMail.value,
    Telephone: ChampTel.value,
  }

  users.push(useObjet);

  localStorage.setItem("users", JSON.stringify(users));

  craeteUser(useObjet.Prenom, useObjet.Nom, useObjet.Email, useObjet.Telephone);
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addUsers();
  resetForm();
})

// Vidons les champs de saisie aprés ajout d'un utilisateur
function resetForm() {
  ChampPrenom.value = "";
  ChampNom.value = "";
  ChampMail.value = "";
  ChampTel.value = "";
}

// gestion de l'action modifier
 const edite = () => {
  console.log("success");
  const ligne = document.querySelector(".ligne-tableau");
  // const ligne = button.parentNode.parentNode;
  // Egaliser les valeurs des champs du formulaire au contenu des cellules du tableau
  ChampPrenom.value = ligne.querySelector(".tdPrenom").textContent;
  ChampNom.value = ligne.querySelector(".tdNom").textContent;
  ChampMail.value = ligne.querySelector(".tdEmail").textContent;
  ChampTel.value = ligne.querySelector(".tdTel").textContent;

  // masquer le bouton ajouter et afficher le bouton modifier
  bsubmit.style.display = "none";
  bUpdate.style.display = "block";

  // Ecouter la modification avec le bouton modifier
  bUpdate.addEventListener('click', function () {
    // eagaliser contenu des cellules du tableau aux valeurs des champs du formulaire
    ligne.querySelector(".tdPrenom").textContent= ChampPrenom.value;
    ligne.querySelector(".tdNom").textContent = ChampNom.value;
    ligne.querySelector(".tdEmail").textContent = ChampMail.value;
    ligne.querySelector(".tdTel").textContent = ChampTel.value;
    
    localStorage.setItem("users", JSON.stringify(users));
    // masquer le bouton modifier et afficher le bouton ajouter  
    bsubmit.style.display = "block";
    bUpdate.style.display = "none";
  })

}

// gestion de l'action supprimer                                                      
function supprime(index) {
  
  users.splice(index, 1);

 localStorage.setItem("users", JSON.stringify(users));

 window.location.reload();
}

window.addEventListener("load", () => {
  users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
  users.forEach((use) => {
    craeteUser(use.Prenom, use.Nom, use.Email, use.Telephone);
  })
})