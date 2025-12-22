using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class CategoryController : ApiController
    {
        // GET: api/Category
        public IEnumerable<Category> Get()
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetCategories();
            }
        }

        // Get: api/Category
        public Category Get(int id)
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetCategoryById(id);
            }
        }
    }
}
