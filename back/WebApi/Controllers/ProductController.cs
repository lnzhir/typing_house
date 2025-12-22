using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class ProductController : ApiController
    {
        // GET: api/Product
        public IEnumerable<Product> Get()
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetProducts();
            }
        }

        // GET: api/Product
        public IEnumerable<Product> Get(int id)
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetProductsByCategory(id);
            }
        }
    }
}
