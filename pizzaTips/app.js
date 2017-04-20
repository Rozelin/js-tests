(function($) {
		var defaults = {
			data:            [],
			isOnlyOneActive: false,
			isFirstOpen:     false,
			isPreloader:     false,
			isFancyLoad:     false
		 };

		$.fn.pizzaTooltip = function(params) {
				options = $.extend({}, defaults, params);
				const addTextBlock    = $("#addTextBlock");
				const addTxtFieldBtn  = $("#addTextField");
				const addTextBtn      = $("#addText");
				const removeCircleBtn = $("#removeCircleBtn");
				const removeCircleInp = $("#removeCircle");
				const reloadBtn       = $("#removeCircleBtn");
				const reloadForm      = $("#reloadForm");
				let countNumber       = 0;
				let minAngle          = 0;
				let tooltips          = "";
				let tooltipsMob       = "";

				function initToolTips() {
					let data       = options.data;
					countNumber    = options.data.length;
					minAngle       = 360 / countNumber;
					tooltips       = "";
					tooltipsMob    = "";

					$(".tooltip-wrap").each(function(item, i) {
						$(this).remove();
					});

					$(".mobile-descript").html("");

					data.forEach(function(item, i) {
						const angle =  minAngle * (i + 1) + 270 - minAngle;
						let currentClass = "";

						switch (true) {
								case angle === 270:              currentClass = "top";          break;
								case angle > 270 && angle < 360: currentClass = "top-right";    break;
								case angle === 360:              currentClass = "right";        break;
								case angle > 360 && angle < 450: currentClass = "bottom-right"; break;
								case angle === 450:              currentClass = "bottom";       break;
								case angle > 450 && angle < 540: currentClass = "bottom-left";  break;
								case angle === 540:              currentClass = "left";         break;
								default:                         currentClass = "top-left";
						};

						tooltips += `
						<div class="tooltip-wrap" style="transform:rotate(${angle}deg)">
							<div class="tooltip-btn ${currentClass}" data-item="${i}" style="transform:rotate(-${angle}deg)">
								<div class="tooltip-content">${item}</div>
							</div>
						</div>`;

						tooltipsMob += `<p data-mob-item="${i}">${i + 1}. ${item}</>`;
					});

					$(".pizza").append(tooltips);
					$(".pizza-container").append(`<div class="mobile-descript">${tooltipsMob}</div>`);
				};

			function initPlugin() {
				initToolTips();
				$(".pizza").off("click");

				function showToolips() {
					let itemCount = $(this).data("item");

					if(options.isOnlyOneActive) {
						$(".tooltip-btn").not(this).removeClass("open");
						$(this).toggleClass("open");
						$(".mobile-descript p").not(`[data-mob-item="${itemCount}"]`).hide();
						$(`[data-mob-item="${itemCount}"]`).show();
					} else {
						$(this).toggleClass("open");
						$(`[data-mob-item="${itemCount}"]`).toggle();
					}
				};

				$(".pizza").on("click", ".tooltip-btn", showToolips);

				if(options.isFirstOpen) {
					$("[data-item=0]").addClass("open");
					$("[data-mob-item=0]").show();
				};

				if(options.isFancyLoad) {
					$(".pizza").addClass("fancyLoad");
				};
			};

			if(options.isPreloader) {
				const image = new Image();
				image.src = $(".pizza img").attr("src");
				image.onload = function() {
					initPlugin();
				 };
			} else {
				$("document").ready(function() {
					initPlugin();
				});
			};

			$(".tab-header").click(function() {
				const thisTab = $(this).next(".tab-content");
				$(".tab-content").not(thisTab).slideUp();
				$(thisTab).slideToggle();
			});

			$(addTxtFieldBtn).click(function() {
				const currentItem = $("#addTextBlock input[type=text]").length + 1;
				$(addTextBlock).append(`
					<label for="addTextField${currentItem}">Text to add: <input type="text" name="addTextField${currentItem}" id="addTextField${currentItem}" placeholder="Text piece ${currentItem}"><span class="close-btn">✖</span></label>
					`);
			});

			$(addTextBlock).on("click", ".close-btn", function() {
				$(this).parent().remove();
			});

			$(addTextBtn).click(function() {
				$("#addTextBlock input[type=text]").each(function(i, item) {
					if(item.value) {
						options.data.push(item.value);
						initPlugin();
						$(this).val("");
					}
				});
			});

			$(removeCircleBtn).click(function(e) {
				e.preventDefault();
				let arrLenth = options.data.length - 1;
				$(".error").remove();
				let circleNum = +$(removeCircleInp).val();
				if( Number.isInteger(circleNum) && Math.abs(circleNum) <= arrLenth) {
					options.data.splice(circleNum, 1);
					initPlugin();
					$(this).val("");
				} else {
					$(`<div class="error">Enter whole number between -${arrLenth} and ${arrLenth}</div>`).insertBefore(removeCircleBtn);
				}
			});

			$(reloadForm).submit(function(e) {
				e.preventDefault();
				if($(reloadCircles).val()) {
					options.data = $(reloadCircles).val().split(";");
				}
				options.isOnlyOneActive = $("#isOnlyOneActive").prop("checked");
				options.isFirstOpen     = $("#isFirstOpen").prop("checked");
				options.isPreloader     = $("#isPreloader").prop("checked");
				options.isFancyLoad     = $("#isFancyLoad").prop("checked");

				initPlugin();

			});
		};
})(jQuery);

var $pizza = $(".pizza").pizzaTooltip();
