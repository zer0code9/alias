    
  window.onload = function () {
    lax.init()
    


    // Animations
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
    $('.tab').on('click', function(e) {
        e.preventDefault();
        var url = this.href;
        var content = $('#content');

        $('.tab.current').removeClass('current');
        $(this).addClass('current');
        $('#container').remove();


/*
        $.ajax({
            type: "GET",
            url: url,
            timeout: 2000,
            beforeSend: function() {
              content.append('<div id="loaderHome"></div>');
            },
            complete: function() {
              $('#loaderHome').remove();
            },
            success: function(data) {
              content.html( $(data).find('#containor') ).hide().fadeIn(400);
            },
            error: function() {
              content.html('<div id="container">Uh oh, something went wrong. Please try again soon.</div>');
            }
          });
*/
          content.load(url + ' #containor').hide().fadeIn('slow');
        
        });
        document.getElementById("homeButton").click();
  };
  $(function() {
    $('#notif').slideDown();
    $('#closeNotif').click(function() {
        $('#notif').slideUp();
    });
  });