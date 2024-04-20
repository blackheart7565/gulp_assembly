const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", function () {
	this.classList.toggle("active");
	document.body.classList.toggle("scroll-overflow");
});