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

// Choose page
$.each($(".page"), (index, button) => {
  $(button).on("click", (e) => {
    let nextPage = parseInt($(button).text());
    e.preventDefault();
    changePage(nextPage);
  });
});

// Click prev
$(".previous").on("click", (e) => {
  e.preventDefault();
  let currentPage = getCurrentPage();
  let prevPage = currentPage - 1;
  if (currentPage > 1) {
    changePage(prevPage);
  }
});

// Click next
$(".next").on("click", (e) => {
  e.preventDefault();
  let currentPage = getCurrentPage();
  let nextPage = currentPage + 1;
  if (currentPage < 3) {
    changePage(nextPage);
  }
});

function changePage(nextPage) {
  let next = $("div").find(`[data-page='${nextPage}']`);
  $(".news__page").addClass("d-none");
  next.removeClass("d-none");
  $(".page").removeClass("active");
  $(`.page:contains(${nextPage})`).addClass("active");
}

function getCurrentPage() {
  let currentPage = parseInt($("div[class='news__page']").attr("data-page"));
  return currentPage;
}
