// Замоканные данные заказов пользователя
export const getOrdersList = () => {
  const config = useRuntimeConfig()
	const images_url = config?.public.IMAGES_S3
  return {
      "limit":8,"offset":0,"userId":"325041", "total": 6,
      "userFavorites":["00000037","00000069","00000077","00000107","00000115","00000137","00000140","00000254","00000261","00000401","00000490","00000531","00000538","00000588","00000594","00000596","00000600","00000622","00000721","00000730","00000838","00001014","00001017","00014068","00019792","100000827","100001017"],"result":true,
      "order_list":[
          {"orderId":"0000006","orderStatus":"0","orderDate":"1737438966","orderTotal":117201,
              "deliveryInfo":{
                  "payment_type":1,"products_count":2,"delivery_sum":0,"discount":23868,"products_sum":117201, "status_text":"In line for registration","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"e.l.f. Cosmetics Luminous Putty Blush - Bermuda Shimmer Finish, Lightweight & Buildable Formula, Putty to Powder Blush",
                      "count":2,
                      "price":"4070",
                      "price_old":"7400",
                      "discount":45,
                      "url":"elf-cosmetics-luminous-putt-blush-bermuda-shimmer-finish-lightweight-buildable-formula-putt-to-132136",
                      "image":images_url + "/8f3c48bb/7a252ccf/9ca57281/0d692e92/67922d2db49960.01974050.original.jpg"
                  },
                  {
                      "product_id":"000002",
                      "title":"TIRTIR 24W SOFT BEIGE",
                      "count":1,
                      "price":"7000",
                      "price_old":"7000",
                      "discount":0,
                      "url":"tirtir-24w-soft-beige-132101",
                      "image":images_url + "/70a95817/bb6e7baa/d032e402/518211bd/6792008da18334.32765421.large.webp"
                  }
              ]
          },
          {"orderId":"0000005","orderStatus":"2","orderDate":"1734635646","orderTotal":3341289,
              "deliveryInfo":{
                  "payment_type":0,"products_count":11,"delivery_sum":0,"discount":4070,"products_sum":3341289, "status_text":"The delivery person will pick up the order soon","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"Angel Code, Cotton Tshirt with band, Beige, One Size",
                      "count":1,
                      "price":"13500",
                      "price_old":"13500",
                      "discount":0,
                      "url":"Angel-Code-Cotton-Tshirt-with-band-Beige-One-Sie-108093",
                      "image":images_url + "/33121cbc/dda31b75/50994fb1/8f721266/66bf96aee1c313.52587355.large.webp"
                  },
                  {
                      "product_id":"000002",
                      "title":"Viscose Midi Skirt (Milk), size M",
                      "count":1,
                      "price":"68000",
                      "price_old":"70000",
                      "discount":2,
                      "url":"viscose-midi-skirt-milk-sie-m-83845",
                      "image":images_url + "/36b6cab0/91cbfd66/122b9354/a7a76704/660c324dbec624.66442631.original.png"
                  },
                  {
                      "product_id":"00003",
                      "title":"Queenstore Jet Top White M",
                      "count":1,
                      "price":"17900",
                      "price_old":"17900",
                      "discount":0,
                      "url":"queenstore-jet-top-white-m-112672",
                      "image":images_url + "/bd6dc17f/38d65730/e228be9e/b1cad7cc/66e92b1b4a5f27.64662259.original.jpg"
                  },
                  {
                      "product_id":"00004",
                      "title":"Super soft Set , M, Green",
                      "count":1,
                      "price":"36000",
                      "price_old":"36000",
                      "discount":0,
                      "url":"super-soft-set-m-green-105671",
                      "image":images_url + "/1c0beb69/d2873887/1407217a/768be97b/66b0a33cb543d2.95697833.original.jpg"
                  },
                  {
                      "product_id":"00005",
                      "title":"Stretch Set , S, Lime Green",
                      "count":1,
                      "price":"27500",
                      "price_old":"27500",
                      "discount":0,
                      "url":"stretch-set-s-lime-green-105855",
                      "image":images_url + "/3e8600cf/da239780/881741fe/2b2f5301/66b2334b2ca0e8.35092172.original.jpg"
                  },
                  {
                      "product_id":"00005",
                      "title":"Suit with shorts, size S",
                      "count":1,
                      "price":"14500",
                      "price_old":"29000",
                      "discount":50,
                      "url":"suit-with-shorts-sie-s-78913",
                      "image":images_url + "/4efdd2f9/69559e8b/1c92e99f/32ded48e/65f2a3c6b1a153.66556880.original.jpg"
                  },
                  {
                      "product_id":"00005",
                      "title":"SAMANTHA Blue 44",
                      "count":1,
                      "price":"38000",
                      "price_old":"38000",
                      "discount":0,
                      "url":"samantha-blue-44-79006",
                      "image":images_url + "/1c770298/c99219f2/cfd9c017/abe3a07a/65f2dae0cb6585.26946746.original.png"
                  },
                  {
                      "product_id":"00005",
                      "title":"Linen suit with a skirt (blue), size L",
                      "count":1,
                      "price":"34500",
                      "price_old":"115000",
                      "discount":70,
                      "url":"linen-suit-with-a-skirt-blue-sie-l-79486",
                      "image":images_url + "/4a47a0db/6e60853d/edfcfdf0/8a5ca249/65f847075c8590.41748440.original.png"
                  },
                  {
                      "product_id":"00005",
                      "title":"Karina, size 44",
                      "count":1,
                      "price":"192000",
                      "price_old":"192000",
                      "discount":0,
                      "url":"karina-sie-44-57543",
                      "image":images_url + "/a2b7e632/214b9a88/55913109/c11d7c70/65a0343704cd20.61246210.original.jpg"
                  },
                  {
                      "product_id":"00005",
                      "title":"Skirt and top set, Marina, Size 44",
                      "count":1,
                      "price":"48800",
                      "price_old":"48800",
                      "discount":0,
                      "url":"skirt-and-top-set-marina-sie-44-77990",
                      "image":images_url + "/46768da8/360fbca7/fd25e064/a6211516/65ee8f0a1648c9.24885564.original.png"
                  },
                  {
                      "product_id":"00005",
                      "title":"Evening suit, size S",
                      "count":1,
                      "price":"22500",
                      "price_old":"45000",
                      "discount":50,
                      "url":"evening-suit-sie-s-79507",
                      "image":images_url + "/4a47a0db/6e60853d/edfcfdf0/8a5ca249/65f85f7083c016.73333005.original.png"
                  }
              ]
          },
          {"orderId":"0000004","orderStatus":"1","orderDate":"1734386406","orderTotal":83657,
              "deliveryInfo":{
                  "payment_type":1,"products_count":3,"delivery_sum":400,"discount":23655,"products_sum":83657, "status_text":"The seller collects the order","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"Brown Bag Bliss",
                      "count":3,
                      "price":"23655",
                      "price_old":"25000",
                      "discount":5,
                      "url":"Brown-Bag-Bliss-107126",
                      "image":images_url + "/9a917812/2f2f9d7d/f8d68ef6/8f526d07/66b61068cb0f13.22512864.original.jpg"
                  }
              ]
          },
          {"orderId":"0000003","orderStatus":"4","orderDate":"1734338046","orderTotal":516857,
              "deliveryInfo":{
                  "payment_type":0,"products_count":3,"delivery_sum":400,"discount":39961,"products_sum":516857, "status_text":"The seller cancelled the order","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"Yasmina AI Smart Speaker. Use voice to control smart home devices via Bluetooth or Wi-Fi, play music, Quran (speaks Arabic, English) Midi Emerald",
                      "count":1,
                      "price":"44999",
                      "price_old":"39961",
                      "discount":11,
                      "url":"smart-speaker-with-humanlike-ai-assistant-speaks-arabic-english-midi-emerald-132149",
                      "image":images_url + "/e827393b/538bbfcb/b5dae374/a993bad6/679235ffcd4c12.86492172.large.webp"
                  },
                  {
                      "product_id":"000002",
                      "title":"JBL Speaker Flip 6 Waterproof Wireless Portable Bluetooth Speaker 12Hours playtime",
                      "count":1,
                      "price":"4200",
                      "price_old":"4200",
                      "discount":0,
                      "url":"jbl-speaker-flip-6-waterproof-wireless-portable-bluetooth-speaker-12hours-platime-123059",
                      "image":images_url + "/b0381b82/5825542f/c1d83284/eba55c05/672c5d20ddb3c2.46144186.large.webp"
                  },
                  {
                      "product_id":"000003",
                      "title":"JVC Portable Party Speaker with LED Flame Lights",
                      "count":1,
                      "price":"39999",
                      "price_old":"39999",
                      "discount":0,
                      "url":"jvc-portable-part-speaker-with-led-flame-lights-81421",
                      "image":images_url + "/4866c55b/73d8d16f/a65a3017/ed895a06/6601ab72c238d2.27959775.large.webp"
                  }
              ]
          },
          {"orderId":"0000002","orderStatus":"5","orderDate":"1734159966","orderTotal":1657348,
              "deliveryInfo":{
                  "payment_type":1,"products_count":10,"delivery_sum":500,"discount":0,"products_sum":1657348, "status_text":"You have returned the goods","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"General Mills Cheerios Veggie Blends Cereal, Blueberry Banana Flavored, 313g (10.6 OZ)",
                      "count":2,
                      "price":"3698",
                      "price_old":"3698",
                      "discount":0,
                      "url":"general-mills-cheerios-veggie-blends-cereal-blueberr-banana-flavored-313g-106-oz-130813",
                      "image":images_url + "/a137b103/e485e47c/d83a136b/64175e76/6780deffb57be5.49325060.large.webp"
                  },
                  {
                      "product_id":"000002",
                      "title":"Reeses Puffs Breakfast cereal 326g",
                      "count":2,
                      "price":"4554",
                      "price_old":"4554",
                      "discount":0,
                      "url":"reeses-puffs-breakfast-cereal-326g-48268",
                      "image":images_url + "/29c50376/f9de8d79/483c4ce1/9375b27b/65b2e05687e475.82987530.large.webp"
                  },
                  {
                      "product_id":"000003",
                      "title":"General Mills, Cookie Crisp Cereal, 300g",
                      "count":2,
                      "price":"5057",
                      "price_old":"5057",
                      "discount":0,
                      "url":"general-mills-cookie-crisp-cereal-300g-107819",
                      "image":images_url + "/440a3f3f/4c2e65f6/691bd146/0b19abb9/66bce54c8869d9.75071979.large.webp"
                  },
                  {
                      "product_id":"000003",
                      "title":"Cinnamon Toast Crunch Cereal 340g",
                      "count":2,
                      "price":"4348",
                      "price_old":"4348",
                      "discount":0,
                      "url":"cinnamon-toast-crunch-cereal-340g-48272",
                      "image":images_url + "/da10e6ec/c9b3b619/8cf5e156/78910273/65a7f1f407b2f6.74541718.large.webp"
                  },
                  {
                      "product_id":"000003",
                      "title":"Trix Cereal 303g",
                      "count":2,
                      "price":"4200",
                      "price_old":"4200",
                      "discount":0,
                      "url":"trix-cereal-303g-48271",
                      "image":images_url + "/6171565e/0e6585ae/1dc21073/517fc5e3/65a05d5ba97732.02392161.large.webp"
                  }
              ]
          },
          {"orderId":"0000001","orderStatus":"3","orderDate":"1734019566","orderTotal":7108   ,
              "deliveryInfo":{
                  "payment_type":1,"products_count":4,"delivery_sum":300,"discount":0,"products_sum":7108, "status_text":"The order has been delivered","status_date":"1737438966"
              },
              "orderProducts":[
                  {
                      "product_id":"000001",
                      "title":"POWDER SHAMPOO VIVA LA VIDA 200GM",
                      "count":1,
                      "price":"3000",
                      "price_old":"3000",
                      "discount":0,
                      "url":"powder-shampoo-viva-la-vida-200gm-114849",
                      "image":images_url + "/11adba3b/4069ebc6/213f25e9/0dd1739f/66f54309db9e22.60839927.large.webp"
                  },
                  {
                      "product_id":"000002",
                      "title":"Pets Republic Powder Shampoo - Pink Sugar Scent - 500g",
                      "count":1,
                      "price":"3000",
                      "price_old":"3000",
                      "discount":0,
                      "url":"pets-republic-powder-shampoo-pink-sugar-scent-500g-115026",
                      "image":images_url + "/9cfb3d6a/f541ace9/c1818c44/eb46cd90/66f5b4d8488db6.06887331.large.webp"
                  },
                  {
                      "product_id":"000003",
                      "title":"Simple Solution, Cage And Hutch, Natural Cleaner, 500 Ml",
                      "count":1,
                      "price":"2825",
                      "price_old":"2825",
                      "discount":0,
                      "url":"simple-solution-cage-and-hutch-natural-cleaner-500-ml-115974",
                      "image":images_url + "/a2ac94c0/50c66eca/c700ba7d/c5404067/66fbf8e78a2de5.03927712.large.webp"
                  },
                  {
                      "product_id":"000004",
                      "title":"Bioline, Stain Remover spray, safe and effective, 300ml",
                      "count":1,
                      "price":"2700",
                      "price_old":"2700",
                      "discount":0,
                      "url":"bioline-stain-remover-spra-safe-and-effective-300ml-113432",
                      "image":images_url + "/2736603f/f3f60a61/2d96287a/906928a6/66ed2bc06349c7.07524603.large.webp"
                  }
              ]
          }
      ],
  }
}