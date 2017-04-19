(function($) {
    var defaults = {
      isOnlyOneActive: false,
      isFirstOpen:     true,
      isPreloader:     false,
      isFancyLoad:     true
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
        let data              = [];
        let countNumber       = 0;
        let minAngle          = 0;
				let tooltips          = "";
        let tooltipsMob       = "";

        function initToolTips() {
          data           = options.data;
          countNumber    = options.data.length;
  				minAngle       = 360 / countNumber;
          tooltips       = "";
          tooltipsMob    = "";

          $(".tooltip-wrap").each(function(item, i) {
            $(this).remove();
          });

          $(".mobile-descript").html("");

          data.forEach(function(item, i) {
            let currentAngle =  minAngle * (i + 1) + 270 - minAngle;
            let currentClass = "";

            if      (currentAngle == 270 )                     {currentClass = "top"; }
            else if (currentAngle > 270 && currentAngle < 360 ){currentClass = "top-right"; }
            else if (currentAngle == 360 )                     {currentClass = "right"; }
            else if (currentAngle > 360 && currentAngle < 450 ){currentClass = "bottom-right"; }
            else if (currentAngle == 450 )                     {currentClass = "bottom"; }
            else if (currentAngle > 450 && currentAngle < 540 ){currentClass = "bottom-left"; }
            else if (currentAngle == 540 )                     {currentClass = "left"; }
            else                                               {currentClass = "top-left"; };

            tooltips += `
            <div class="tooltip-wrap" style="transform:rotate(${currentAngle}deg)">
              <div class="tooltip-btn ${currentClass}" data-item="${i}" style="transform:rotate(-${currentAngle}deg)">
                <div class="tooltip-content">${item}</div>
              </div>
            </div>`;

            tooltipsMob += `<p data-mob-item="${i}">${i + 1}. ${item}</>`;
          });

          $(".pizza").append(tooltips);
          $(".mobile-descript").append(tooltipsMob);
        };

      function initPlugin() {
        initToolTips();
        $(".pizza").off("click");

        function showToolips() {
          let itemCount = $(this).data("item");

          if(options.isOnlyOneActive) {
            $(".tooltip-btn").not(this).removeClass("open");
            $(this).toggleClass("open");
            $(".mobile-descript p").not("[data-mob-item=" + itemCount + "]").removeClass("visible");
            $("[data-mob-item=" + itemCount + "]").addClass("visible");
          } else {
            $(this).toggleClass("open");
            $("[data-mob-item=" + itemCount +"]").toggleClass("visible");
          }
        };

        $(".pizza").on("click", ".tooltip-btn", showToolips);

        if(options.isFirstOpen) {
          $("[data-item=0]").addClass("open");
          $("[data-mob-item=0]").addClass("visible");
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
            data.push(item.value);
            initPlugin();
            $(this).val("");
          }
        });
      });

      $(removeCircleBtn).click(function(e) {
        e.preventDefault();
        let arrLenth = options.data.length - 1;
        $(".error").text("");
        let circleNum = +$(removeCircleInp).val();
        if( Number.isInteger(circleNum) && Math.abs(circleNum) <= arrLenth) {
          options.data.splice(circleNum, 1);
          initPlugin();
          $(this).val("");
        } else {
          $(".error").text(`Enter whole number between -${arrLenth} and ${arrLenth}`);
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

      return this;
    };
})(jQuery);

var $pizza = $(".pizza").pizzaTooltip({
    data: ["0.Lorem ipsum dolor sit amet.",
          "1.Consectetur adipiscing elit.",
          "2.Fusce dapibus ex at aliquet tincidunt.",
          "3.Consectetur adipiscing elit.",
          "3.Consectetur adipiscing elit."]
    });
