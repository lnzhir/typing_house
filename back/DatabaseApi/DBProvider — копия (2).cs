using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqToDB;

namespace DatabaseApi
{
    public class DBProvider : LinqToDB.Data.DataConnection
    {
        private static DBProvider db;

        private DBProvider() : base("TypingHouse")
        {
        }

        public static void Init()
        {
            db = new DBProvider();
        }

        public static void Close_()
        {
            db.Close();
        }

        private ITable<Customer> Customers => this.GetTable<Customer>();
        private ITable<Category> Categories => this.GetTable<Category>();
        private ITable<Product> Products => this.GetTable<Product>();
        private ITable<OrderProduct> OrderProducts => this.GetTable<OrderProduct>();
        private ITable<Order> Orders => this.GetTable<Order>();


        public static List<T> GetEntities<T>() where T: class
        {
            return db.GetTable<T>().ToList();
        }

        // Customer

        public static List<Customer> GetCustomers() => db.Customers.ToList();

        public static Customer GetCustomerById(int id)
        {
            return db.Customers.Where(e => e.Id == id).First();
        }

        public static void AddCustomer(Customer customer)
        {
            db.Customers
                .Value(e => e.FirstName, customer.FirstName)
                .Value(e => e.SurName, customer.SurName)
                .Value(e => e.LastName, customer.LastName)
                .Value(e => e.Email, customer.Email)
                .Value(e => e.Password, customer.Password)
                .Insert();
        }

        public static void DeleteCustomer(int customerId)
        {
            db.Customers.Where(e => e.Id == customerId).Delete();
        }

        public static void DeleteCustomer(Customer customer)
        {
            DeleteCustomer(customer.Id);
        }

        public static void ChangeCustomer(Customer customer)
        {
            db.Customers
                .Where(e => e.Id == customer.Id)
                .Set(e => e.FirstName, customer.FirstName)
                .Set(e => e.SurName, customer.SurName)
                .Set(e => e.LastName, customer.LastName)
                .Update();
        }

        // Category

        public static List<Category> GetCategories() => db.Categories.ToList();

        public static Category GetCategoryById(int id) => db.Categories
            .Where(e => e.Id == id)
            .First();


        // Product

        public static List<Product> GetProducts() =>
            db.Products.LoadWith(e => e.Category).ToList();

        public static List<Product> GetProductsById(int id) =>
            db.Products
                .Where(e => e.Id == id)
                .LoadWith(e => e.Category)
                .ToList();

        public static List<Product> GetProductsByCategory(int categoryId) =>
            db.Products
                .Where(e => e.CategoryId == categoryId)
                .ToList();

        // OrderProduct

        public static void AddOrderProduct(int orderId, int productId, float price, int count)
        {
            db.OrderProducts
                .Value(e => e.OrderId, orderId)
                .Value(e => e.ProductId, productId)
                .Value(e => e.Price, price)
                .Value(e => e.Count, count)
                .Insert();
        }

        private static IQueryable<OrderProduct> GetOrderProductsQuery(int orderId)
        {
            return db.OrderProducts.Where(e => e.OrderId == orderId);
        }

        public static List<OrderProduct> GetOrderProducts(int orderId)
        {
            return GetOrderProductsQuery(orderId)
                .LoadWith(e => e.Product)
                .LoadWith(e => e.Product.Category)
                .ToList();
        }

        public static void DeleteOrderProducts(int orderId)
        {
            GetOrderProductsQuery(orderId).Delete();
        }

        // Order

        public static List<Order> GetOrders() => db.Orders.ToList();

        public static void AddOrder(Order order)
        {
            db.Orders
                .Value(e => e.CustomerId, order.CustomerId)
                .Value(e => e.Date, order.Date)
                .Insert();
        }

        /*public static void AddOrder(Order order, List<Product> products)
        {
            AddOrder(order);

        }*/

        public static void DeleteOrder(int orderId)
        {
            DeleteOrderProducts(orderId);
            db.Orders.Where(e => e.Id == orderId).Delete();
        }
    }
}
