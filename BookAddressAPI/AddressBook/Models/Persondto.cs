﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class Persondto
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Job { get; set; }
        public string Department { get; set; }
        public string Img { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public DateTime Date { get; set; }
        public string Address { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public int Age { get; set; }

        public String UserID { get; set; }     
    }
}