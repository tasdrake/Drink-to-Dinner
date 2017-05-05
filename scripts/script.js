$(document).ready(function() {
  ingredientPairSearch();
  listChoice();
  ingredientSelection();

  function listChoice() {
    $('.drink').change(function() {
      const $options = $('.drinkPair').children().hide();
      const value = $(this).val();
      if (value.length) {
        $options.filter('.' + value).show();
      }
    }).trigger('change');

  }
  function ingredientPairSearch() {
    $('#drinkBtn').click(function(event) {
      event.preventDefault();
      $('#pairIngredients').html('');
      const drink = $('.drink').val();
      const food = $('.' + drink).val();
      const id = beerFoodId[drink][food];
      $.ajax({
        url: 'https://api.foodpairing.com/ingredients/' + id + '/pairings?order=random',
        type: 'GET',
        dataType: 'json',
        headers: {
          
        },
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          createIngredients(data);
        }
      });
    });
  }
  function createIngredients(data) {
    for (let i = 0; i < data.length; i++) {
      const $cardHead = $('<div>')
      const $ingredientCard = $('<div class="card text-center ingredientCard">');
      const $cardImage = $('<img class="card-img-top center-text">');
      const $cardImageBox = $('<div class="card-block">');

      const image = data[i]._links.ingredient._links.image.size_240;
      $cardImage.prop('src', image);

      var ingredientName = data[i]._links.ingredient.name;
      if (ingredientName.includes('(')) {
        ingredientName = ingredientName.slice(0, (ingredientName.indexOf('(') - 1));
      } else if (ingredientName.includes("'")) {
        ingredientName = ingredientName.slice(0, (ingredientName.indexOf("'") - 1));
      }
      const $cardTitle = $('<div class="card-header">' + ingredientName + '</div>');


      $cardImageBox.append($cardImage);
      $cardHead.append($cardTitle);
      $ingredientCard.append($cardHead);
      $ingredientCard.append($cardImageBox);
      $('#pairIngredients').append($ingredientCard);
    }

  }
  function ingredientSelection() {
    $('#pairIngredients').click(function(event) {
      const choice = $(event.target).parent().parent().children()[0].innerHTML;
      if ($(event.target).parent().parent()) {

      }
      $(event.target).parent().parent().toggleClass('card-inverse card-success mb-3');
      console.log($(event.target).parent().parent());
    });

  }



  const beerFoodId = {
    crisp: {
      'brown rice': 4413,
      'quinoa': 5835,
      'basmati rice': 4309
    },
    maltyFruity: {
      'fava': 4652,
      'chickpea': 3950,
      'green bean': 4715,
      'clam': 4539,
      'scallop': 5192,
      'lobster': 4863,
      'shrimp': 5222
    },
    sour: {
      'beef': 3068,
      'lamb': 4823,
      'parsnip': 5022,
      'carrot': 137,
      'beet': 135
    },
    hoppyBitter: {
      'duck': 5518,
      'quail': 5520,
      'chicken': 4517,
      'brown rice': 4413,
      'quinoa': 5835,
      'basmati rice': 4309,
      'butter': 1376,
      'olive oil': 1408,
      'sausage': 3351,
      'bacon': 4290,
      'pork loin': 5093
    },
    dark: {
      'butter': 1376,
      'olive oil': 1408,
      'carrots': 137,
      'bell pepper': 136,
      'mushroom': 4948,
      'broccoli': 4411,
      'dark chocolate': 1518,
      'milk chocolate': 1544
    },
    belgian: {
      'brie': 1910,
      'cheddar': 1727,
      'blue': 1751,
      'mozzarella': 4935,
      'goat cheese': 4697
    },
    maltySweet: {
      'dark chocolate': 1518,
      'milk chocolate': 1544
    },
    fruitySweet: {
      'sausage': 3351,
      'bacon': 4290,
      'pork loin': 5093
    },
    sweet: {
      'ice cream': 191,
      'cake': 1104
    }
  };
});



// .trigger('change')
