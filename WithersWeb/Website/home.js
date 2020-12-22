  window.onload = function () {
    lax.init()

    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    lax.addElements('#findEase', {
        scrollY: {
            translateX: [
            ["elInY", "elCenterY", "elOutY"],
            [0, 'screenWidth/2', 'screenWidth'],
            ]
        }
    })
    lax.addElements('#homeWelcome', {
        scrollY: {
            translateY: [
                ["elInX"],
                [0, 'elHeight/2','elHeight'],
                ["easeInOutQuad"],
            ]
        }
    })
  }
  $(document).ready(function() {
    $("#signin").click(function() {
        $("#accsign").toggle();
    });
});
