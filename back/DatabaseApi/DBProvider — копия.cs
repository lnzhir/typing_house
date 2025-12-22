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
        private ITable<Format> Formats => this.GetTable<Format>();
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

        // Format

        public static List<Format> GetFormats(int categoryId)
        {
            /*db.Categories
                .Join(db.Products, c => c.Id, p => p.CategoryId, (c, p) => c.Id == p.CategoryId)
                .Join(db.Formats, p => p., f => f.Id, (p, f) => p. == f.Id)*/
            var query =
                from c in db.Categories
                join p in db.Products on c.Id equals p.CategoryId
                join f in db.Formats on p.FormatId equals f.Id
                where c.Id == categoryId
                select f;
            return query.ToList();
        }

        // Product

        public static List<Product> GetProducts() =>
            db.Products.LoadWith(e => e.Category).LoadWith(e => e.Format).ToList();

        public static List<Product> GetProducts(int categoryId) =>
            db.Products
                .Where(e => e.CategoryId == categoryId)
                .LoadWith(e => e.Category)
                .LoadWith(e => e.Format)
                .ToList();

        // OrderProduct

        private static IQueryable<OrderProduct> GetOrderProductsQuery(int orderId)
        {
            return db.OrderProducts.Where(e => e.OrderId == orderId);
        }

        public static List<OrderProduct> GetOrderProducts(int orderId)
        {
            return GetOrderProductsQuery(orderId).ToList();
        }

        public static void DeleteOrderProducts(int orderId)
        {
            GetOrderProductsQuery(orderId).Delete();
        }

        // Order

        public static List<Order> GetOrders() => db.Orders.LoadWith(o => o.Customer).ToList();

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
