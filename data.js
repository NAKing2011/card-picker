const sections = [
  {
    label: 'Halloween',
    cards: [
      { tags: [], name: 'Halloween Option 1', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1381/2944/cd12216-puppy-with-pumpkin-bucket-cute-dog-halloween-card__47774.1656195139.jpg?c=1', remaining: 5 },
      { tags: [], name: 'Halloween Option 2', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1781/3812/cd2826-cat-under-candy-bucket-halloween-card__88678.1656196086.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Halloween Option 3', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1728/3706/cd18998-kitten-wearing-knit-pumpkin-hat-cute-halloween-card__85646.1656196009.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Halloween Option 4', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1915/4089/cd6786-kittens-in-jack-o-lantern-halloween-card__47551.1656196363.jpg?c=1', remaining: 9 },
      { tags: [], name: 'Halloween Option 5', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12266/25624/cd20366__85229.1665065873.jpg?c=1', remaining: 1 },
      { tags: [], name: 'Halloween Option 6', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1442/3088/cd1254-little-witch-choosing-a-broom-halloween-card__25518.1656195238.jpg?c=1', remaining: 5 },
      { tags: [], name: 'Halloween Option 7', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1729/3708/cd18999-black-cat-riding-broom-funny-halloween-card__98357.1656196011.jpg?c=1', remaining: 8 },
      { tags: [], name: 'Halloween Option 8', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1382/2946/cd12218-squirrel-trick-or-treating-funny-halloween-card__39465.1656195140.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Halloween Option 9', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1470/3144/cd13663-trick-or-treat-dogs-funny-humorous-halloween-card__03953.1656195279.jpg?c=1', remaining: 6 },
      { tags: [], name: 'Halloween Option 10', image: 'https://m.media-amazon.com/images/I/61IcdZaXm4L._UF894,1000_QL80_.jpg', remaining: 1 }
    ]
  },
  {
    label: 'Happy Birthday',
    cards: [
      { tags: [], name: 'Birthday Option 1', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12378/images/25874/cd20140__37605.1667070935.386.513.jpg?c=1', remaining: 5 },
      { tags: [], name: 'Birthday Option 2', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1427/images/3049/cd12499-birthday-hugs-cat-funny-birthday-card__18543.1656195213.386.513.jpg?c=1', remaining: 0 },
      { tags: [], name: 'Birthday Option 3', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1703/images/3638/cd18973-blue-pelican-with-beer-bottles-in-mouth-a-press-funny-birthday-card__42537.1656195962.386.513.jpg?c=1', remaining: 0 },
      { tags: [], name: 'Birthday Option 4', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/13553/images/28276/cd21341__64825.1677534191.386.513.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Birthday Option 5', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12386/images/25890/cd20148__02447.1667070950.386.513.jpg?c=1', remaining: 1 },
      { tags: [], name: 'Birthday Option 6', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12414/images/25946/cd20423__56982.1667071002.386.513.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Birthday Option 7', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/11963/images/25012/cd11967-flamingo-with-swim-ring-birthday-card__64479.1656553452.386.513.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Birthday Option 8', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1710/images/3653/cd18980-golden-retrievers-hugging-cute-dogs-birthday-card__87030.1656195973.386.513.jpg?c=1', remaining: 0 },
      { tags: [], name: 'Birthday Option 9', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12376/images/25870/cd20138__49680.1667070931.386.513.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Birthday Option 10', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1599/images/3429/cd17599-party-hat-letter-shaped-cake-a-press-birthday-card__89549.1656195806.386.513.jpg?c=1', remaining: 0 },
      { tags: [], name: 'Birthday Option 11', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/13539/images/28246/cd21327__89866.1677534161.386.513.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Birthday Option 12', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1624/images/3479/cd17628-rooster-hangover-funny-birthday-card__66450.1656195844.386.513.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Birthday Option 13', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1702/images/3636/cd18972-single-orange-cat-in-group-of-cats-a-press-cute-funny-birthday-card__55626.1656195961.386.513.jpg?c=1', remaining: 0 },
      { tags: [], name: 'Birthday Option 14', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12418/images/25955/cd20428__70106.1667071010.386.513.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Birthday Option 15', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1633/images/3497/cd17637-timeless-ageless-flawless-a-press-birthday-card__67124.1656195859.386.513.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Birthday Option 16', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1568/images/3367/cd16174-woman-decorating-cake-with-chocolate-america-collection-birthday-card__83531.1656195448.386.513.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Birthday Option 17', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1766/images/3782/cd2086-woman-goosing-husband-birthday-card__29520.1656196062.386.513.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Birthday Option 18', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12375/images/25868/cd20137__21286.1667070929.386.513.jpg?c=1', remaining: 6 },
      { tags: [], name: 'Birthday Option 19', image: 'https://m.media-amazon.com/images/I/5145rNUyerL._AC_.jpg', remaining: 1 },
      { tags: [], name: 'Birthday Option 20', image: 'https://m.media-amazon.com/images/I/61SyqxjSgDL._AC_SX679_.jpg', remaining: 8 },
      { tags: [], name: 'Birthday Option 21', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280x1280/products/12372/36203/CD20134__30374.1712417747.jpg?c=1', remaining: 2 }
    ]
  },
  {
    label: 'Christmas',
    cards: [
      { tags: [], name: 'Christmas Option 1', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12254/25600/cd80277__73531.1665065850.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Christmas Option 2', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12264/25620/cd80289__07189.1665065869.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Christmas Option 3', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1020/2143/cd80099-flamingo-wearing-santa-hat-and-sunglasses-on-beach-funny-warm-weather-christmas-card__12071.1656192211.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Christmas Option 4', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1030/2163/cd8379-dogs-in-truck-christmas-card__30737.1656192225.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Christmas Option 6', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1029/2161/cd8377-dog-tongue-stuck-on-pole-christmas-card__87495.1656192223.jpg?c=1', remaining: 4 },
      { tags: [], name: 'Christmas Option 7', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12252/25596/cd80275__43456.1665065847.jpg?c=1', remaining: 1 }
    ]
  },
  {
    label: 'Thank You Cards',
    cards: [
      { tags: [], name: 'Thanks Option 1', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12390/25898/cd20152__86538.1667070957.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Thanks Option 2', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1635/40377/CD17639__38997.1749571436.jpg?c=1', remaining: 3 },
      { tags: [], name: 'Thanks Option 3', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280x1280/products/1447/3098/cd12946-smiling-cheese-grater-funny-humorous-a-press-thank-you-card__06900.1656195245.jpg?c=1', remaining: 1 }
    ]
  },
  {
    label: 'Blank Cards',
    cards: [
      { tags: [], name: 'Blank Option 1', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1606/images/3443/cd17610-line-up-of-five-kittens-on-pink-cute-cat-blank-note-card__42862.1656195816.386.513.jpg?c=1', remaining: 1 },
      { tags: [], name: 'Blank Option 2', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1731/images/3712/cd1920-smiley-face-cloud-blank-card__26904.1656196013.386.513.jpg?c=1', remaining: 2 },
      { tags: [], name: 'Blank Option 3', image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280x1280/products/12354/25824/cd20086__55038.1667070888.jpg?c=1', remaining: 3 }
    ]
  },
  { label: 'Sympathy & Thinking of You', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
      { tags: [], name: '', image: '', remaining: 0 },
      { tags: [], name: '', image: '', remaining: 0 },
      { tags: [], name: '', image: '', remaining: 0 },
      { tags: [], name: '', image: '', remaining: 0 },
      { tags: [], name: '', image: '', remaining: 0 }
    ] 
  },
  { label: 'Get Well Soon', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Congratulations', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Wedding & Engagement', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'New Baby', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Anniversary', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Friendship & Just Because', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: "Father's Day", 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: "Mother's Day", 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: "Valentine's Day", 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Easter', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Random / Surprise Mix', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  }
];
