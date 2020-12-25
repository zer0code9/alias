    
  window.onload = function () {
    lax.init()

    var now = new Date();
    var hours = now.getHours();
    var type = '';
    var ft = now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });
    if (hours >= 5 && hours < 8) {
        type = 'Moorning';
    };
    if (hours >= 8 && hours < 13) {
        type = 'Morning';
    };
    if (hours >= 13 && hours < 17) {
        type = 'Afternoon';
    };
    if (17 <= hours && hours < 21) {
        type = 'Evening';
    };
    if (21 <= hours && hours < 5) {
        type = 'Night';
    };
    document.getElementById("good").innerHTML = `Good ${type}`;

    var months = now.getMonth();
    console.log(months);
    if (months = 3 || 10 || 12) {
        if (months = 12) {
            $('#homeWelcome').css('font-family', 'Mountains of Christmas');
        }
        if (months = 10) {
            $('#homeWelcome').css('font-family', 'Butcherman');
        }
    } else {
        $('#homeWelcome').css('font-family', 'Arial');
    }

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
        $("#accsignin").toggle();
    });
  });
$(function() {
    $('#notif').slideDown();
    $('#closeNotif').click(function() {
        $('#notif').slideUp();
    });
});