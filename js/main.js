(function () {
	var header = document.getElementById("mainHeader");

	function changeHeader() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		header.classList.toggle("header-background", scrollTop >= 50 || document.body.classList.contains("nav-open"));
	}

	window.addEventListener("scroll", changeHeader, { passive: true });
	changeHeader();

	document.getElementById("open-nav").addEventListener("click", function (event) {
		event.preventDefault();
		document.body.classList.toggle("nav-open");
		changeHeader();
	});

	function smoothScroll(to, duration) {
		var start = window.pageYOffset;
		var distance = to - start;
		var startTime = null;

		function step(time) {
			if (!startTime) startTime = time;
			var progress = Math.min((time - startTime) / duration, 1);
			var ease = progress < 0.5
				? 4 * progress * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			window.scrollTo(0, start + distance * ease);
			if (progress < 1) requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
	}

	document.querySelectorAll('a[href*="#"]').forEach(function (link) {
		link.addEventListener("click", function (event) {
			if (this.pathname === window.location.pathname) {
				var target = document.querySelector(this.hash);
				if (target) {
					event.preventDefault();
					smoothScroll(target.getBoundingClientRect().top + window.pageYOffset, 500);
				}
			}
		});
	});
})();
