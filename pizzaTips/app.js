(function($) {
    var defaults = {
      isOnlyOneActive: false,
      isFirstOpen:     true,
      isPreloader:     false,
      isFancyLoad:     false
     };

    $.fn.pizzaTooltip = function(params){
        options = $.extend({}, defaults, params);
				const addTextBlock    = $("#addTextBlock");
        const addTxtBtnField  = $("#addTextField");
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
          data           =  options.data;
          countNumber    = options.data.length;
  				minAngle       = 360 / countNumber;
          tooltips       = "";
          tooltipsMob    = "";
          $(".tooltip-wrap").each(function(item, i) {
            $(this).remove();
          });
          $(".mobile-descript").html("");

          data.forEach(function(item, i) {
            let currentAngle =  minAngle * (i + 1) - 90;
            let currentClass = "";

            if      (currentAngle == 0)                        { currentClass = "right"; }
            else if (currentAngle > 0 && currentAngle < 90 )   {currentClass = "bottom-right"; }
            else if (currentAngle == 90 )                      {currentClass = "bottom"; }
            else if (currentAngle > 90 && currentAngle < 180 ) {currentClass = "bottom-left"; }
            else if (currentAngle == 180 )                     {currentClass = "left"; }
            else if (currentAngle > 180 && currentAngle < 270 ){currentClass = "top-left"; }
            else if (currentAngle == 270 )                     {currentClass = "top"; }
            else                                               {currentClass = "top-right"; };

            tooltips += `
            <div class="tooltip-wrap" style="transform:rotate(${currentAngle}deg)">
              <div class="tooltip-btn ${currentClass}" data-item="${i}" style="transform:rotate(-${currentAngle + 360}deg)">
                <div class="tooltip-content" data-item="${i}">${item}</div>
              </div>
            </div>`;

            tooltipsMob += `<p data-mob-item="${i}">${i + 1}. ${item}</>`;
          //console.log(currentAngle);
          });

          $(".pizza").append(tooltips);
          $(".mobile-descript").append(tooltipsMob);
        };

      function initPlugin() {
        initToolTips();
        $(".pizza").off("click");

        function showToolips() {
           //console.log($(this).data("item"));
            let itemCount = $(this).data("item");
            if(options.isOnlyOneActive) {
              $(".tooltip-btn").not(this).removeClass("open");
              $(this).toggleClass("open");
              $(".mobile-descript p").not("[data-mob-item=" + itemCount +"]").removeClass("visible");
              $("[data-mob-item=" + itemCount +"]").addClass("visible");
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
        image.onload = function(){
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

      $(addTxtBtnField).click(function() {
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

        //console.log(data, defaults);

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
