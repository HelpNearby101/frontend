import study from "@/assets/post-study.jpg";
import market from "@/assets/post-market.jpg";
import food from "@/assets/post-food.jpg";
import type { Comment, Community, Notification, Post, User } from "./types";

export const CURRENT_USER_ID = "u1";

export const users: User[] = [
  { id: "u1", username: "anshikaa", displayName: "Anshikaa Negi", avatarTone: 1, location: "Indiranagar, Bangalore", bio: "Filter coffee loyalist. Always hunting for quiet places to work and good dosa within walking distance.", joined: "Mar 2025" },
  { id: "u2", username: "rahul_k", displayName: "Rahul K", avatarTone: 2, location: "Koramangala", bio: "Cyclist, weekend baker.", joined: "Jan 2024" },
  { id: "u3", username: "meera.s", displayName: "Meera S", avatarTone: 3, location: "HSR Layout", bio: "Dog mom of two indies.", joined: "Aug 2024" },
  { id: "u4", username: "vikram_codes", displayName: "Vikram", avatarTone: 4, location: "Whitefield", bio: "Backend dev, commute survivor.", joined: "Jun 2023" },
  { id: "u5", username: "priya_d", displayName: "Priya D", avatarTone: 5, location: "Indiranagar", bio: "Runs a tiny pottery studio.", joined: "Nov 2024" },
  { id: "u6", username: "arjun.blr", displayName: "Arjun", avatarTone: 2, location: "Koramangala", bio: "Lifelong Bangalorean.", joined: "Feb 2022" },
];

export const communities: Community[] = [
  { id: "indiranagar", name: "Indiranagar", area: "East Bangalore", members: 12400, online: 312, description: "Cafés, 100 Feet Road updates, lost pets, and everything else happening in Indiranagar.", rules: ["Keep it local to Indiranagar", "Be kind — neighbours read this", "No spam or repeated promotions", "Mark deals and events clearly"] },
  { id: "koramangala", name: "Koramangala", area: "South-East Bangalore", members: 9800, online: 241, description: "From 5th Block food crawls to startup meetups — the Koramangala neighbourhood board.", rules: ["Stay on topic", "No personal info of others", "Verify before sharing alerts"] },
  { id: "hsr-layout", name: "HSR Layout", area: "South Bangalore", members: 7200, online: 158, description: "Sector-wise updates, lake walks, lost & found and local help for HSR residents.", rules: ["Be respectful", "Lost & Found posts need a location", "No brokers"] },
  { id: "whitefield", name: "Whitefield", area: "East Bangalore", members: 6100, online: 97, description: "Traffic, tech parks, and the best weekend spots in Whitefield.", rules: ["Keep it civil", "Traffic updates: include time & road"] },
];

export const posts: Post[] = [
  { id: "p1", title: "Found a great study spot near 12th Main", body: "Small café tucked behind the bookstore on 12th Main. Plenty of plug points, Wi-Fi is solid, and nobody rushes you out. Filter coffee is ₹40. Went on a Tuesday afternoon and it was half empty.", image: study, type: "recommendation", communityId: "indiranagar", authorId: "u5", minutesAgo: 42, distanceKm: 1.2, place: "12th Main, Indiranagar", score: 184, commentCount: 5, mapX: 62, mapY: 30 },
  { id: "p2", title: "Does anyone know a reliable laptop repair shop around here?", body: "My MacBook's keyboard stopped working on a few keys. Service center quoted a full top case replacement. Is there a trustworthy local shop that does component-level repair?", type: "help", communityId: "koramangala", authorId: "u2", minutesAgo: 95, distanceKm: 2.4, place: "5th Block, Koramangala", score: 67, commentCount: 3, mapX: 44, mapY: 58 },
  { id: "p3", title: "Lost my wallet near the metro station", body: "Brown leather wallet, dropped somewhere between HSR BDA complex and the bus stop around 8:30pm yesterday. Has my Aadhaar and a couple of cards. Reward if found — please DM.", type: "lost-found", communityId: "hsr-layout", authorId: "u3", minutesAgo: 180, distanceKm: 3.1, place: "BDA Complex, HSR Layout", score: 92, commentCount: 2, mapX: 52, mapY: 80 },
  { id: "p4", title: "Sunday flea market at the park — 40+ local stalls", body: "Handmade pottery, thrifted clothes, plants and home bakers. 8am to 1pm this Sunday. Free entry, bring your own bag!", image: market, type: "event", communityId: "indiranagar", authorId: "u5", minutesAgo: 300, distanceKm: 0.8, place: "Defence Colony Park", score: 241, commentCount: 1, mapX: 70, mapY: 22 },
  { id: "p5", title: "This darshini has ₹30 masala dosa before 9am", body: "Early-bird pricing every weekday. Crisp dosa, great chutney and coffee that actually tastes like coffee. Gets packed after 8:45.", image: food, type: "deal", communityId: "koramangala", authorId: "u6", minutesAgo: 520, distanceKm: 2.0, place: "6th Block, Koramangala", score: 315, commentCount: 1, mapX: 38, mapY: 50 },
  { id: "p6", title: "Power cut in Sector 2 since morning?", body: "Anyone else? BESCOM helpline keeps disconnecting. Wondering if it's planned maintenance.", type: "discussion", communityId: "hsr-layout", authorId: "u3", minutesAgo: 25, distanceKm: 3.4, place: "Sector 2, HSR Layout", score: 38, commentCount: 0, mapX: 58, mapY: 86 },
  { id: "p7", title: "Need a volunteer driver for a senior citizen's hospital visit", body: "My neighbour (82) has a check-up at Manipal on Thursday at 10am and her son is out of town. We can cover fuel. Even a pointer to a reliable service helps.", type: "help", communityId: "whitefield", authorId: "u4", minutesAgo: 140, distanceKm: 6.8, place: "ITPL Main Rd, Whitefield", score: 129, commentCount: 0, mapX: 88, mapY: 40 },
  { id: "p8", title: "Recommendations for a good dentist that doesn't upsell?", body: "Need a regular cleaning and one filling checked. Last place tried to sell me a ₹40k package.", type: "recommendation", communityId: "indiranagar", authorId: "u2", minutesAgo: 900, distanceKm: 1.6, place: "CMH Road, Indiranagar", score: 54, commentCount: 0, mapX: 56, mapY: 36 },
  { id: "p9", title: "Found a black indie dog with a red collar near the lake", body: "Very friendly, seems well fed. Keeping him at my place for tonight. Please share if you know the family!", type: "lost-found", communityId: "hsr-layout", authorId: "u3", minutesAgo: 60, distanceKm: 2.9, place: "Agara Lake", score: 203, commentCount: 0, mapX: 48, mapY: 70 },
];

export const comments: Comment[] = [
  { id: "c1", postId: "p1", authorId: "u2", parentId: null, body: "Is this the one with the green door? Went there last month, can confirm the coffee is great.", minutesAgo: 30, score: 24 },
  { id: "c2", postId: "p1", authorId: "u5", parentId: "c1", body: "Yes! Green door, small sign. Easy to miss.", minutesAgo: 25, score: 12 },
  { id: "c3", postId: "p1", authorId: "u4", parentId: null, body: "How's it on weekends? Most places near 12th Main get crazy crowded.", minutesAgo: 20, score: 8 },
  { id: "c4", postId: "p1", authorId: "u6", parentId: "c3", body: "Saturday mornings are fine, afternoons not so much.", minutesAgo: 14, score: 5 },
  { id: "c5", postId: "p1", authorId: "u3", parentId: null, body: "Saving this. Thanks for sharing!", minutesAgo: 8, score: 3 },
  { id: "c6", postId: "p2", authorId: "u6", parentId: null, body: "Try the guy above the pharmacy on 80 Feet Road. Fixed my keyboard for ₹2.5k.", minutesAgo: 70, score: 19 },
  { id: "c7", postId: "p2", authorId: "u4", parentId: "c6", body: "Second this, very honest.", minutesAgo: 50, score: 6 },
  { id: "c8", postId: "p2", authorId: "u5", parentId: null, body: "Avoid the mall kiosks, they swap parts.", minutesAgo: 40, score: 4 },
  { id: "c9", postId: "p3", authorId: "u2", parentId: null, body: "Check with the BMTC depot lost & found, they're surprisingly good.", minutesAgo: 120, score: 15 },
  { id: "c10", postId: "p3", authorId: "u3", parentId: "c9", body: "Didn't know that existed, will go today. Thanks!", minutesAgo: 100, score: 4 },
  { id: "c11", postId: "p4", authorId: "u1", parentId: null, body: "Is there parking nearby?", minutesAgo: 200, score: 2 },
  { id: "c12", postId: "p5", authorId: "u2", parentId: null, body: "The ghee podi idli there is underrated.", minutesAgo: 400, score: 11 },
];

export const notifications: Notification[] = [
  { id: "n1", text: "rahul_k replied to your comment in Indiranagar", minutesAgo: 12, postId: "p4", unread: true },
  { id: "n2", text: "Your post reached 100 upvotes", minutesAgo: 90, postId: "p1", unread: true },
  { id: "n3", text: "New event near you: Sunday flea market", minutesAgo: 300, postId: "p4", unread: false },
  { id: "n4", text: "meera.s mentioned you in HSR Layout", minutesAgo: 1400, postId: "p3", unread: false },
];

export const TRENDING_TOPICS = [
  { label: "Lost & Found", type: "lost-found", count: 38 },
  { label: "Local Recommendations", type: "recommendation", count: 124 },
  { label: "Events", type: "event", count: 21 },
  { label: "Deals", type: "deal", count: 17 },
  { label: "Help Needed", type: "help", count: 29 },
] as const;
