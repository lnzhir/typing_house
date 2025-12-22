using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseApi;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            /*DBProvider.Init();

            //DBProvider.AddCustomer(new Customer("Кирилл", "Кобков", "Михайлович"));
            //DBProvider.DeleteCustomer(DBProvider.GetCustomerById(21));
            *//*Customer customer1 = DBProvider.GetCustomerById(20);
            customer1.FirstName = "Екатерина";
            DBProvider.ChangeCustomer(customer1);*//*

            foreach (Customer customer in DBProvider.GetCustomers())
            {
                Console.WriteLine($"{customer.Id} {customer.FirstName} {customer.SurName}");
            }

            foreach (Order order in DBProvider.GetOrders())
            {
                Console.WriteLine(order.Id);
            }

            foreach (Category category in DBProvider.GetCategories())
            {
                Console.WriteLine($"{category.Id} {category.Name}");
                foreach (Format format in DBProvider.GetFormats(category))
                {
                    Console.WriteLine($"{format.Size} {format.Color}");
                }
            }*/

            using (DBProvider db = new DBProvider())
            {
                db.AddOrder(new Order(DateTime.Now, 1));
            }

            

            Console.ReadKey();
        }
    }
}
