using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class CustomerController : ApiController
    {
        // GET: api/Customer
        public IEnumerable<Customer> Get()
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetCustomers();
            }
        }

        // GET: api/Customer/5
        public Customer Get(int id)
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetCustomerById(id);
            }
        }

        // POST: api/Customer
        public void Post([FromBody]Customer customer)
        {
            using (DBProvider db = new DBProvider())
            {
                db.AddCustomer(customer);
            }
        }

        // PUT: api/Customer/5
        public void Put(int id, [FromBody]Customer customer)
        {
        }

        // DELETE: api/Customer/5
        public void Delete(int id)
        {
            using (DBProvider db = new DBProvider())
            {
                db.DeleteCustomer(id);
            }
        }
    }
}
