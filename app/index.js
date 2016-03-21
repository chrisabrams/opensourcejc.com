$('#btn-email').on('click', function onEmailBtnClick(e) {
  e.preventDefault()

  $('html, body').animate({
    scrollTop: $("#email-signup-iframe").offset().top
  }, 1000)

})
