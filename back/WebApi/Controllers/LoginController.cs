using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web.Http;
using WebApi.Models;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class LoginController : ApiController
    {
        // GET: api/Login
        public User Get(string email, string password)
        {
            using (DBProvider db = new DBProvider())
            {
                Customer customer = db.GetCustomers().Where((e) => e.Email == email && e.Password == password).First();
                return new User(customer.Id, customer.Email, customer.FirstName, customer.SurName, customer.LastName);
            }
        }
    }
}
