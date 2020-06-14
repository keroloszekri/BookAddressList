using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class Job
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Person> People { get; set; }
    }
}