var Main = (function($) {

  var $document;

  function _init() {

    var $chooseForMe = $('#choose-for-me'),
        $list = $('#list'),
        $submit = $('#submitButton'),
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
    });

    $(document).on('click', '.remove-item', function() {
      $(this).closest('.item-container').remove();
      if ($list.find('li').length === 1) {
        $list.find('.item-container .remove-item').remove();
      }
    });

    function chooseItem() {
      var items = [];
      
      $list.find('li').each(function() {
        if ($(this).text().trim() !== '') {
          items.push($(this).text());
        }
      });
      
      if (!items.length) {
        $list.find('li').focus();
        return;
      } else {
        $list.find('li').each(function() {
          if ($(this).text().trim() === '') {
            $(this).closest('.item-container').remove();
          }
        });
      }
      
      var chosenItem = items[Math.floor(Math.random() * items.length)];
      
      if ($('#result').length) {
        $('#result').html(chosenItem);
      } else {
        $chooseForMe.append('<h2 id="result">'+chosenItem+'</h2>');
      }
    }

  } // end init()

  return {
    init: _init
  };

})(jQuery);

// Fire up the mothership
jQuery(document).ready(Main.init);
