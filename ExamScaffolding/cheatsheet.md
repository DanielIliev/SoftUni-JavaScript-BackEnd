# Cheat Sheet

1. Initialize project
2. Install and setup express
3. Routes
    * add routes
    * add bodyParser
    * add static route
4. Add view engine (express-handlebars)
    * register in express
    * add views folder
    * add main layout
5. Add home controller
    * add controller to route
6. Add database (mongoose)
7. Connect to database -> mongoose.connect and that's it!
    * Set mongoose.set('strictQuery', false) -> deprecation warning
8. Authentication
    * add register page
    * add register action (controller)
    * add login page
    * add login action (controller)
9. Create user model (generic)
10. Check if user exists (not really a requirement)
11. (Optional) use util.promisify to convert jwt sign / verify from callback based to promise based
12. Generate token with payload (the secret is a const of an optional hash) -> can be stored in .env and taken with the dotenv package 
13. Authenticate user (decode jwt token)
    * add decoded token to request
    * attach auth middleware to routes