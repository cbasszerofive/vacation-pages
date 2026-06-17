import { useState, useMemo } from "react";

const INITIAL_PLACES = [
  { name: "Cherry Beach", address: "Red Arrow Hwy, Harbert, MI", miles: 0.3, minutes: 2, region: "Harbert", website: "https://www.chikamingtownship.org/parks", cost: "Free; $15/day parking peak season", notes: "Secluded Lake Michigan beach; 657 ft of shoreline; short walk from the house", tags: ["beach", "free", "kids"] },
  { name: "Warren Woods State Park", address: "67275 Warren Woods Rd, Three Oaks, MI", miles: 4.2, minutes: 8, region: "Three Oaks", website: "https://en.wikipedia.org/wiki/Warren_Woods_State_Park", cost: "Free", notes: "Old-growth forest with hiking trails; National Natural Landmark", tags: ["nature", "hiking", "free"] },
  { name: "Warren Dunes State Park", address: "12032 Red Arrow Hwy, Sawyer, MI", miles: 4.8, minutes: 9, region: "Sawyer", website: "https://www.michigan.gov/recsearch/parks/warrendunes", cost: "$11/day non-residents or Rec Passport", notes: "Sand dunes, shoreline, trails, camping", tags: ["beach", "dunes", "hiking", "kids"] },
  { name: "Galien River County Park", address: "17424 Red Arrow Hwy, New Buffalo, MI", miles: 7.5, minutes: 11, region: "New Buffalo", website: "https://www.berriencounty.org/1328/Galien-River-County-Park", cost: "Free / $5 parking", notes: "Elevated walkways, birding platforms, peaceful nature preserve", tags: ["nature", "free", "kids"] },
  { name: "Dewey Cannon Park", address: "Cherry St, Downtown Three Oaks, MI", miles: 6.1, minutes: 12, region: "Three Oaks", website: "https://en.wikipedia.org/wiki/Dewey_Cannon", cost: "Free", notes: "Historic war memorial park; live music some Saturdays in summer", tags: ["free", "historic"] },
  { name: "New Buffalo Dune Walk", address: "17655 US Hwy 12, New Buffalo, MI", miles: 9.1, minutes: 14, region: "New Buffalo", website: "https://www.explorenewbuffalo.com", cost: "Free", notes: "Scenic boardwalk trail up dunes with panoramic lake vistas", tags: ["dunes", "free", "kids"] },
  { name: "Third Coast Paddling", address: "200 Marquette Dr, New Buffalo, MI", miles: 9.0, minutes: 14, region: "New Buffalo", website: "https://www.thirdcoastpaddling.com", cost: "$25–30/hr kayak or SUP", notes: "Kayaking & paddleboarding on the Galien River. Bald eagle nests! Rated 4.9★", tags: ["water", "adventure", "kids"] },
  { name: "Oselka Marina", address: "514 W Water St, New Buffalo, MI", miles: 9.2, minutes: 14, region: "New Buffalo", website: "https://www.oselkamarina.com", cost: "Varies (charters available)", notes: "Private marina with lakefront walking access and charter rentals", tags: ["water"] },
  { name: "New Buffalo Public Beach", address: "200 Marquette Dr, New Buffalo, MI", miles: 9.1, minutes: 14, region: "New Buffalo", website: "https://www.newbuffaloexplored.com/new-buffalo-beach", cost: "Free / Parking fee", notes: "Large public beach; playground, concessions, foot wash stations", tags: ["beach", "kids"] },
  { name: "Michigan City Boat Tour (Emita II)", address: "Washington Park, Michigan City, IN", miles: 17.2, minutes: 28, region: "Michigan City", website: "https://www.harborcountryadventures.com/michigan-city-boat-tours/", cost: "Varies (book ahead)", notes: "Cruise up the channel past Washington Park, out to Lake Michigan, past the lighthouse and along the Indiana Dunes. Mon–Thu at 2pm CST, Memorial Day–Labor Day. Tours sell out — arrive 30 min early. Call (269) 231-5867 to confirm. Weather permitting.", tags: ["water", "kids", "adventure"] },
  { name: "Skellville (Skeleton Scenes)", address: "2400 M-139, Benton Harbor, MI", miles: 19.8, minutes: 26, region: "Benton Harbor", website: "https://skellville.net", cost: "$1/vehicle", notes: "Quirky outdoor folk-art skeleton display. Mon–Sat 10am–5pm", tags: ["quirky", "cheap"] },
  { name: "Music Bingo on The Patio", address: "Coach's Bar & Grill, 2528 W. Glenlord Rd, Stevensville, MI", miles: 22.4, minutes: 28, region: "Stevensville", website: "https://www.facebook.com/share/1DqAY39TbH/", cost: "Free to play; win $15–30 gift cards", notes: "Mondays 6–8pm, Jun 15–Sep 7. Four rounds of music bingo. Trip dates: Jun 22 & Jun 29", tags: ["evening", "free", "adult"] },
  { name: "Michigan City Lighthouse & Pier", address: "100 Heisman Harbor Rd, Michigan City, IN", miles: 17.2, minutes: 28, region: "Michigan City", website: "https://mchistorical.org", cost: "$10/adult; free under 14", notes: "Pier walk and lighthouse museum. Wed–Sun 1–4pm only", tags: ["lighthouse", "kids", "museum"] },
  { name: "Washington Park Zoo", address: "Washington Park, Michigan City, IN", miles: 17.2, minutes: 28, region: "Michigan City", website: null, cost: null, notes: "Small city zoo in Michigan City", tags: ["zoo", "kids"] },
  { name: "Silver Beach Carousel", address: "333 Broad St, St. Joseph, MI", miles: 20.1, minutes: 30, region: "St. Joseph", website: "https://silverbeachcarousel.com", cost: "$3/ride", notes: "48 hand-carved horses, splash pad, gift shop. Sat–Sun only, noon–9pm", tags: ["kids", "weekend"] },
  { name: "St. Joe Lighthouse Tours", address: "Tiscornia Park, 80 Ridgeway St, St. Joseph, MI", miles: 20.1, minutes: 30, region: "St. Joseph", website: "https://stjoetoday.com/lighthouse", cost: "Free (first floor); $5/person to climb", notes: "Saturdays only 10am–7pm, May 23–Sep 5. Free guided pier tour at 10am. Cash only at lighthouse", tags: ["lighthouse", "saturday", "free", "kids"] },
  { name: "St. Joe Farmers Market", address: "Lake Bluff Park, 400 Lake Blvd, St. Joseph, MI", miles: 20.1, minutes: 30, region: "St. Joseph", website: "https://stjoetoday.com/farmersmarket", cost: "Free", notes: "Saturdays 9am–2pm. Produce, baked goods, flowers, coffee. Scenic Lake Bluff Park overlooking Lake Michigan", tags: ["saturday", "free", "kids"] },
  { name: "Zo's Mini Donuts: Sunset Special", address: "508 Pleasant Street, St. Joseph, MI", miles: 20.1, minutes: 30, region: "St. Joseph", website: "https://www.facebook.com/share/1BBpUBWXyv/", cost: "Free", notes: "Saturdays 7–10pm, Jun 20–Aug 15. Fresh donuts at sunset on the bluff. Yard games, music, kid & dog friendly", tags: ["evening", "saturday", "free", "kids"] },
  { name: "Ghosts of the White House", address: "Maud Preston Palenske Library, 500 Market St, St. Joseph, MI", miles: 20.1, minutes: 30, region: "St. Joseph", website: "https://www.librarybythelake.org", cost: "Free", notes: "⚠️ ONE-TIME: Thu Jun 25, 6–7pm only. Lecture on White House ghost stories — Lincoln's spirit, presidential legends", tags: ["event", "free", "evening"] },
  { name: "St. Joseph North Pier Lighthouse", address: "1160 Broad St, St. Joseph, MI", miles: 20.3, minutes: 31, region: "St. Joseph", website: "https://stjoetoday.com", cost: "Free to view; $5 climb", notes: "Iconic pier & lighthouse. Tower climbs Saturdays 10am–7pm (Jun–Aug)", tags: ["lighthouse", "free", "kids"] },
  { name: "Indiana Dinosaur Museum", address: "7102 Lincolnway W, South Bend, IN", miles: 25.3, minutes: 38, region: "South Bend", website: "https://www.indianadinosaurmuseum.org", cost: "$15/adult; $12/child", notes: "Fossils, animatronics, hands-on exhibits. Fossil dig room available (extra charge)", tags: ["museum", "kids"] },
  { name: "Indiana Dunes National Park", address: "1215 N State Rd 49, Porter, IN", miles: 32.1, minutes: 42, region: "Indiana Dunes", website: "https://nps.gov/indu", cost: "$25/vehicle (7-day pass)", notes: "15 miles of Lake Michigan shoreline, towering dunes, trails. Rated 4.6★", tags: ["beach", "dunes", "hiking", "kids"] },
  { name: "Lake View Beach", address: "Lake Front Dr & Broadway St, Beverly Shores, IN", miles: 31.5, minutes: 42, region: "Indiana Dunes", website: "https://nps.gov/indu", cost: "Free / park pass", notes: "Dunes beach in Indiana Dunes National Park; family friendly", tags: ["beach", "kids", "free"] },
  { name: "University of Notre Dame", address: "Notre Dame, IN 46556", miles: 37.3, minutes: 46, region: "South Bend", website: "https://nd.edu", cost: "Free to walk; guided tours available", notes: "Iconic football stadium & Gothic-style Basilica of the Sacred Heart", tags: ["free", "historic", "kids"] },
  { name: "South Haven Lighthouse", address: "Water Street Pier, South Haven, MI", miles: 51.0, minutes: 57, region: "South Haven", website: "https://michigan.org", cost: "Free", notes: "Historic 1903 red lighthouse; beautiful pier walk especially at sunset", tags: ["lighthouse", "free"] },
  { name: "South Haven – Neighborhood Guide", address: "Downtown South Haven, MI (Maritime District)", miles: 51.0, minutes: 57, region: "South Haven", website: "https://www.oldharborinn.com/activities/neighborhood/", cost: "Varies", notes: "Reference: Friends Good Will boat tour, kayak rentals, Harborwalk, North & South Beach, Farmers Market (Wed & Sat), Maritime Museum, Michigan Theatre, dining & nightlife", tags: ["water", "guide"] },
  { name: "Michigan Maritime Museum", address: "260 Dyckman Ave, South Haven, MI", miles: 51.2, minutes: 58, region: "South Haven", website: "https://michiganmaritimemuseum.org", cost: "$12/adult; $8/child", notes: "5 exhibit buildings + historic boats. Rated 4.7★", tags: ["museum", "kids", "water"] },
  { name: "Gary Aquatorium", address: "6918 Oak Ave, Gary, IN", miles: 46.3, minutes: 62, region: "Gary, IN", website: "https://millerbeacharts.org", cost: "Free", notes: "Historic bathhouse & aviation history on the beach", tags: ["free", "historic"] },
  { name: "Hall of Heroes Superhero Museum", address: "1915 Cassopolis St, Elkhart, IN", miles: 51.2, minutes: 62, region: "Elkhart", website: "https://hallofheroesmuseum.com", cost: "$10/adult; $6/child", notes: "Comic books, superhero memorabilia, props. Rated 4.7★", tags: ["museum", "kids"] },
  { name: "Express Yourself Art Barn", address: "6459 130th Ave, Fennville, MI", miles: 58.4, minutes: 68, region: "Fennville", website: "https://www.oldharborinn.com/activity/do-it-yourself-art/", cost: "Varies by activity", notes: "1880 barn turned art studio. Painting, mosaics, glass fusing, pottery wheel. All skill levels. Call (269) 857-5566", tags: ["art", "kids", "rainy day"] },
  { name: "Shedd Aquarium", address: "1200 S DuSable Lake Shore Dr, Chicago, IL", miles: 62.1, minutes: 78, region: "Chicago", website: "https://sheddaquarium.org", cost: "$39.95/adult; $29.95/child", notes: "Beluga whales, dolphins, aquatic exhibits. Buy tickets in advance", tags: ["museum", "kids"] },
  { name: "Field Museum of Natural History", address: "1400 S Lake Shore Dr, Chicago, IL", miles: 62.3, minutes: 79, region: "Chicago", website: "https://fieldmuseum.org", cost: "$30/adult; $23/child", notes: "Sue the T-Rex, ancient artifacts, cultural exhibits. Rated 4.7★", tags: ["museum", "kids"] },
  { name: "Saugatuck Oval Beach", address: "690 Perryman St, Saugatuck, MI", miles: 72.1, minutes: 80, region: "Saugatuck", website: "https://saugatuck.com", cost: "$10–15/car seasonal; free off-season", notes: "Beautiful Lake Michigan beach with concession stand and ADA access", tags: ["beach", "kids"] },
  { name: "Air Zoo", address: "6151 Portage Rd, Portage, MI", miles: 74.8, minutes: 82, region: "Kalamazoo area", website: "https://airzoo.org", cost: "$18/adult; $16/youth", notes: "Aircraft, flight simulators, 4D theater, rides. Rated 4.8★", tags: ["museum", "kids"] },
  { name: "Lincoln Park Zoo", address: "2001 N Clark St, Chicago, IL", miles: 65.8, minutes: 82, region: "Chicago", website: "https://lpzoo.org", cost: "Free", notes: "Historic free zoo in Chicago. Large animal exhibits and beautiful grounds", tags: ["zoo", "free", "kids"] },
  { name: "Kalamazoo Valley Museum", address: "230 N Rose St, Kalamazoo, MI", miles: 76.2, minutes: 84, region: "Kalamazoo", website: "https://kalamazoomuseum.org", cost: "Free", notes: "Hands-on science exhibits, planetarium. Closed Mondays. Rated 4.7★", tags: ["museum", "free", "kids"] },
  { name: "Kalamazoo Nature Center", address: "7000 N Westnedge Ave, Kalamazoo, MI", miles: 77.8, minutes: 86, region: "Kalamazoo", website: "https://naturecenter.org", cost: "Varies", notes: "Outdoor trails and educational nature center", tags: ["nature", "hiking", "kids"] },
  { name: "Windmill Island Gardens", address: "1 Lincoln Ave, Holland, MI", miles: 93.4, minutes: 103, region: "Holland", website: "https://windmillisland.org", cost: "$11/adult; $8/child (3–12); under 3 free", notes: "Dutch gardens, working windmill, tulips. Family-friendly", tags: ["garden", "kids"] },
  { name: "Fantasy Forest", address: "928 W Michigan Ave, Battle Creek, MI", miles: 96.1, minutes: 106, region: "Battle Creek", website: "https://leilaarboretumsociety.org", cost: "Free (donations welcome)", notes: "Whimsical carved wood stumps; part of Leila Arboretum. Open dawn–dusk", tags: ["free", "kids", "nature"] },
  { name: "Binder Park Zoo", address: "7400 Division Dr, Battle Creek, MI", miles: 97.8, minutes: 107, region: "Battle Creek", website: "https://binderparkzoo.org", cost: "Adults $18.75; Children $15.75; under 2 free", notes: "Safari tram, giraffe feeding, carousel, ropes course. Rated 4.4★", tags: ["zoo", "kids"] },
  { name: "Grand Haven State Park", address: "1001 S Harbor Dr, Grand Haven, MI", miles: 108.6, minutes: 118, region: "Grand Haven", website: "https://michigan.gov", cost: "$9/day non-resident", notes: "Beach, pier, lighthouse walk, camping", tags: ["beach", "lighthouse", "kids"] },
  { name: "Gerald R. Ford Museum", address: "303 Pearl St NW, Grand Rapids, MI", miles: 117.8, minutes: 127, region: "Grand Rapids", website: "https://fordlibrarymuseum.gov", cost: "$13/adult; $7/child", notes: "Presidential museum with replica Oval Office", tags: ["museum", "historic"] },
  { name: "Meyer May House", address: "450 Madison Ave SE, Grand Rapids, MI", miles: 117.2, minutes: 127, region: "Grand Rapids", website: "https://meyermayhouse.steelcase.com", cost: "Free", notes: "Frank Lloyd Wright architecture", tags: ["free", "historic"] },
  { name: "John Ball Zoo", address: "1300 W. Fulton St, Grand Rapids, MI", miles: 118.4, minutes: 128, region: "Grand Rapids", website: "https://jbzoo.org", cost: "$19.95/adult; $14.95/child", notes: "Zoo with rides and petting areas. Rated 4.6★", tags: ["zoo", "kids"] },
  { name: "Frederik Meijer Gardens", address: "1000 E Beltline Ave NE, Grand Rapids, MI", miles: 121.3, minutes: 131, region: "Grand Rapids", website: "https://meijergardens.org", cost: "$20/adult; $11/child", notes: "World-class gardens and sculpture park. Rated 4.8★", tags: ["garden", "kids"] },
  { name: "Pere Marquette Beach", address: "3510 Channel Dr, Muskegon, MI", miles: 128.7, minutes: 140, region: "Muskegon", website: "https://visitmuskegon.org", cost: "$7–10/day parking", notes: "Lake Michigan beach, playground, dunes, trails", tags: ["beach", "kids"] },
  { name: "SS Milwaukee Clipper", address: "2098 Lakeshore Dr, Muskegon, MI", miles: 129.4, minutes: 141, region: "Muskegon", website: "https://milwaukeeclipper.com", cost: "$12/adult; $8 vets/students; under 5 free", notes: "Guided tours Thu–Sun; historic Great Lakes ship", tags: ["museum", "historic"] },
  { name: "USS Silversides Museum", address: "1346 Bluff St, Muskegon, MI", miles: 129.1, minutes: 141, region: "Muskegon", website: "https://silversidesmuseum.org", cost: "$17.50/adult; $13/child; under 5 free", notes: "Tour a real WWII submarine. Rated 4.8★", tags: ["museum", "historic", "kids"] },
];

const INITIAL_RESTAURANTS = [
  { name: "Sweet On Elm", address: "15 N Elm St, Three Oaks, MI", miles: 1, minutes: 5, region: "Three Oaks", website: "https://shopfroehlichs.com", type: "Ice cream & sweets", notes: "Hand-dipped ice cream, nostalgic sweets, small-batch fudge", tags: ["dessert", "kids"] },
  { name: "Seedz Brewery", address: "16321 Red Arrow Hwy, Union Pier, MI", miles: 3, minutes: 7, region: "Union Pier", website: "https://www.seedzbrewery.com", type: "Microbrewery", notes: "Farm-driven beer, cozy space, top-ranked", tags: ["brewery"] },
  { name: "Jackie's Café", address: "801 W Buffalo St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.jackieshencafe.com", type: "Breakfast & Lunch", notes: "Chef Jackie Shen's vibrant café — Belgian waffles & jalapeño cornbread Benedicts", tags: ["breakfast", "brunch", "kids"] },
  { name: "Song Asian Cuisine", address: "301 W Buffalo St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.songasiancuisine.com", type: "Sushi / Asian", notes: "Fresh sushi/sashimi; vegetarian & vegan options", tags: ["dinner", "date night"] },
  { name: "Bentwood Tavern", address: "600 W Water St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.bentwoodtavern.com", type: "American / Waterfront", notes: "Waterfront dining, craft beers, seasonal menus", tags: ["dinner", "waterfront", "brewery"] },
  { name: "Ghost Isle Brewery", address: "17684 US-12, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.ghostislebrewery.com", type: "Brewery / Brewpub", notes: "Scenic marsh view, large menu, family-friendly", tags: ["brewery", "kids", "dinner"] },
  { name: "Beer Church Brewing Co.", address: "24 S Whittaker St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.beerchurchbrewing.com", type: "Brewery + Pizza", notes: "Artisan beers in a historic church, wood-fired Neapolitan pizzas", tags: ["brewery", "pizza", "kids"] },
  { name: "David's Delicatessen", address: "30 N Whittaker St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.davidsdeliandcoffee.com", type: "Deli / Breakfast & Lunch", notes: "Famous Reubens; pop-up cocktail bar evenings", tags: ["breakfast", "lunch"] },
  { name: "Oink's Dutch Treat", address: "227 W Buffalo St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: "https://www.oinksdutchtreat.com", type: "Ice cream", notes: "Pig-themed, 50+ flavors, nostalgic vibe", tags: ["dessert", "kids"] },
  { name: "NBX Brewery", address: "122 W Buffalo St, New Buffalo, MI", miles: 6, minutes: 12, region: "New Buffalo", website: null, type: "Brewery / Pub", notes: "Local craft beers, casual pub vibe", tags: ["brewery"] },
  { name: "Greenbush Brewing Co.", address: "5885 Sawyer Rd, Sawyer, MI", miles: 8, minutes: 14, region: "Sawyer", website: "https://www.greenbushbrewing.com", type: "Brewery / BBQ", notes: "Farmhouse ales with house-made BBQ, lively taproom", tags: ["brewery", "dinner"] },
  { name: "Haymarket Brewing", address: "9301 Red Arrow Hwy, Bridgman, MI", miles: 9, minutes: 15, region: "Bridgman", website: "https://www.haymarketbrewing.com", type: "Brewpub / Pizza", notes: "Award-winning beers, wood-fired pizza, family-friendly", tags: ["brewery", "pizza", "kids"] },
  { name: "Transient Artisan Ales", address: "1006 Industrial Ave, Bridgman, MI", miles: 9, minutes: 15, region: "Bridgman", website: "https://www.transientartisanales.com", type: "Microbrewery", notes: "Known for wild ales and experimental styles", tags: ["brewery"] },
  { name: "Burn 'Em Brewing", address: "718 Freyer Rd, Michigan City, IN", miles: 12, minutes: 20, region: "Michigan City", website: "https://www.burnembrewing.com", type: "Brewery / Scratch Kitchen", notes: "20+ draft beers, local ingredients, live music", tags: ["brewery", "dinner", "live music"] },
  { name: "Shoreline Brewery", address: "208 Wabash St, Michigan City, IN", miles: 12, minutes: 20, region: "Michigan City", website: "https://shorelinebrewery.com", type: "Brewery / Taproom", notes: "Community-focused brewery with seasonal taps", tags: ["brewery"] },
  { name: "Zorn Brew Works", address: "605 E 9th St, Michigan City, IN", miles: 12, minutes: 20, region: "Michigan City", website: "https://www.zornbrewworks.com", type: "Brewery", notes: "Historic brand revived, large patio & food trucks", tags: ["brewery"] },
  { name: "The Livery", address: "190 5th St, Benton Harbor, MI", miles: 14, minutes: 22, region: "Benton Harbor", website: "https://www.liverybrew.com", type: "Brewpub", notes: "Craft beer, live music, artsy vibe", tags: ["brewery", "live music"] },
  { name: "Round Barn Brewery & Public House", address: "9151 1st St, Baroda, MI", miles: 15, minutes: 22, region: "Baroda", website: "https://www.roundbarn.com/public-house", type: "Brewpub / Winery", notes: "Craft beers, wines, wood-fired pizzas", tags: ["brewery", "pizza", "wine"] },
  { name: "Watermark Brewing Company", address: "5781 St Joseph Ave, Stevensville, MI", miles: 16, minutes: 24, region: "Stevensville", website: "https://www.watermarkbrewing.com", type: "Brewery / Tasting Room", notes: "Local favorite with family-friendly events", tags: ["brewery", "kids"] },
  { name: "North Pier Brewing Company", address: "670 N Shore Dr, Benton Harbor, MI", miles: 17, minutes: 26, region: "Benton Harbor", website: "https://www.northpierbrewing.com", type: "Brewery", notes: "Belgian-style ales, beer garden, games", tags: ["brewery"] },
  { name: "Iron Shoe Distillery", address: "3 N 3rd St, Niles, MI", miles: 20, minutes: 27, region: "Niles", website: "https://www.ironshoedistillery.com", type: "Distillery / Cocktails & Burgers", notes: "Small-batch spirits, rustic setting, local cocktails", tags: ["cocktails", "dinner"] },
  { name: "Silver Harbor Brewing Co.", address: "721 Pleasant St, St. Joseph, MI", miles: 20, minutes: 28, region: "St. Joseph", website: "https://www.silverharborbrewing.com", type: "Brewery / New American", notes: "Coastal pub with rotating house beers and a full menu", tags: ["brewery", "dinner"] },
  { name: "River St. Joe", address: "48 N Main St, Buchanan, MI", miles: 17, minutes: 30, region: "Buchanan", website: "https://www.riverstjoe.com", type: "Brewpub / Farm-to-Table", notes: "Organic farm brewery with scenic views", tags: ["brewery", "dinner"] },
  { name: "Kilwins", address: "217 State St, St. Joseph, MI", miles: 20, minutes: 30, region: "St. Joseph", website: "https://www.kilwins.com", type: "Fudge & chocolate", notes: "Premium Mackinac Island-style fudge, caramel apples", tags: ["dessert", "kids"] },
  { name: "Cabana's Ice Cream & More", address: "512 Broad St, St. Joseph, MI", miles: 20, minutes: 30, region: "St. Joseph", website: "https://cabanasicecream.com", type: "Ice cream", notes: "Vegan options available, retro vibe, family favorite", tags: ["dessert", "kids"] },
  { name: "Crane's Pie Pantry & Winery", address: "6054 124th Ave, Fennville, MI", miles: 35, minutes: 42, region: "Fennville", website: "https://www.cranespiepantry.com", type: "Bakery / Winery", notes: "Pies, cider, wine; rustic country vibe", tags: ["dessert", "wine", "kids"] },
  { name: "Lady Bird", address: "230 Culver St, Saugatuck, MI", miles: 38, minutes: 46, region: "Saugatuck", website: "https://www.ladybirdsaugatuck.com", type: "Cocktail Bar / Modern American", notes: "Trendy cocktails; great start to a progressive dinner in Saugatuck", tags: ["cocktails", "date night"] },
  { name: "Bowdie's Chophouse", address: "230 Culver St, Saugatuck, MI", miles: 38, minutes: 46, region: "Saugatuck", website: "https://www.bowdieschophouse.com", type: "Steakhouse", notes: "Upscale steakhouse known for fine cuts and elegant atmosphere", tags: ["dinner", "date night", "upscale"] },
  { name: "Pennyroyal Café & Provisions", address: "3319 Blue Star Hwy, Saugatuck, MI", miles: 38, minutes: 46, region: "Saugatuck", website: "https://www.pennyroyalprovisions.com", type: "Bakery / Café", notes: "Known for seasonal desserts and brunch options", tags: ["brunch", "dessert"] },
  { name: "The Butler", address: "40 Butler St, Saugatuck, MI", miles: 38, minutes: 46, region: "Saugatuck", website: "https://www.butlerrestaurant.com", type: "American / Waterfront", notes: "Historic waterfront dining, known for their Butler Burger", tags: ["dinner", "waterfront"] },
  { name: "Four Roses Café", address: "663 N 10th St, Plainwell, MI", miles: 48, minutes: 58, region: "Plainwell", website: "https://www.fourrosescafe.com", type: "Casual Fine Dining", notes: "Fresh, rotating menu from locally sourced ingredients", tags: ["dinner", "date night"] },
  { name: "New Holland Brewing - Pub on 8th", address: "66 E 8th St, Holland, MI", miles: 55, minutes: 65, region: "Holland", website: "https://www.newhollandbrew.com", type: "Brewpub / Distillery", notes: "Famous for Dragon's Milk stout and craft cocktails", tags: ["brewery", "cocktails"] },
  { name: "The Grill House & Silo", address: "1071 32nd St, Allegan, MI", miles: 45, minutes: 65, region: "Allegan", website: "https://www.grillhouse.net", type: "Grill / Steakhouse", notes: "Cook-your-own steak option", tags: ["dinner"] },
  { name: "Bell's Eccentric Café", address: "355 E Kalamazoo Ave, Kalamazoo, MI", miles: 55, minutes: 66, region: "Kalamazoo", website: "https://www.bellsbeer.com", type: "Brewpub", notes: "Historic craft brewery with beer garden & live music", tags: ["brewery", "live music"] },
  { name: "One Well Brewing", address: "4213 Portage St, Kalamazoo, MI", miles: 55, minutes: 67, region: "Kalamazoo", website: "https://www.onewellbrewing.com", type: "Family-friendly Brewpub", notes: "Creative menu, pinball, casual hangout atmosphere", tags: ["brewery", "kids"] },
  { name: "Brewery Outré", address: "567 E Ransom St, Kalamazoo, MI", miles: 55, minutes: 67, region: "Kalamazoo", website: "https://breweryoutre.com", type: "Taproom / Experimental", notes: "Sours, wine-beer hybrids, dog-friendly patio", tags: ["brewery"] },
  { name: "Boomtown Brewery", address: "2927 Red Arrow Hwy, Kalamazoo, MI", miles: 55, minutes: 68, region: "Kalamazoo", website: "https://www.boomtownbrewery.com", type: "Brewery / Taproom", notes: "Rotating food trucks and bar games", tags: ["brewery"] },
  { name: "Bay Pointe Bar & Grille", address: "11456 Marsh Rd, Shelbyville, MI", miles: 58, minutes: 70, region: "Shelbyville", website: "https://www.baypointeinn.com", type: "Farm-to-Table", notes: "Lakeside dining with rotating seasonal menus", tags: ["dinner", "waterfront"] },
  { name: "Schuler's Restaurant & Pub", address: "115 S Eagle St, Marshall, MI", miles: 75, minutes: 90, region: "Marshall", website: "https://www.schulersrestaurant.com", type: "Steakhouse", notes: "Famous for slow-roasted prime rib", tags: ["dinner", "upscale"] },
  { name: "Cornwell's Turkeyville USA", address: "18935 15½ Mile Rd, Marshall, MI", miles: 75, minutes: 90, region: "Marshall", website: "https://www.turkeyville.com", type: "Comfort Food", notes: "Family-friendly spot known for turkey dinners and live shows", tags: ["dinner", "kids"] },
  { name: "Founders Brewing Co.", address: "235 Grandville Ave SW, Grand Rapids, MI", miles: 95, minutes: 105, region: "Grand Rapids", website: "https://foundersbrewing.com", type: "Brewery / Taproom", notes: "Flagship beers: All Day IPA, KBS; award-winning", tags: ["brewery"] },
];

const DRIVE_ZONES = [
  { label: "On foot", max: 5, color: "#2D6A4F" },
  { label: "Under 15 min", max: 15, color: "#40916C" },
  { label: "15–30 min", max: 30, color: "#52B788" },
  { label: "30–60 min", max: 60, color: "#E9A822" },
  { label: "60–90 min", max: 90, color: "#E07B3A" },
  { label: "90+ min", max: Infinity, color: "#C0392B" },
];

const PLACE_TAGS = ["beach", "dunes", "nature", "hiking", "kids", "free", "museum", "zoo", "lighthouse", "water", "evening", "saturday", "art", "historic", "adventure", "quirky", "garden", "rainy day"];
const FOOD_TAGS = ["breakfast", "brunch", "lunch", "dinner", "dessert", "brewery", "pizza", "cocktails", "wine", "kids", "date night", "upscale", "live music", "waterfront"];

function getZone(minutes) {
  return DRIVE_ZONES.find(z => minutes <= z.max);
}

function DriveChip({ minutes }) {
  const zone = getZone(minutes);
  const label = minutes <= 5 ? "🚶 Walk" : `🚗 ${minutes} min`;
  return (
    <span style={{ background: zone.color + "22", color: zone.color, border: `1px solid ${zone.color}55`, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function CostChip({ cost }) {
  if (!cost) return null;
  const isFree = cost.toLowerCase().startsWith("free");
  return (
    <span style={{ background: isFree ? "#e8f5e9" : "#fff8e1", color: isFree ? "#2e7d32" : "#f57f17", border: `1px solid ${isFree ? "#a5d6a7" : "#ffe082"}`, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
      {isFree ? "Free" : cost}
    </span>
  );
}

function TypeChip({ type }) {
  if (!type) return null;
  return (
    <span style={{ background: "#f0f4ff", color: "#3730a3", border: "1px solid #c7d2fe", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
      {type}
    </span>
  );
}

function PlaceCard({ item, expanded, onToggle, isFood }) {
  const zone = getZone(item.minutes);
  return (
    <div onClick={onToggle} style={{ background: "#fff", borderRadius: 14, border: `1.5px solid ${expanded ? zone.color : "#e8e8e8"}`, padding: "14px 16px", cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s", boxShadow: expanded ? `0 4px 16px ${zone.color}22` : "0 1px 4px #0000000a" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 5 }}>
            {item.name}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <DriveChip minutes={item.minutes} />
            {isFood ? <TypeChip type={item.type} /> : <CostChip cost={item.cost} />}
          </div>
        </div>
        <div style={{ color: "#bbb", fontSize: 18, marginTop: 2, flexShrink: 0 }}>{expanded ? "▲" : "▼"}</div>
      </div>
      {expanded && (
        <div style={{ marginTop: 12, borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
          {item.notes && <p style={{ margin: "0 0 10px", fontSize: 14, color: "#444", lineHeight: 1.5 }}>{item.notes}</p>}
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>📍 {item.address}</div>
          {item.miles && <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>📏 {item.miles} miles</div>}
          {!isFood && item.cost && <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>💰 {item.cost}</div>}
          {item.website && (
            <a href={item.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ display: "inline-block", background: zone.color, color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              Open website →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

const ORIGIN = "13926 Lakewood Dr, Harbert MI 49128";

const EXTRACTOR_SYSTEM =
  "You are a travel data extractor. Given webpage content about a place or event near Three Oaks, Michigan, extract structured data and return ONLY valid JSON with no preamble, markdown, or explanation.";

function buildExtractorPrompt(url, content) {
  return `Extract place information from this webpage and return JSON matching this exact schema:

{
  "name": "string — full place name",
  "address": "string — full street address",
  "miles": number — estimated drive distance in miles from ${ORIGIN},
  "minutes": number — estimated drive time in minutes from ${ORIGIN},
  "region": "string — city/area name only (e.g. 'St. Joseph', 'New Buffalo')",
  "website": "string — URL or null",
  "cost": "string — pricing info or 'Free' or null",
  "type": "string — cuisine/venue type for restaurants, or null for attractions",
  "notes": "string — key info: hours, restrictions, highlights, what makes it worth visiting",
  "tab": "places" or "food" — which tab this belongs on,
  "tags": ["array", "of", "relevant", "tags"]
}

Place tags to choose from: ${PLACE_TAGS.join(", ")}
Food tags to choose from: ${FOOD_TAGS.join(", ")}

URL: ${url}

Page content:
${content}`;
}

// Pull the first {...} JSON object out of a possibly-decorated model response.
function parseJsonLoose(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) throw new Error("No JSON found in response");
  return JSON.parse(text.slice(start, end + 1));
}

function stripHtml(html) {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
  } catch {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
}

function emptyDraft(tab = "places") {
  return { name: "", address: "", miles: "", minutes: "", region: "", website: "", cost: "", type: "", notes: "", tab, tags: [] };
}

const fieldStyle = { width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid #e0e0e0", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fafafa", fontFamily: "inherit" };
const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#888", marginBottom: 4, marginTop: 12 };

function Field({ label, value, onChange, placeholder, type = "text", multiline }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ ...fieldStyle, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} />
      )}
    </label>
  );
}

function AddPlaceModal({ onClose, onAdd }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState(null);
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem("anthropic_api_key") || import.meta.env.VITE_ANTHROPIC_API_KEY || ""; } catch { return import.meta.env.VITE_ANTHROPIC_API_KEY || ""; }
  });
  const [showKey, setShowKey] = useState(false);

  const saveKey = v => {
    setApiKey(v);
    try { v ? localStorage.setItem("anthropic_api_key", v) : localStorage.removeItem("anthropic_api_key"); } catch { /* ignore */ }
  };

  const update = (field, value) => setDraft(d => ({ ...d, [field]: value }));

  const toggleDraftTag = tag =>
    setDraft(d => ({ ...d, tags: d.tags.includes(tag) ? d.tags.filter(t => t !== tag) : [...d.tags, tag] }));

  async function extractWithClaude(pageUrl, content) {
    const headers = {
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    };
    if (apiKey) headers["x-api-key"] = apiKey;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: EXTRACTOR_SYSTEM,
        messages: [{ role: "user", content: buildExtractorPrompt(pageUrl, content) }],
      }),
    });

    if (res.status === 401 || res.status === 403) {
      const err = new Error("auth");
      err.code = "AUTH";
      throw err;
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`API error ${res.status}. ${body.slice(0, 160)}`);
    }
    const data = await res.json();
    const text = data?.content?.[0]?.text || "";
    return parseJsonLoose(text);
  }

  async function fetchAndParse() {
    const target = url.trim();
    if (!target) return;
    setLoading(true);
    setError(null);
    try {
      const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(target);
      const resp = await fetch(proxyUrl);
      if (!resp.ok) throw new Error("PROXY");
      const json = await resp.json();
      const text = stripHtml(json?.contents || "").slice(0, 3000);
      if (!text) throw new Error("PROXY");

      const extracted = await extractWithClaude(target, text);
      setDraft({
        ...emptyDraft(extracted.tab === "food" ? "food" : "places"),
        ...extracted,
        website: extracted.website && extracted.website !== "null" ? extracted.website : target,
        tab: extracted.tab === "food" ? "food" : "places",
        tags: Array.isArray(extracted.tags) ? extracted.tags : [],
      });
    } catch (e) {
      if (e.code === "AUTH") {
        setShowKey(true);
        setError("Couldn't authenticate with the Anthropic API. Add your API key below and retry, or fill in the details manually.");
      } else if (e.message === "PROXY") {
        setError("Couldn't fetch that page (the site may block proxies). You can fill in the details manually below.");
        setDraft(d => d || { ...emptyDraft("places"), website: target });
      } else {
        setError(`Parsing failed: ${e.message}. You can fill in the details manually below.`);
        setDraft(d => d || { ...emptyDraft("places"), website: target });
      }
    } finally {
      setLoading(false);
    }
  }

  function confirm() {
    const isFood = draft.tab === "food";
    const clean = s => (s && String(s).trim() && s !== "null" ? String(s).trim() : null);
    const entry = {
      name: clean(draft.name) || "Untitled",
      address: clean(draft.address) || "",
      miles: Number(draft.miles) || 0,
      minutes: Number(draft.minutes) || 0,
      region: clean(draft.region) || "",
      website: clean(draft.website),
      notes: clean(draft.notes) || "",
      tags: draft.tags || [],
    };
    if (isFood) entry.type = clean(draft.type);
    else entry.cost = clean(draft.cost);
    onAdd(entry, isFood ? "food" : "places");
  }

  const draftTagList = draft && draft.tab === "food" ? FOOD_TAGS : PLACE_TAGS;

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`
        @keyframes tpSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes tpSpin { to { transform: rotate(360deg); } }
      `}</style>
      <div onClick={e => e.stopPropagation()}
        style={{ background: "#f7f7f5", width: "100%", maxWidth: 480, maxHeight: "92vh", overflowY: "auto", borderRadius: "18px 18px 0 0", padding: "18px 18px 28px", animation: "tpSlideUp 0.25s ease-out", boxShadow: "0 -6px 30px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1B4332" }}>Add a Place</h2>
          <button onClick={onClose} aria-label="Close"
            style={{ background: "none", border: "none", fontSize: 22, color: "#999", cursor: "pointer", lineHeight: 1, padding: 4 }}>×</button>
        </div>

        {/* URL input row */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input type="url" inputMode="url" placeholder="Paste a URL…" value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") fetchAndParse(); }}
            style={{ ...fieldStyle, flex: 1, background: "#fff" }} />
          <button onClick={fetchAndParse} disabled={loading || !url.trim()}
            style={{ background: loading || !url.trim() ? "#9bb3a8" : "#2D6A4F", color: "#fff", border: "none", borderRadius: 8, padding: "0 14px", fontSize: 13, fontWeight: 700, cursor: loading || !url.trim() ? "default" : "pointer", whiteSpace: "nowrap" }}>
            {loading ? "…" : "Fetch & Parse"}
          </button>
        </div>

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 4px", color: "#555", fontSize: 14 }}>
            <span style={{ width: 18, height: 18, border: "2.5px solid #cde0d6", borderTopColor: "#2D6A4F", borderRadius: "50%", display: "inline-block", animation: "tpSpin 0.7s linear infinite" }} />
            Fetching page and asking Claude to extract the details…
          </div>
        )}

        {error && (
          <div style={{ marginTop: 12, background: "#fff4f2", border: "1px solid #f5c6bd", color: "#b3261e", borderRadius: 10, padding: "10px 12px", fontSize: 13, lineHeight: 1.45 }}>
            {error}
            <div style={{ marginTop: 8 }}>
              <button onClick={fetchAndParse} disabled={loading}
                style={{ background: "#b3261e", color: "#fff", border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Optional API key field */}
        {(showKey || (!apiKey && error)) && (
          <div style={{ marginTop: 12 }}>
            <span style={labelStyle}>Anthropic API key (stored only in this browser)</span>
            <input type="password" placeholder="sk-ant-…" value={apiKey} onChange={e => saveKey(e.target.value)}
              style={{ ...fieldStyle, background: "#fff" }} />
            <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
              Saved to localStorage on your device only — never committed or sent anywhere except the Anthropic API.
            </div>
          </div>
        )}

        {!draft && !loading && (
          <button onClick={() => setDraft(emptyDraft("places"))}
            style={{ marginTop: 14, background: "none", border: "1.5px dashed #b9c9c1", color: "#2D6A4F", borderRadius: 10, padding: "10px", width: "100%", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            …or fill in the details manually
          </button>
        )}

        {/* Preview / edit form */}
        {draft && (
          <div style={{ marginTop: 14, background: "#fff", borderRadius: 14, border: "1px solid #e8e8e8", padding: "12px 14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
              Preview · edit anything before adding
            </div>

            {/* Tab selector */}
            <span style={labelStyle}>List</span>
            <div style={{ display: "flex", gap: 8 }}>
              {[["places", "🗺️ Places"], ["food", "🍺 Food & Drink"]].map(([key, lbl]) => (
                <button key={key} onClick={() => update("tab", key)}
                  style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: draft.tab === key ? "1.5px solid #2D6A4F" : "1.5px solid #e0e0e0", background: draft.tab === key ? "#2D6A4F" : "#fff", color: draft.tab === key ? "#fff" : "#555", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  {lbl}
                </button>
              ))}
            </div>

            <Field label="Name" value={draft.name} onChange={v => update("name", v)} placeholder="Place name" />
            <Field label="Address" value={draft.address} onChange={v => update("address", v)} placeholder="123 Main St, City, MI" />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <Field label="Miles" type="number" value={draft.miles} onChange={v => update("miles", v)} placeholder="0" />
              </div>
              <div style={{ flex: 1 }}>
                <Field label="Minutes" type="number" value={draft.minutes} onChange={v => update("minutes", v)} placeholder="0" />
              </div>
            </div>
            <Field label="Region" value={draft.region} onChange={v => update("region", v)} placeholder="City / area" />
            <Field label="Website" value={draft.website} onChange={v => update("website", v)} placeholder="https://…" />
            {draft.tab === "food"
              ? <Field label="Type" value={draft.type} onChange={v => update("type", v)} placeholder="Brewery / Pizza" />
              : <Field label="Cost" value={draft.cost} onChange={v => update("cost", v)} placeholder="$10/adult or Free" />}
            <Field label="Notes" value={draft.notes} onChange={v => update("notes", v)} placeholder="Hours, highlights, restrictions…" multiline />

            <span style={labelStyle}>Tags</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {draftTagList.map(tag => (
                <button key={tag} onClick={() => toggleDraftTag(tag)}
                  style={{ background: draft.tags.includes(tag) ? "#2D6A4F" : "#f0f0f0", color: draft.tags.includes(tag) ? "#fff" : "#555", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={onClose}
                style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e0e0e0", background: "#fff", color: "#666", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={confirm}
                style={{ flex: 2, padding: "11px 0", borderRadius: 10, border: "none", background: "#2D6A4F", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Add to List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TripPlanner() {
  const [tab, setTab] = useState("places");
  const [search, setSearch] = useState("");
  const [maxDrive, setMaxDrive] = useState(60);
  const [activeTags, setActiveTags] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [places, setPlaces] = useState(INITIAL_PLACES);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [showAdd, setShowAdd] = useState(false);

  const isFood = tab === "food";
  const data = isFood ? restaurants : places;
  const tagList = isFood ? FOOD_TAGS : PLACE_TAGS;

  const toggleTag = tag => setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleAddPlace = (entry, targetTab) => {
    const byMinutes = arr => [...arr, entry].sort((a, b) => a.minutes - b.minutes);
    if (targetTab === "food") setRestaurants(byMinutes);
    else setPlaces(byMinutes);
    setTab(targetTab);
    setActiveTags([]);
    setSearch("");
    setShowAdd(false);
  };

  const filtered = useMemo(() => {
    return data.filter(p => {
      if (p.minutes > maxDrive) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.notes?.toLowerCase().includes(search.toLowerCase()) &&
          !p.region?.toLowerCase().includes(search.toLowerCase()) &&
          !p.type?.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeTags.length && !activeTags.every(t => p.tags?.includes(t))) return false;
      return true;
    });
  }, [search, maxDrive, activeTags, data]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(p => {
      const zone = getZone(p.minutes);
      if (!groups[zone.label]) groups[zone.label] = { zone, items: [] };
      groups[zone.label].items.push(p);
    });
    return Object.values(groups);
  }, [filtered]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f7f7f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)", padding: "24px 20px 20px", color: "#fff" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7, marginBottom: 4 }}>
          June 19–26 · Harbert, MI
        </div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Three Oaks Trip 🌊</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.8 }}>{places.length} places · {restaurants.length} food & drink spots</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #eee" }}>
        {[["places", "🗺️ Places"], ["food", "🍺 Food & Drink"]].map(([key, label]) => (
          <button key={key} onClick={() => { setTab(key); setActiveTags([]); setSearch(""); }}
            style={{ flex: 1, padding: "12px 0", border: "none", background: "none", fontSize: 14, fontWeight: tab === key ? 700 : 400, color: tab === key ? "#1B4332" : "#888", borderBottom: tab === key ? "2px solid #1B4332" : "2px solid transparent", cursor: "pointer" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Search + Filter bar */}
      <div style={{ padding: "14px 16px", background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 }}>
        <input type="text" placeholder={isFood ? "Search restaurants..." : "Search places..."} value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none", boxSizing: "border-box", background: "#f9f9f9" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
              Max drive: <strong style={{ color: "#1B4332" }}>{maxDrive >= 150 ? "Any" : `${maxDrive} min`}</strong>
            </div>
            <input type="range" min={5} max={150} step={5} value={maxDrive} onChange={e => setMaxDrive(Number(e.target.value))} style={{ width: "100%", accentColor: "#2D6A4F" }} />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            style={{ background: activeTags.length ? "#2D6A4F" : "#f0f0f0", color: activeTags.length ? "#fff" : "#555", border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
            🏷 {activeTags.length ? `(${activeTags.length})` : "Filter"}
          </button>
        </div>
        {showFilters && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tagList.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                style={{ background: activeTags.includes(tag) ? "#2D6A4F" : "#f0f0f0", color: activeTags.includes(tag) ? "#fff" : "#555", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div style={{ padding: "12px 16px 40px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{isFood ? "🍽️" : "🗺️"}</div>
            <div style={{ fontSize: 16 }}>No results match your filters</div>
          </div>
        ) : (
          grouped.map(({ zone, items }) => (
            <div key={zone.label} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, paddingTop: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: zone.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: zone.color }}>{zone.label}</span>
                <span style={{ fontSize: 12, color: "#bbb" }}>· {items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(item => (
                  <PlaceCard key={item.name} item={item} isFood={isFood}
                    expanded={expanded === item.name}
                    onToggle={() => setExpanded(expanded === item.name ? null : item.name)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating add button */}
      <button onClick={() => setShowAdd(true)} aria-label="Add a place"
        style={{ position: "fixed", right: 20, bottom: 24, width: 56, height: 56, borderRadius: "50%", background: "#2D6A4F", color: "#fff", border: "none", fontSize: 30, lineHeight: 1, cursor: "pointer", boxShadow: "0 4px 14px rgba(27,67,50,0.45)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
        +
      </button>

      {showAdd && <AddPlaceModal onClose={() => setShowAdd(false)} onAdd={handleAddPlace} />}
    </div>
  );
}
