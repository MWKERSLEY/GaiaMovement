using GaiaMovement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace GaiaMovement.Controllers
{
    public class HomeController : Controller
    {
        private Gaia130618Entities1 db = new Gaia130618Entities1();
        public ActionResult Index(int starcount = 1000, int type = 1)
        {
            ViewBag.title = starcount;
            HttpContext.Server.ScriptTimeout = 300;
            Random rnd = new Random();
            var rtnlist = new List<double>();
            for (int i = 0; i < starcount/2; i++)
            {
                rtnlist.Add(rnd.Next(7183263));
            }
            if (type>2 || type<0) {
                type = rnd.Next(3);
            }
            if (type==1)
            {
                var stars = (from m in db.Smallers
                             select m).Where(x => rtnlist.Contains(x.ID)).Take(starcount);

                var serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = Int32.MaxValue;
                var starString = new PosAndVelJSON();
                starString.PosAndVelJSONString = serializer.Serialize(stars);

                return View(starString);
            } else
            if(type==2)
            {
                var stars = (from m in db.Smallers
                             select m).Where(x => rtnlist.Contains(x.ID) || (x.px * x.px + x.py * x.py + x.pz * x.pz) > 64000000).Take(starcount);

                var serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = Int32.MaxValue;
                var starString = new PosAndVelJSON();
                starString.PosAndVelJSONString = serializer.Serialize(stars);

                return View(starString);
            } else
            {
                var stars = (from m in db.Smallers
                             select m).Where(x => rtnlist.Contains(x.ID) || (x.px * x.px + x.py * x.py + x.pz * x.pz) > 64000000).Take(starcount);

                var serializer = new JavaScriptSerializer();
                serializer.MaxJsonLength = Int32.MaxValue;
                var starString = new PosAndVelJSON();
                starString.PosAndVelJSONString = serializer.Serialize(stars);

                return View(starString);
            }
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}