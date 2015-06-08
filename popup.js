"use strict";

// Called whenever the key changes.
var update = function() {
  var domain = $('#domain').val();
  var key = $('#key').val();
  var choice = $('input[type=radio]:checked').attr('id');
  var settings  = window.Vault[choice];
  settings['phrase'] = key;

  var hash = new window.Vault(settings).generate(domain);
  $('#hash').val(hash);
  return hash;
};
            
$('input').on('ifChecked', function(event){
  update();
});
            
$('input').iCheck({
  checkboxClass: 'icheckbox_square-red',
  radioClass: 'iradio_square-red',
  increaseArea: '20%' // optional
});

$('#hash').focus(function(event_details) {
  $(this).select();
});

// A debounced version of update().
var timeout = null;
var debouncedUpdate = function() {
  if (timeout !== null) {
    clearInterval(timeout);
  }
  timeout = setTimeout((function() {
    update();
    timeout = null;
  }), 100);
}

// Register the update handler.
$('#key').bind('propertychange change click keyup input paste', debouncedUpdate);
$('#domain').bind('propertychange change click keyup input paste', debouncedUpdate);

// Update the hash right away.
debouncedUpdate();

// Focus the text field.
$('#domain').focus();
