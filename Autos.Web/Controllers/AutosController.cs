using Autos.Web.Models;
using Autos.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Autos.Web.Controllers
{
    public class AutosController : Controller
    {
        
        private readonly AutoApiService _autoApiService;

        public AutosController(AutoApiService autoApiService)
        {
            _autoApiService = autoApiService;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var autos = await _autoApiService.GetAutosAsync();
                return View(autos);
            }
            catch
            {
                return View(new List<AutoViewModel>());
            }
        }
    }
}
