using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using AddressBook.Models;
using Microsoft.AspNet.Identity;

namespace AddressBook.Controllers
{
    //[Authorize]
    public class PeopleController : ApiController
    {
        private ApplicationDBContext db = new ApplicationDBContext();
        // GET: api/People
        [AllowAnonymous]
        public List<Persondto> GetPeople()
        {
            List<Persondto> personListdto = new List<Persondto>();
            foreach (var item in db.People)
            {
                Persondto persondto = new Persondto();
                persondto.ID = item.ID;
                persondto.Name = item.Name;
                //persondto.Job = item.Job.Name;
                //persondto.Department = item.Department.Name;
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
                personListdto.Add(persondto);
            }
            return personListdto;
        }

        // GET: api/People/5
        [ResponseType(typeof(Person))]
        public IHttpActionResult GetPerson(int id)
        {
            Person person = db.People.Find(id);
            if (person == null)
            {
                return NotFound();
            }

            Persondto persondto = new Persondto();
            persondto.ID = person.ID;
            persondto.Name = person.Name;
            persondto.Job = person.Job.Name;
            persondto.Department = person.Department.Name;
            persondto.Img = person.Img;
            persondto.Phone = person.Phone;
            persondto.Date = person.Date;
            persondto.Address = person.Address;
            persondto.Email = person.Email;
            persondto.Age = person.Age;

            if (person.UserID != null)
            {
                persondto.UserID = person.UserID;
            }

            return Ok(persondto);
        }

        // PUT: api/People/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPerson(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            Person newComputer = db.People.Find(id);
            string PathImage;
            var httpRequest = HttpContext.Current.Request;
            //newComputer.ID = httpRequest["ID"];
            newComputer.Name = httpRequest["Name"];
            newComputer.JobID = int.Parse(httpRequest["Job"]);
            newComputer.DepartmentID = int.Parse(httpRequest["Department"]);
            newComputer.Phone = httpRequest["Phone"];
            newComputer.Date = DateTime.Parse(httpRequest["Date"]);
            newComputer.Address = httpRequest["Address"];
            newComputer.Email = httpRequest["Email"];
            newComputer.Age = int.Parse(httpRequest["Age"]);
            newComputer.UserID = User.Identity.GetUserId();
            
            if (httpRequest.Files["Img"] != null)
            {
                var postedFile = httpRequest.Files["Img"];
                PathImage = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "_");
                PathImage += DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                string filePath = "";
                filePath = HttpContext.Current.Server.MapPath("~/Content/" + PathImage);
                newComputer.Img = PathImage;
                postedFile.SaveAs(filePath);
            }

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/People
        [ResponseType(typeof(Person))]
        public IHttpActionResult PostPerson()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Person newComputer = new Person();
            string PathImage;
            var httpRequest = HttpContext.Current.Request;
            var postedFile = httpRequest.Files["Img"];
            //newComputer.ID = httpRequest["ID"];
            newComputer.Name = httpRequest["Name"];
            newComputer.JobID = int.Parse(httpRequest["Job"]);
            newComputer.DepartmentID = int.Parse(httpRequest["Department"]);
            newComputer.Phone = httpRequest["Phone"];
            newComputer.Date = DateTime.Parse(httpRequest["Date"]);
            newComputer.Address = httpRequest["Address"];
            newComputer.Email = httpRequest["Email"];
            newComputer.Age = int.Parse(httpRequest["Age"]);
            newComputer.UserID = User.Identity.GetUserId();
            PathImage = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            PathImage += DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            //Guid.NewGuid();
            string filePath = "";

            filePath = HttpContext.Current.Server.MapPath("~/Content/" + PathImage);
            newComputer.Img = PathImage;
            postedFile.SaveAs(filePath);
            db.People.Add(newComputer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PersonExists(newComputer.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = newComputer.ID }, newComputer);
        }

        // DELETE: api/People/5
        [ResponseType(typeof(Person))]
        public IHttpActionResult DeletePerson(int id)
        {
            Person person = db.People.Find(id);
            if (person == null)
            {
                return NotFound();
            }

            //Delete Image From File
            string filePath = HttpContext.Current.Server.MapPath("~/Content/" + person.Img);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            db.People.Remove(person);
            db.SaveChanges();

            return Ok(person);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonExists(int id)
        {
            return db.People.Count(e => e.ID == id) > 0;
        }
    }
}