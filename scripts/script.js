$(document).ready(function() {
  listChoice();
  ingredientPairSearch();
  ingredientSelection();
  recipeSearch();

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
      $('#ingredientsSearch').val('');
      $('#pairIngredientsSearch').attr('class', 'hidden');
      const drink = $('.drink').val();
      const food = $('.' + drink).val();
      const id = beerFoodId[drink][food];
      // $.getJSON('https://g-foodpairing.herokuapp.com/' + id + '/pairings?order=random', data => createIngredients(data));

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

      let ingredientName = data[i]._links.ingredient.name;
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
      $('#pairIngredientsSearch').toggleClass('hidden');
    }

  }
  function ingredientSelection() {
    $('#pairIngredients').click(function(event) {
      event.preventDefault();
      const ingredient = $('#ingredientsSearch');
      const $twoParents = $(event.target).parent().parent();
      const $oneParents = $(event.target).parent();
      const classes1 = 'card text-center ingredientCard';
      const classes2 = 'card text-center ingredientCard card-inverse card-success';
      var choice;
      if ($twoParents.attr('class') === classes1){
          $twoParents.toggleClass('card-inverse card-success');
          choice = $twoParents.children()[0].innerText;
        } else if ($twoParents.attr('class') === classes2) {
          $twoParents.toggleClass('card-inverse card-success');
          choice = $twoParents.children()[0].innerText;
        } else if ($oneParents.attr('class') === classes2) {
          $oneParents.toggleClass('card-inverse card-success');
          choice = $oneParents.children()[0].innerText;
        } else if ($oneParents.attr('class') === classes1) {
        $oneParents.toggleClass('card-inverse card-success');
        choice = $oneParents.children()[0].innerText;
      }

      if (ingredient.val().includes(choice)) {
        console.log(true);
      } else if (ingredient.val()) {
        ingredient.val(ingredient.val() + ', ' + choice);
      } else {
        ingredient.val(choice);
      }
      console.log(choice);
      console.log(ingredient.val());
      console.log(ingredient.val().includes(choice));
    });

  }
  function recipeSearch() {
    $('#recipeBtn').click(function(event) {
      event.preventDefault();
      const search = $('#ingredientsSearch').val().split(', ').join('+');
      $.getJSON('http://api.yummly.com/v1/api/recipes?' + search, data => createRecipes(data));
    });
  }
  function createRecipes(data) {
    for (let i = 0; i < data.matches.length; i++) {
      const id = data.matches[i].id;
      $.getJSON('http://api.yummly.com/v1/api/recipe/' + id + , recipeData => recipeInfo(recipeData));
    }
  }
  function recipeInfo(recipeData) {
    const $card = $('<div class="card recipeCard">');
    const image = recipeData.images[0].hostedLargeUrl;
    const $image = $('<img class="card-img-top center-text" src="' + image + '">');
    const $cardBlock = $('<div class="card-block">');
    const recipeName = recipeData.name;
    const $cardTitle = $('<h4 class="card-text">' + recipeName + '</h4>');
    const link = recipeData.source.sourceRecipeUrl;
    const $link = $('<a class="btn btn-primary" href="' + link + '" target="_blank">Go to Recipe</button>');
    //const link = recipeData.attribution.url;
    console.log($card);
    $cardBlock.append($cardTitle);
    $cardBlock.append($link);
    $card.append($image);
    $card.append($cardBlock);
    $('#recipeList').append($card);

  }


  ///"https://static.yummly.co/api-logo.png" yummly logo
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
