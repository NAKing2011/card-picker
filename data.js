/*    { tags: [''], name: '', remaining: 20, image: '' },
      { tags: [''], name: '', remaining: 20, isSpecial: true,  image: ''},*/
const sections = [
  /*{ 
    label: 'Happy Birthday - B&W',
    cards: [
      { tags: [''], name: '', remaining: 0, image: '' },
      { tags: [''], name: '', remaining: 0, isSpecial: false,  image: ''},
    ]
  },*/
  {
    label: 'Halloween',
    cards: [
      { tags: ['dog'], name: 'Haloween Opt 01', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1381/2944/cd12216-puppy-with-pumpkin-bucket-cute-dog-halloween-card__47774.1656195139.jpg?c=1' },
      { tags: ['cat','funny'], name: 'Haloween Opt 02', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1781/3812/cd2826-cat-under-candy-bucket-halloween-card__88678.1656196086.jpg?c=1' },
      { tags: ['cat'], name: 'Haloween Opt 03', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1728/3706/cd18998-kitten-wearing-knit-pumpkin-hat-cute-halloween-card__85646.1656196009.jpg?c=1' },
      { tags: ['cat', 'hot'], name: 'Halloween Opt 04', remaining: 7, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1915/4089/cd6786-kittens-in-jack-o-lantern-halloween-card__47551.1656196363.jpg?c=1' },
      
      { tags: [''], name: 'Haloween Opt 5', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1442/3088/cd1254-little-witch-choosing-a-broom-halloween-card__25518.1656195238.jpg?c=1' },
      { tags: ['cat', 'funny'], name: 'Halloween Opt 06', remaining: 8, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1729/3708/cd18999-black-cat-riding-broom-funny-halloween-card__98357.1656196011.jpg?c=1' },
      { tags: ['funny'], name: 'Haloween Opt 07', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1382/2946/cd12218-squirrel-trick-or-treating-funny-halloween-card__39465.1656195140.jpg?c=1' },
      { tags: ['funny', 'cat'], name: 'Haloween Opt 08', remaining: 1, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Santa-Cat-With-Cookies-Box-of-10-Funny-Christmas-Cards_c41651a9-4ce8-4522-8032-baf4fdc42397.75d72a0934ea6ee82fe0b35e73c03502.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF' },
      { tags: ['dog', 'cat'], name: 'Haloween Opt 9', remaining: 4,  image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1470/3144/cd13663-trick-or-treat-dogs-funny-humorous-halloween-card__03953.1656195279.jpg?c=1'},
    ]
  },
  {
    label: 'Happy Birthday',
    cards: [
      { tags: [''], name: 'Birthday Opt 01', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280x1280/products/12372/36203/CD20134__30374.1712417747.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 02', remaining: 9, image: 'https://m.media-amazon.com/images/I/61SyqxjSgDL._AC_SX679_.jpg' },
      /* { tags: ['funny'], name: 'Birthday Opt 03', remaining: 1, image: 'https://m.media-amazon.com/images/I/5145rNUyerL._AC_.jpg' }, */
      { tags: [''], name: 'Birthday Opt 03', remaining: 6, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12375/images/25868/cd20137__21286.1667070929.386.513.jpg?c=1' },
      { tags: ['funny'], name: 'Birthday Opt 04', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1766/images/3782/cd2086-woman-goosing-husband-birthday-card__29520.1656196062.386.513.jpg?c=1' },
      /*{ tags: [''], name: 'Birthday Opt 06', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1633/images/3497/cd17637-timeless-ageless-flawless-a-press-birthday-card__67124.1656195859.386.513.jpg?c=1' },*/
      { tags: [''], name: 'Birthday Opt 05', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12418/images/25955/cd20428__70106.1667071010.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 06', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/1624/images/3479/cd17628-rooster-hangover-funny-birthday-card__66450.1656195844.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 07', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/13539/images/28246/cd21327__89866.1677534161.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 08', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12376/images/25870/cd20138__49680.1667070931.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 09 ($5)', remaining: 3, isSpecial: true, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12414/images/25946/cd20423__56982.1667071002.386.513.jpg?c=1' },
      /*{ tags: [''], name: 'Birthday Opt 12', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12386/images/25890/cd20148__02447.1667070950.386.513.jpg?c=1' },*/
      { tags: [''], name: 'Birthday Opt 10', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/13553/images/28276/cd21341__64825.1677534191.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 11', remaining: 5, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/12378/images/25874/cd20140__37605.1667070935.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 12', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/products/11963/images/25012/cd11967-flamingo-with-swim-ring-birthday-card__64479.1656553452.386.513.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 13', remaining: 4, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Ale-Yeah-Mug-Silver-and-Black-Bursts-on-Black-A-Press-Funny-Masculine-Birthday-Card-for-Him-Man_088ad72e-738c-4cfb-ba17-ba6c1a4547f6.73b896954586f59294ffe9a463900ff0.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF' },
      { tags: [''], name: 'Birthday Opt 14', remaining: 2, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Man-Reading-Newspaper-Comics-on-Porch-America-Collection-Humorous-Funny-Birthday-Card_4d3c930d-e21f-4f29-a1ac-b0133020e657.981b8e1a000805a11e2f4afaac7a3f8f.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF' },
      { tags: ['cat'], name: 'Birthday Opt 15', remaining: 1, image: 'https://www.meijer.com/content/dam/meijer/product/0012/61/5777/70/0012615777703_0_A1C1_0600.jpg' },
      /*{ tags: [''], name: 'Birthday Opt 16 ($5)', remaining: 1, isSpecial: true, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Dazzling-Sparkler-Cake-A-Press-Glitter-Birthday-Card_2312e84e-128e-4712-9b6f-11e47d540231.2f13b5ffa9bb434575f9effa327c7a3c.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF' },*/
      { tags: ['funny'], name: 'Birthday Opt 16', remaining: 1, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Wine-Corks-Toasting-on-Bright-Purple-A-Press-Funny-Humorous-Birthday-Card_df32da12-9e0a-41d8-b46e-1adec7bb172b.d37c02cbeecbdc9174eee06121a1f638.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF' },
      /*{ tags: [''], name: 'Birthday Opt 18', remaining: 1, image: 'https://conwaykitchen.com/cdn/shop/products/a_ed4c94b9-816f-4c34-951e-35f0b56e5a71.jpg?v=1639023155&width=990' },*/
      { tags: [''], name: 'Birthday Opt 17', remaining: 2, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280w/products/1199/2502/CD11386-beer-with-sweat-band-birthday-card__83787.1656192567.jpg?c=1' },
      { tags: [''], name: 'Birthday Opt 18', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280x1280/products/12368/25852/cd20100__47244.1667070915.jpg?c=1' },
      /*{ tags: [''], name: 'Birthday Opt 24', remaining: 1, image: 'https://i5.walmartimages.com/seo/Avanti-Press-Rooster-Wears-Swimsuit-Funny-Humorous-Birthday-Card_2159cfa2-d23d-4666-8fde-70286d881f84.ce96db1f501d8bf71f947263315f54c5.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF' },*/
      { tags: ['funny'], name: 'Birthday Opt 19', remaining: 2, image: 'https://conwaykitchen.com/cdn/shop/products/88d23e1b-1961-4291-97c0-e1f784b933fe.19b0ffe8cfee340fe1f7e6901ec450b0.jpg?v=1631444209&width=990' },
      { tags: [''], name: 'Birthday Opt 20 ($5)', remaining: 1, isSpecial: true,  image: 'https://m.media-amazon.com/images/I/81UlbcnqomL._AC_SL1480_.jpg'},
    ]
  },
  {
    label: 'Christmas',
    cards: [
      { tags: [''], name: 'Christmas 01', remaining: 4, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/12254/25600/cd80277__73531.1665065850.jpg?c=1' },
      { tags: ['funny'], name: 'Christmas 02', remaining: 3, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1020/2143/cd80099-flamingo-wearing-santa-hat-and-sunglasses-on-beach-funny-warm-weather-christmas-card__12071.1656192211.jpg?c=1' },
      { tags: ['funny'], name: 'Christmas 03', remaining: 3, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/640w/products/1029/2161/cd8377-dog-tongue-stuck-on-pole-christmas-card__87495.1656192223.jpg?c=1'}
    ]
  },
  /*{
    label: 'Happy Belated Birthday',
    cards: [
      { tags: [''], name: '', remaining: 0, image: '' },
      { tags: [''], name: '', remaining: 0, isSpecial: false,  image: ''},
    ]
  },
  { label: 'Congratulations on Marriage', 
    cards: [
      { tags: [''], name: '', remaining: 0, image: '' },
      { tags: [''], name: '', remaining: 0, isSpecial: false,  image: ''},
    ] 
  },
  { label: 'Fathers Day', 
    cards: [
      { tags: [''], name: '', remaining: 0, image: '' },
      { tags: [''], name: '', remaining: 0, isSpecial: false,  image: ''},
    ] 
  },
  { label: 'Happy Retirement', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Get Well Soon', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },
  { label: 'Sorry For Your Loss', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  },*/
  { label: 'Thank You', 
    cards: [
      /*{ tags: ['funny'], name: 'Thank You 01', remaining: 1, image: 'https://i.ebayimg.com/images/g/E8YAAeSwJZloIs~P/s-l500.jpg' },*/
      { tags: ['funny'], name: 'Thank You 01', remaining: 1, image: 'https://cdn11.bigcommerce.com/s-o3ewkiqyx3/images/stencil/1280w/products/12411/25940/cd20420__44731.1667070997.jpg?c=1' },
      { tags: ['funny'], name: 'Thank You 02', remaining: 1, image: 'https://conwaykitchen.com/cdn/shop/products/4b9168e7-d21c-4d44-9397-161895198c52_1.7edadcd9445e1b2c2504ab47bb63aa6d.jpg?v=1592942906&width=990' },
      /*{ tags: ['funny', 'dog'], name: 'Thank You 04', remaining: 2, image: 'https://conwaykitchen.com/cdn/shop/products/v_4409685a-ab4e-48bb-8156-64aeb3ac606b.jpg?v=1670947709&width=990' },*/
      { tags: ['funny'], name: 'Thank You 03', remaining: 3, image: 'https://conwaykitchen.com/cdn/shop/products/34b64e0a-6ec5-4963-8bc1-522169085e16.0373c870d21ef08bc11465e1aad62fd4.jpg?v=1634658413&width=990' },
    ] 
  },
  { label: 'Blank Cards', 
    cards: [
      { tags: [''], name: 'Blank 01', remaining: 2, image: 'https://conwaykitchen.com/cdn/shop/products/cd1920-smiley-face-cloud-blank-card.jpg?v=1593105442&width=990' },
      { tags: [''], name: 'Blank 02', remaining: 2, image: 'https://i5.walmartimages.com/seo/Avanti-Press-You-Rock-Yellow-and-White-Letters-on-Purple-A-Press-Funny-Humorous-Friendship-Card_2b7605e9-20d8-4141-b81b-e6200d3afbba.d2bfc49b2ea59cdbb3e69cd688f219c8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF' },
    ] 
  }/*,
  { label: 'Random / Surprise Mix', 
    cards: [
      { tags: [], name: '', image: '', remaining: 0 },
    ] 
  }*/
];

