# Amazon Storefront
This application is an Amazon-like storefront with Node.js and MySQL.
The MySQL and Inquirer packages allow for data input and storage. 

# MySQL

Within a MySQL Database, a Products Table holds the Products List seen within the app. 

The products table have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

# User Experience

The app will prompt the user with two messages:

   * The first will ask them the ID of the product they would like to buy.

   * The second message will ask how many units of the product they would like to buy.

Once the user has placed their order, the app will check if the store has enough to 
meet the customer's request. 

If not the user will be notified that there's Insufficient quantity!

The quantity in the MySQL database will be updated and reflect the remaining quantity.

# Video Demo

https://drive.google.com/file/d/1gCC2R_JUIL7bsrwplxkr8RiLQqhxEaE3/view