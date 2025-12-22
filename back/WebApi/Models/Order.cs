using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{


    public class OrderRequest
    {
        public IEnumerable<Models.Product> products { set; get; }
        public Models.User user { set; get; }
    }
}