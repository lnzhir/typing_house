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

    [Table("companies")]
    public class Company
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("name"), NotNull] public string Name { get; set; }
        [Column("phone")] public string Phone { get; set; }


        private Company() { }

        public Company(string name, string phone)
        {
            Name = name;
            Phone = phone;
        }
    }

    [Table("products")]
    public class Product
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("name"), NotNull] public string Name { get; set; }
        [Column("price")] public int Price { get; set; }


        private Product() { }

        public Product(string name, int price)
        {
            Name = name;
            Price = price;
        }
    }

    [Table("orders")]
    public class Order
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("date"), NotNull] public string Date { get; set; }
        [Column("customer_id")] public int CustomerId { get; set; }

        [Association(ThisKey = nameof(CustomerId), OtherKey = nameof(DatabaseApi.Customer.Id))]
        public Customer Customer { get; set; }


        private Order() { }

        public Order(string date, Customer customer)
        {
            Date = date;
            CustomerId = customer.Id;
        }
    }

    [Table("selforders")]
    public class SelfOrder
    {
        [Column("id"), PrimaryKey, Identity, NotNull] public int Id { get; set; }
        [Column("date"), NotNull] public string Date { get; set; }
        [Column("company_id")] public int CompanyId { get; set; }

        [Association(ThisKey = nameof(CompanyId), OtherKey = nameof(DatabaseApi.Company.Id))]
        public Company Product { get; set; }


        private SelfOrder() { }
    
        public SelfOrder(string date, Company company)
        {
            Date = date;
            CompanyId = company.Id;
        }
    }

    [Table("orderproducts")]
    public class OrderProduct
    {
        [Column("count")] public int Count { get; set; }
        [Column("price")] public int Price { get; set; }
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

    [Table("ordermaterials")]
    public class OrderMaterial
    {
        [Column("order_id"), PrimaryKey, NotNull] public int OrderId { get; set; }
        [PrimaryKey, NotNull] public string MaterialName { get; set; }
        [Column("count")] public int Count { get; set; }
        [Column("price")] public int Price { get; set; }

        [Association(ThisKey = nameof(OrderId), OtherKey = nameof(DatabaseApi.SelfOrder.Id))]
        public SelfOrder Order { get; set; }


        private OrderMaterial() { }

        public OrderMaterial(int count, int price, string materialName, SelfOrder order)
        {
            Count = count;
            Price = price;
            MaterialName = materialName;
            OrderId = order.Id;
        }
    }

}
