using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatabaseApi;

namespace WebApi.Controllers
{
    public class OrderController : ApiController
    {
        // GET: api/Order
        public IEnumerable<Order> Get(int customer_id)
        {
            using (DBProvider db = new DBProvider())
            {
                return db.GetOrders().Where(e => e.CustomerId == customer_id);
            }
        }

        // POST: api/Order
        [HttpPost]
        public void Post([FromBody]Models.OrderRequest orderReq)
        //public void Post(IEnumerable<Models.Product> products, Models.User user)
        //public void Post(int user_id, int product_id, int price, int count)
        //public void Post([FromBody] Models.User user)
        {
            using (DBProvider db = new DBProvider())
            {
                db.AddOrder(new Order(DateTime.Now, orderReq.user.Id));
                Order order = db.GetOrders().OrderBy(e => e.Id).Last();
                foreach (Models.Product product in orderReq.products)
                {
                    db.AddOrderProduct(order.Id, product.Id, product.Price, product.Count);
                }
            }
        }

        // PUT: api/Order/5
        [HttpPut]
        public void Put(int order_id, [FromBody]Models.OrderStatusRequest body)
        {
            using (DBProvider db = new DBProvider())
            {
                db.SetOrderStatus(order_id, body.status);
            }
        }
    }
}
