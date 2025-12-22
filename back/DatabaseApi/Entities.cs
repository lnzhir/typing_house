using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Linq;
using LinqToDB.Mapping;

namespace DatabaseApi
{

    [Table("customers")]
    public class Customer
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("email"), NotNull] public string Email { get; set; }
        [Column("password"), NotNull] public string Password { get; set; }
        [Column("first_name"), NotNull] public string FirstName { get; set; }
        [Column("sur_name")] public string SurName { get; set; }
        [Column("last_name")] public string LastName { get; set; }


        private Customer() { }

        public Customer(string firstName, string surName, string lastName)
        {
            FirstName = firstName;
            SurName = surName;
            LastName = lastName;
        }
    }

    [Table("categories")]
    public class Category
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("name"), NotNull] public string Name { get; set; }

        private Category() { }

        public Category(string name)
        {
            Name = name;
        }
    }

    [Table("products")]
    public class Product
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("price")] public float Price { get; set; }
        [Column("category_id")] public int CategoryId { get; set; }
        [Column("size")] public string Size { get; set; }
        [Column("color")] public string Color { get; set; }

        [Association(ThisKey = nameof(CategoryId), OtherKey = nameof(DatabaseApi.Category.Id))]
        public Category Category { get; set; }


        private Product() { }

        public Product(int price, string size, string color)
        {
            Price = price;
            Size = size;
            Color = color;
        }
    }

    [Table("orders")]
    public class Order
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("date"), NotNull] public DateTime Date { get; set; }
        [Column("customer_id")] public int CustomerId { get; set; }

        [Association(ThisKey = nameof(CustomerId), OtherKey = nameof(DatabaseApi.Customer.Id))]
        public Customer Customer { get; set; }


        private Order() { }

        public Order(DateTime date, int customer_id)
        {
            Date = date;
            CustomerId = customer_id;
        }
    }

    [Table("orderproducts")]
    public class OrderProduct
    {
        [Column("count")] public int Count { get; set; }
        [Column("price")] public float Price { get; set; }
        [Column("product_id"), PrimaryKey, NotNull] public int ProductId { get; set; }
        [Column("order_id"), PrimaryKey, NotNull] public int OrderId { get; set; }

        [Association(ThisKey = nameof(ProductId), OtherKey = nameof(DatabaseApi.Product.Id))]
        public Product Product { get; set; }

        [Association(ThisKey = nameof(OrderId), OtherKey = nameof(DatabaseApi.Order.Id))]
        public Order Order { get; set; }


        private OrderProduct() { }

        public OrderProduct(int count, int price, Product product, Order order)
        {
            Count = count;
            Price = price;
            ProductId = product.Id;
            OrderId = order.Id;
        }
    }

}
