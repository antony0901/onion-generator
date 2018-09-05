using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Net.Http.Headers;
using PROJECT_NAME.Models;
using PROJECT_NAME.Common;
using PROJECT_NAME.Infrastructure.Helpers;
using PROJECT_NAME.Infrastructure.Extensions;

namespace PROJECT_NAME.Controllers
{
  [Route("api/[controller]")]
  public class HubController : Controller
  {
    private readonly AppSettings appSettings;
    public HubController(IOptions<AppSettings> _appSettingsOptions)
    {
      this.appSettings = _appSettingsOptions.Value;
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> Get(string path)
    {
        var requestUri = $"{this.appSettings.BaseApiUrl}/{path}";
        var response = await HttpRequestFactory.Get(requestUri);
        var result = response.ContentAsType<Object>();
        return Json(new ResponseAsObject
        {
            Data = result
        });
    }
  }
}
