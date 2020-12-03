// Banner carousel
$(".banner__bg").flickity({
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  autoPlay: true,
  on: {
    change: function (index) {
      $(".indicator").html((index + 1).toString().padStart(2, "0") + "/");
    },
  },
});

// Intro carousel

$(".intro__img").flickity({
  // options
  cellAlign: "right",
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  on: {
    change: function (index) {
      $(".intro__text.active")
        .removeClass("active")

        .hide(0, function () {
          $(".intro__text:nth-child(" + (index + 1) + ")")
            .fadeIn()
            .addClass("active");
        });
    },
  },
});

var $introCarousel = $(".intro__img").flickity();

// previous button

$(".prev-btn").on("click", function (e) {
  e.preventDefault();
  $introCarousel.flickity("previous");
});

$(".next-btn").on("click", function (e) {
  e.preventDefault();
  $introCarousel.flickity("next");
});

// $(".products__item").flickity({
//   // groupCells: true,
//   initialIndex: 1,
//   prevNextButtons: false,
//   pageDots: false,
// });

function enableSliderProduct(width) {
  if (width < 768) {
    $(".products__item").flickity({
      // groupCells: true,
      initialIndex: 1,
      prevNextButtons: false,
      pageDots: false,
    });
  } else {
    $(".products__item").flickity("destroy");
  }
}

enableSliderProduct(window.innerWidth);

window.onresize = function (event) {
  console.log(this.innerWidth);
  enableSliderProduct(this.innerWidth);
};

//Model list carousel
let startIndex = 0;
let currentIndex = 3;
let modelList = $(".carousel");
$(".model-next-btn").on("click", (e) => {
  e.preventDefault();

  // modelList[startIndex].classList.remove("show");
  // modelList[startIndex].classList.add("hide");
  // modelList[currentIndex].classList.remove("hide");
  // modelList[currentIndex].classList.add("show");
  toggleShowHide(startIndex, currentIndex);
  startIndex++;
  currentIndex++;
  checkFirstItem();
  checkEndItem();
});

$(".model-prev-btn").on("click", (e) => {
  e.preventDefault();
  startIndex--;
  currentIndex--;

  // modelList[currentIndex].classList.remove("show");
  // modelList[currentIndex].classList.add("hide");
  // modelList[startIndex].classList.remove("hide");
  // modelList[startIndex].classList.add("show");
  toggleShowHide(currentIndex, startIndex);

  checkFirstItem();
  checkEndItem();
});

let checkFirstItem = () => {
  if (!$("#first").hasClass("show")) {
    $(".model-prev-btn").removeClass("hide");
  } else {
    $(".model-prev-btn").addClass("hide");
  }
};

let checkEndItem = () => {
  if (!$("#end").hasClass("show")) {
    $(".model-next-btn").removeClass("hide");
  } else {
    $(".model-next-btn").addClass("hide");
  }
};

let toggleShowHide = (start, current) => {
  modelList[start].classList.remove("show");
  modelList[start].classList.add("hide");
  modelList[current].classList.remove("hide");
  modelList[current].classList.add("show");
};

// Accordion
// $(function () {
//   $(".plus-minus-toggle").on("click", function () {
//     $(this).toggleClass("collapsed");
//     $(".content").toggleClass("active").slideToggle();
//   });
// });

$.each($(".plus-minus-toggle"), (index, button) => {
  $(button).on("click", function () {
    // $(".content").slideUp();
    $(this).toggleClass("collapsed");

    if (!$(this).hasClass("collapsed")) {
      $(".content").slideUp();
      $(".plus-minus-toggle").not(this).addClass("collapsed");
      $(this).parent().next().slideDown();
    } else {
      $(this).parent().next().slideUp();
    }
  });
});

// Change bike color

$.each($(".change-btn"), (index, button) => {
  $(button).on("click", function (e) {
    e.preventDefault();
    $(".change-btn").removeClass("active");
    $(this).addClass("active");
    changeColor();
  });
});

const changeColor = () => {
  let colorBtns = $(".change-btn");
  $.each(colorBtns, (index, button) => {
    if ($(button).hasClass("active")) {
      $(".detailBanner__bike .bike").addClass("d-none");
      if ($(button).hasClass("red")) {
        $(".detailBanner__bike #red").removeClass("d-none");
      } else if ($(button).hasClass("green")) {
        $(".detailBanner__bike #green").removeClass("d-none");
      } else if ($(button).hasClass("black")) {
        $(".detailBanner__bike #black").removeClass("d-none");
      }
    }
  });
};

// NEWS Page

var list = $(".page").text().split("");

$.each($(".page"), (index, button) => {
  $(button).on("click", (e) => {
    e.preventDefault();
    $(".news__page").fadeOut(function () {
      $(this).addClass("d-none");
    });
    $(".page").removeClass("active");
    $(`*[data-page="${button.textContent}"]`)
      .removeClass("d-none")
      .fadeIn("slow");
    $(button).addClass("active");
  });
});
