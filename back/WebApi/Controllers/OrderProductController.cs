using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class OrderProductController : ApiController
    {
        // GET: api/OrderProduct
        public IEnumerable<OrderProduct> Get(int order_id)
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetOrderProducts(order_id);
            }
        }
    }
}
