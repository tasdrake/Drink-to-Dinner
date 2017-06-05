/*jshint esversion: 6 */
$(document).ready(function() {
  const foodIds = JSON.parse(localStorage.getItem('foodIds'));

  listChoice();
  listChoiceBeerOptions();
  listChoiceWineOptions();
  ingredientPairSearch();
  ingredientSelection();
  recipeSearch();
  recipeModals();

  function listChoice() {
    $('.drink').change(function() {
      const $options = $('.beerAndWine').children().hide();
      const value = $(this).val();
      if (value.length) {
        $options.filter('.' + value).show();
      }
    }).trigger('change');
  }

  function listChoiceBeerOptions() {
    $('.beer').change(function() {
      const $options = $('.drinkPair').children().hide();
      const value = $(this).val();
      if (value.length) {
        $options.filter('.' + value).show();
      }
    }).trigger('change');
  }

  function listChoiceWineOptions() {
    $('.wine').change(function() {
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
      $('#pairIngredientsSearch').addClass('hidden');
      const type = $('#drinkChoice').val();
      const drink = $('.beerSelect').val() || $('.wineSelect').val();
      const food = $('.' + drink).val();
      const id = foodIds[type][drink][food];
      $.getJSON('http://g-foodpairing.herokuapp.com/ingredients/' + id + '/pairings?order=random', data => createIngredients(data, food));
    });
  }

  function createIngredients(data, food) {
    $('#break1').html('');
    $('#break1').append('<br><br><br><br><br><br><br><br>');
    $('#ingredientInstruction').after('<br><br>');
    $('#pairIngredientsDiv').addClass('navBarFix');
    $('#ingredientInstruction').removeClass('hidden');

    for (let i = 0; i < data.length; i++) {
      const $cardHead = $('<div>');
      const $ingredientCard = $('<div class="card text-center ingredientCard">');
      const $cardImage = $('<img class="card-img-top center-text">');
      const $cardImageBox = $('<div class="card-block">');

      const image = data[i]._links.ingredient._links.image.size_240;
      $cardImage.prop('src', image);

      let ingredientName = data[i]._links.ingredient.name;
      if (ingredientName.includes("'")) {
        ingredientName = ingredientName.slice(0, (ingredientName.indexOf("'") - 1));
      } else if (ingredientName.includes('(')) {
        ingredientName = ingredientName.slice(0, (ingredientName.indexOf('(') - 1));
      } else if (ingredientName.includes('®')) {
        ingredientName = ingredientName.slice(0, ingredientName.length - 1);
      }
      const $cardTitle = $('<div class="card-header">' + ingredientName + '</div>');

      $cardImageBox.append($cardImage);
      $cardHead.append($cardTitle);
      $ingredientCard.append($cardHead);
      $ingredientCard.append($cardImageBox);

      $('#pairIngredients').append($ingredientCard);
      $('#pairIngredientsSearch').removeClass('hidden');
    }
    $('#ingredientsSearch').val(food);
    location.hash = '#pairIngredientsDiv';
    $('#pairIngredientsSearch').prepend('<br><br><br>');
    $('#pairIngredientsSearch').append('<br><br><br><br>');
    $('#recipeSearch').css('display', 'flex');
  }

  function ingredientSelection() {
    $('#pairIngredients').click(function(event) {
      const ingredient = $('#ingredientsSearch');
      const $twoParents = $(event.target).parent().parent();
      const $oneParents = $(event.target).parent();
      const classes1 = 'card text-center ingredientCard';
      const classes2 = 'card text-center ingredientCard card-inverse card-success';
      let choice;
      if ($twoParents.attr('class') === classes1) {
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
      if (ingredient.val().includes(choice.trim()) && ingredient.val().indexOf(choice.trim() !== 0)) {
        ingredient.val(ingredient.val().split(', ').filter(element => element !== choice.trim()).join(', '));
      } else if (ingredient.val()) {
        ingredient.val(ingredient.val() + ', ' + choice);
      } else {
        ingredient.val(choice);
      }
    });

  }

  function recipeSearch() {
    $('#recipeBtn').click(function(event) {
      event.preventDefault();
      $('#recipeList1').html('');
      $('#recipeList2').html('');
      $('#break3').html('');
      $('.alert').hide();
      const search1 = $('#ingredientsSearch').val().split(', ').join('+');
      const search2 = $('#ingredientsSearch').val().split(', ').join(',');
      $.getJSON('http://g-yummly.herokuapp.com/v1/api/recipes?&q=' + search1 + '&maxResult=16', data => createRecipes1(data));
      $.getJSON('http://g-food2fork.herokuapp.com/api/search?&q=' + search2, data => createRecipes2(data));
    });
  }

  function createRecipes1(data) {
    $('#break2').html('');
    $('#break2').append('<br><br><br><br><br><br><br><br>');
    $('#recipeList1').addClass('navBarFix');

    for (let i = 0; i < data.matches.length; i++) {
      const id = data.matches[i].id;
      $.getJSON('http://g-yummly.herokuapp.com/v1/api/recipe/' + id, recipeData => recipeInfo1(recipeData));
    }
    setTimeout(function() {
      location.hash = '#recipeList1';
      $('#recipeList').css('display', 'flex');
    }, 1000);
    $('footer').removeClass('hidden');
    $('.searchMore').removeClass('hidden');
  }

  function recipeInfo1(recipeData) {
    const $card = $('<div class="card recipeCard">');
    const image = recipeData.images[0].hostedLargeUrl;
    const $image = $('<img class="card-img-top center-text" src="' + image + '" onerror="this.src=\'images/missing.jpg\'">');
    const $cardBlock = $('<div class="card-block d-flex p-2 flex-column justify-content-between">');
    const recipeName = recipeData.name;
    const $cardTitle = $('<h4 class="card-text">' + recipeName + '</h4><br>');
    const link = recipeData.attribution.url;
    const $link = $('<a class="btn btn-success" href="' + link + '" target="_blank" data-toggle="modal" data-target="#recipePopUp">Go to Recipe</button>');
    $cardBlock.append($cardTitle);
    $cardBlock.append($link);
    $card.append($image);
    $card.append($cardBlock);
    $('#recipeList1').append($card);
  }

  function createRecipes2(data) {
    $('#break3').append('<br>');
    for (let i = 0; i < data.recipes.length; i++) {
      recipeInfo2(data, i);
    }
    if (data.count === 0) {
      $('#recipeList1').removeClass('navBarFix');
      $('.alert').show();
    }
  }

  function recipeInfo2(data, i) {
    const $card = $('<div class="card recipeCard">');
    const image = data.recipes[i].image_url;
    const $image = $('<img class="card-img-top center-text" src="' + image + '" onerror="this.src=\'images/missing.jpg\'">');
    const $cardBlock = $('<div class="card-block d-flex p-2 flex-column justify-content-between">');
    const recipeName = data.recipes[i].title;
    const $cardTitle = $('<h4 class="card-text">' + recipeName + '</h4>');
    const link = data.recipes[i].f2f_url;
    const $link = $('<a class="btn btn-success" href="' + link + '" target="_blank" data-toggle="modal" data-target="#recipePopUp">Go to Recipe</button>');
    $cardBlock.append($cardTitle);
    $cardBlock.append($link);
    $card.append($image);
    $card.append($cardBlock);
    $('#recipeList2').append($card);
  }

  function recipeModals() {
    $('#recipeList1').click(function(event) {
      if ($(event.target).hasClass('btn btn-success')) {
        createModal(event);
      }
    });
    $('#recipeList2').click(function(event) {
      if ($(event.target).hasClass('btn btn-success')) {
        createModal(event);
      }
    });
  }

  function createModal(event) {
    const url = $(event.target).prop('href');
    $('#recipeIframe').attr('src', url);
  }
});
