using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string LastName { get; set; }

        public User(int id, string email, string first_name, string sur_name, string last_name)
        {
            this.Id = id;
            this.Email = email;
            this.FirstName = first_name;
            this.SurName = sur_name;
            this.LastName = last_name;
        }
    }
}