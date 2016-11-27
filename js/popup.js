var link = document.querySelector(".login"),
		popup = document.querySelector(".modal-content"),
		close = popup.querySelector(".modal-content-close"),
		form = popup.querySelector("form"),
		login = popup.querySelector("[name=login]"),
		password = popup.querySelector("[name=password]"),
		storage = localStorage.getItem("login");

link.addEventListener("click", function(e){
	e.preventDefault();
	popup.classList.add("modal-content-show");
	login.focus();

	if(storage) {
		login.value = storage;
	} else {
		login.focus();
	}
});

close.addEventListener("click", function(e){
	e.preventDefault();
	popup.classList.remove("modal-content-show");
	popup.classList.remove("modal-error");
});

form.addEventListener("submit", function(e) {
	if (!login.value || !password.value) {
		e.preventDefault();
		popup.classList.add("modal-error");
	} else {
		localStorage.setItem("login", login.value);
	}
});

window.addEventListener("keydown", function(e){
	if (e.keyCode === 27) {
		if (popup.classList.contains("modal-content-show")) {
			popup.classList.remove("modal-content-show");
		}
	}
});


// Open Map
var mapOpen = document.querySelector(".js-open-map"),
		mapPopup = document.querySelector(".modal-content-map"),
		mapClose = document.querySelector(".modal-content-map-close");

mapOpen.addEventListener("click", function(e) {
	e.preventDefault();
	mapPopup.classList.add("modal-content-show");
});

mapClose.addEventListener("click", function(e) {
	e.preventDefault();
	mapPopup.classList.remove("modal-content-show");
});

window.addEventListener("keydown", function(e) {
	if (e.keyCode === 27) {
		if(mapPopup.classList.contains("modal-content-show")) {
			mapPopup.classList.remove("modal-content-show");
		}
	}
});
