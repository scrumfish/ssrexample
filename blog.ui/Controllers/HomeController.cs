using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using blog.ui.Models;
using blog.objects.Interfaces;
using Microsoft.AspNetCore.Http.Extensions;

namespace blog.ui.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IBlogData _blogData;

    public HomeController(ILogger<HomeController> logger, IBlogData data)
    {
        _logger = logger;
        _blogData = data;
    }

    public IActionResult Index()
    {
        ViewBag.properties = new
        {
            url = Request.GetDisplayUrl(),
            blogs = _blogData.GetTitles()
        };
        return View();
    }

    [Route("blog/{id}")]
    public IActionResult Blog([FromRoute] string id)
    {
        ViewBag.properties = new
        {
            url = Request.GetDisplayUrl(),
            blog = _blogData.Get(id)
        };
        return View("Index");
    }


    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
