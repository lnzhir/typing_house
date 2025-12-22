using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public float Price { get; set; }
        public int Count { get; set; }
        public int Category_id { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }

    }
}