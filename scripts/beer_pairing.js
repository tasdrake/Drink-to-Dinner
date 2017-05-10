$(document).ready(function() {
  const foodIds = {
    beer: {
      crisp: {
        'Brown Rice': 4413,
        'Quinoa': 5835,
        'Basmati Rice': 4309
      },
      maltyFruity: {
        'Fava Beans': 4652,
        'Chickpeas': 3950,
        'Green Beans': 4715,
        'Clams': 4539,
        'Scallops': 5192,
        'Lobster': 4863,
        'Shrimp': 5222
      },
      sour: {
        'Beef': 3068,
        'Lamb': 4823,
        'Parsnips': 5022,
        'Carrots': 137,
        'Beets': 135
      },
      hoppyBitter: {
        'Duck': 5518,
        'Quail': 5520,
        'Chicken': 4517,
        'Brown Rice': 4413,
        'Quinoa': 5835,
        'Basmati Rice': 4309,
        'Butter': 1376,
        'Olive Oil': 1408,
        'Sausage': 3351,
        'Bacon': 4290,
        'Pork Loin': 5093
      },
      dark: {
        'Butter': 1376,
        'Olive Oil': 1408,
        'Carrots': 137,
        'Bell Peppers': 136,
        'Mushrooms': 4948,
        'Broccoli': 4411,
        'Dark Chocolate': 1518,
        'Milk Chocolate': 1544
      },
      belgian: {
        'Brie': 1910,
        'Cheddar': 1727,
        'Blue Cheese': 1751,
        'Mozzarella': 4935,
        'Goat Cheese': 4697
      },
      maltySweet: {
        'Dark Chocolate': 1518,
        'Milk Chocolate': 1544
      },
      fruitySweet: {
        'Sausage': 3351,
        'Bacon': 4290,
        'Pork Loin': 5093
      },
      sweet: {
        'Ice Cream': 191,
        'Cake': 1104
      }
    },
    wine: {
      dryWhite: {
        'Goat Cheese': 4697,
        'Chicken': 4517,
        'Turkey': 5350,
        'Shrimp': 5222,
        'Asparagus': 5777
      },
      sweetWhite: {
        'Duck': 5709,
        'Sea Bass': 5844,
        'Trout': 2042,
      },
      richWhite: {
        'Blue Cheese': 1751,
        'Veal': 5523,
        'Crab': 2089,
        'Squash': 4003
      },
      lightRed: {
        'Goat Cheese': 4697,
        'Chicken': 4517,
        'Lamb': 4823,
        'Mushrooms': 4948
      },
      mediumRed: {
        'Cheddar': 1727,
        'Salmon': 4282,
        'Pork Belly': 5848,
        'Beets': 135
      },
      boldRed: {
        'Parmesan': 1794,
        'Beef': 3068,
        'Ribeye': 3068,
        'Tomatoes': 5333
      }
    }
  };
  const ids = JSON.stringify(foodIds);
  localStorage.setItem('foodIds', JSON.stringify(foodIds));
});
