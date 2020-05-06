"use strict";
const cartButton = document.querySelector("#cart-button"),
  modal = document.querySelector(".modal"),
  close = document.querySelector(".close"),
  buttonAuth = document.querySelector(".button-auth"),
  modalAuth = document.querySelector(".modal-auth"),
  closeAuth = document.querySelector(".close-auth"),
  logInForm = document.querySelector("#logInForm"),
  loginInput = document.querySelector("#login"),
  userName = document.querySelector(".user-name"),
  buttonOut = document.querySelector(".button-out"),
  cardsRestaurants = document.querySelector(".cards-restaurants"),
  containerPromo = document.querySelector(".container-promo"),
  restaurants = document.querySelector(".restaurants"),
  menu = document.querySelector(".menu"),
  logo = document.querySelector(".logo"),
  cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  loginInput.style.borderColor = "";
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  console.log("Authorized");
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAuthorized() {
  console.log("Not authorized");

  function logIn(e) {
    e.preventDefault();

    if (loginInput.value.trim()) {
      login = loginInput.value;
      localStorage.setItem("gloDelivery", login);
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);

      logInForm.reset();

      checkAuth();
    } else {
      loginInput.style.borderColor = "red";
      logInForm.reset();
    }
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurants() {
  let cards = `<a class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Пицца плюс</h3>
        <span class="card-tag tag">50 мин</span>
      </div>
      
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
      
    </div>
   
  </a>`;
  cardsRestaurants.insertAdjacentHTML("beforeend", cards);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
				<div class="card-text">
						<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Везувий</h3>
						</div>
							
				<div class="card-info">
						<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
								«Халапенье», соус «Тобаско», томаты.
						</div>
				</div>
					
				<div class="card-buttons">
						<button class="button button-primary button-add-cart">
								<span class="button-card-text">В корзину</span>
								<span class="button-cart-svg"></span>
						</button>
						    <strong class="card-price-bold">545 ₽</strong>
				</div>
  `;
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  let target = event.target;
  const restaurant = target.closest(".card-restaurant");

  if (login) {
    if (restaurant) {
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";
      createCardGood();
    }
  } else {
    toggleModalAuth();
  }
}

buttonAuth.addEventListener("click", toggleModalAuth);

closeAuth.addEventListener("click", toggleModalAuth);

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

buttonOut.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

checkAuth();

createCardRestaurants();
