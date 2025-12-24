using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Configuration;

namespace WebApi.Controllers
{
    public class AssetController : ApiController
    {
        // GET: api/Asset
        public IHttpActionResult Get(string path)
        {
            string fullPath = Path.Combine(ConfigurationManager.AppSettings["itemsPath"], path);
            //var stream = new MemoryStream();

            var result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(File.ReadAllBytes(fullPath));
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = path;
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return ResponseMessage(result);
        }
    }
}
