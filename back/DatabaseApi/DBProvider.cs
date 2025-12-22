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
        //private static DBProvider db;

        public DBProvider() : base("TypingHouse")
        {
        }

        /*public static void Init()
        {
            db = new DBProvider();
        }

        public static void Close_()
        {
            db.Close();
        }*/

        private ITable<Customer> Customers => this.GetTable<Customer>();
        private ITable<Category> Categories => this.GetTable<Category>();
        private ITable<Product> Products => this.GetTable<Product>();
        private ITable<OrderProduct> OrderProducts => this.GetTable<OrderProduct>();
        private ITable<Order> Orders => this.GetTable<Order>();


        /*public List<T> GetEntities<T>() where T: class
        {
            return GetTable<T>().ToList();
        }*/

        // Customer

        public List<Customer> GetCustomers() => Customers.ToList();

        public Customer GetCustomerById(int id)
        {
            return Customers.Where(e => e.Id == id).First();
        }

        public void AddCustomer(Customer customer)
        {
            Customers
                .Value(e => e.FirstName, customer.FirstName)
                .Value(e => e.SurName, customer.SurName)
                .Value(e => e.LastName, customer.LastName)
                .Value(e => e.Email, customer.Email)
                .Value(e => e.Password, customer.Password)
                .Insert();
        }

        public void DeleteCustomer(int customerId)
        {
            Customers.Where(e => e.Id == customerId).Delete();
        }

        public void DeleteCustomer(Customer customer)
        {
            DeleteCustomer(customer.Id);
        }

        public void ChangeCustomer(Customer customer)
        {
            Customers
                .Where(e => e.Id == customer.Id)
                .Set(e => e.FirstName, customer.FirstName)
                .Set(e => e.SurName, customer.SurName)
                .Set(e => e.LastName, customer.LastName)
                .Update();
        }

        // Category

        public List<Category> GetCategories() => Categories.ToList();

        public Category GetCategoryById(int id) => Categories
            .Where(e => e.Id == id)
            .First();


        // Product

        public List<Product> GetProducts() =>
            Products.LoadWith(e => e.Category).ToList();

        public List<Product> GetProductsById(int id) =>
            Products
                .Where(e => e.Id == id)
                .LoadWith(e => e.Category)
                .ToList();

        public List<Product> GetProductsByCategory(int categoryId) =>
            Products
                .Where(e => e.CategoryId == categoryId)
                .ToList();

        // OrderProduct

        public void AddOrderProduct(int orderId, int productId, float price, int count)
        {
            OrderProducts
                .Value(e => e.OrderId, orderId)
                .Value(e => e.ProductId, productId)
                .Value(e => e.Price, price)
                .Value(e => e.Count, count)
                .Insert();
        }

        private IQueryable<OrderProduct> GetOrderProductsQuery(int orderId)
        {
            return OrderProducts.Where(e => e.OrderId == orderId);
        }

        public List<OrderProduct> GetOrderProducts(int orderId)
        {
            return GetOrderProductsQuery(orderId)
                .LoadWith(e => e.Product)
                .LoadWith(e => e.Product.Category)
                .ToList();
        }

        public void DeleteOrderProducts(int orderId)
        {
            GetOrderProductsQuery(orderId).Delete();
        }

        // Order

        public List<Order> GetOrders() => Orders.ToList();

        public void AddOrder(Order order)
        {
            Orders
                .Value(e => e.CustomerId, order.CustomerId)
                .Value(e => e.Date, order.Date)
                .Insert();
        }

        /*public static void AddOrder(Order order, List<Product> products)
        {
            AddOrder(order);

        }*/

        public void DeleteOrder(int orderId)
        {
            DeleteOrderProducts(orderId);
            Orders.Where(e => e.Id == orderId).Delete();
        }
    }
}
