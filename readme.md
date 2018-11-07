Setup

npm i
npm run start - frontend
npm run server - backend

Notes on how I structured the small app:

1. Based on your user story `I want to find the closest store to me that has Rickard’s Red in stock`, I only used 2 of your provided endpoints, one to get all products, `/product` and one to get all products by store `/stores?=lat/lon/product_id`

2. `/product` grabs all products and added them to a select, Rickards Red is not in the list for some reason, it is actually a very short list of about 20 items, I am curious if I am restricted because of the free tier/no domain

3. In order to get a free token that you can use from the browser, they require a domain, I obviously do not have one for this test so I had to use it on the backend, that is the only reason why I setup a small express server, I did get a token but it never asked for one on the backend so I have kept it as is since the primary tasks is to render items, filter with the api call

4. I have a router setup but it is currently only used to redirect for 404's

5. lat and lng are provided for the filter but it returns a pretty large radius, all the way to Ottawa, all of the items in the list are display the address for people to decide where to go to

Let me know your thougths on this.