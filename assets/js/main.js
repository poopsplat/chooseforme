var Main = (function($) {

  var $document;

  function _init() {

    var $chooseForMe = $('#choose-for-me'),
        $list = $('#list'),
        $submit = $('#submitButton'),
        $reset = $('#reset'),
        itemMarkup = $list.html();

    // Choose item when clicking submit button
    $submit.on('click', function(e) {
      e.preventDefault();
      chooseItem();
    });

    // Add a new item to the list
    $(document).on('click', '.add-item', function() {
      $(this).closest('.item-container').after(itemMarkup).next('.item-container').find('li').focus();
      
      // If there is more than one item in the list, add a remove button
      if ($list.find('li').length > 1) {
        $list.find('.item-container').each(function() {
          if (!$(this).find('.remove-item').length) {
            $(this).append('<button class="remove-item"><span class="visually-hidden">Remove Item</span></button>');
          }
        });
      }

      // If toggled when a result is already display, 
      // allow for a new result to be chosen
      if ($submit.is('.hidden')) {
        $submit.removeClass('hidden');
        $('#result').remove();
      }
    });

    // Remove item
    $(document).on('click', '.remove-item', function() {
      $(this).closest('.item-container').remove();
      if ($list.find('li').length === 1) {
        $list.find('.item-container .remove-item').remove();
      }
    });

    // Reset
    $reset.on('click', function(e) {
      e.preventDefault();

      $list.find('.item-container').remove();
      $list.append(itemMarkup);
      $submit.removeClass('hidden');
      $('#result').remove();
    });

    // Choose item
    function chooseItem() {
      var items = [];
      
      // Get text from items and put 'em in an array
      $list.find('li').each(function() {
        if ($(this).text().trim() !== '') {
          items.push($(this).text());
        }
      });
      
      // If the items are empty, send 'em back to start
      if (!items.length) {
        $list.find('li').focus();
        return;
      } else {
        // Otherwise check if there are any empty and remove them
        $list.find('li').each(function() {
          if ($(this).text().trim() === '') {
            $(this).closest('.item-container').remove();
          }
        });
      }
      
      // Pick an item randomly
      var chosenItem = items[Math.floor(Math.random() * items.length)];
      
      // Display the pick
      if ($('#result').length) {
        $('#result').html(chosenItem);
      } else {
        $chooseForMe.find('.submit-result-container').append('<h2 id="result">'+chosenItem+'</h2>');
      }

      // Hide the submit button so they can't submit again
      $submit.addClass('hidden');
    }

  } // end init()

  return {
    init: _init
  };

})(jQuery);

// Fire up the mothership
jQuery(document).ready(Main.init);
