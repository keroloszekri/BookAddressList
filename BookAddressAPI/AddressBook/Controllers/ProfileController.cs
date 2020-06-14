using AddressBook.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AddressBook.Controllers
{
    public class ProfileController : ApiController
    {
        private ApplicationDBContext db = new ApplicationDBContext();

        public List<Persondto> GetProfile()
        {
            List<Persondto> PeopleListdto = new List<Persondto>();
            string ProfileID = User.Identity.GetUserId();

            foreach (var item in db.People.Where(s => s.UserID == ProfileID))
            {
                Persondto persondto = new Persondto();
                persondto.ID = item.ID;
                persondto.Name = item.Name;
                persondto.Img = item.Img;
                persondto.Phone = item.Phone;
                persondto.Date = item.Date;
                persondto.Address = item.Address;
                persondto.Email = item.Email;
                persondto.Age = item.Age;

                if (item.UserID != null)
                {
                    persondto.UserID = item.UserID;
                }
                PeopleListdto.Add(persondto);
            }
            return PeopleListdto;
        }
    }
}
