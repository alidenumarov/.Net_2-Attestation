using Lab7_SPA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab7_SPA.Data
{
    public class DbInitializer
    {
        public static void Initializer(SocialNetworkContext context)
        {
            context.Database.EnsureCreated();

            if (context.Persons.Any()) { return; }

            var Persons = new Person[]
            {
                new Person{Name="Sam", Category="Cat 1", Mark=3},
                new Person{Name="Ban", Category="Cat 1", Mark=4},
                new Person{Name="Smith", Category="Cat 2", Mark=2},
                new Person{Name="John", Category="Cat 2", Mark=3},
                new Person{Name="Ann", Category="Cat 2", Mark=5},
                new Person{Name="Will", Category="Cat 3", Mark=1},
                new Person{Name="Tom", Category="Cat 3", Mark=4},
                new Person{Name="Isco", Category="Cat 3", Mark=4},
                new Person{Name="Ten", Category="Cat 3", Mark=5},
                new Person{Name="Gorge", Category="Cat 3", Mark=3}

            };

            foreach (Person p in Persons)
            {
                context.Persons.Add(p);
            }
            context.SaveChanges();
        }
    }
}
