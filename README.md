Details
===
This is a classic classifieds app where anyone can post and search for toys near them. Data will be stored in an Express API deployed to Heroku. The React front-end will be completely decoupled and deployed to my local hosting. I will not require logging initially (we will trust our users to use it responsibly.


MVP
===
- no sign up needed
- CRUD your own items for sale (delete only from a secret URL)
-- item = title (text) - Simple Title (what is display in search)
-- description (text) - long description
-- condition (1-5 dropdown) - Speak to that condition is subjective
-- new or used radio button - speak to the difference
-- photo (link to it for MVP) - Just one picture
-- price (number) - put $ everywhere so you don't have to parse
-- isSold (checkbox)
-- zip code (number, 5 digits) - restrict to 5 digits
-- contact method (text) - speak to that it can be whatever people are comfortable with (Facebook, Twitter, text, email, etc.)
- super basic free text across all text fields search
- mark an item as sold
- be able to limit results by new/used, price, sold


Stretch Goals
===
- sort by distance (2 miles, 5 miles, 10 miles, 20 miles, 50miles, maybe just a text entry?) from a specific search zip code
- zip code API for proximity - hit up Seattle kids


Resources
===
- **Trello** - https://trello.com/b/iwgUPaer/unit-3-sell-your-toys
- **GitHub - Backend** - https://github.com/jasonspiller/unit-3-sell-your-toys-backend
- **GitHub - Frontend** - https://github.com/jasonspiller/unit-3-sell-your-toys-frontend
- **Heroku - Backend API** - https://sellyourtoys.herokuapp.com
- **My Host - Frontend** - https://thetargetlab.com
