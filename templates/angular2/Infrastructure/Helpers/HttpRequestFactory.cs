using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace PROJECT_NAME.Infrastructure.Helpers
{
  public static class HttpRequestFactory
  {
    public static async Task<HttpResponseMessage> Get(string requestUri)
    {
      var builder = new HttpRequestBuilder()
                          .AddMethod(HttpMethod.Get)
                          .AddRequestUri(requestUri);

      return await builder.SendAsync();
    }

    public static async Task<HttpResponseMessage> Post(
       string requestUri, object value)
    {
      var builder = new HttpRequestBuilder()
                          .AddMethod(HttpMethod.Post)
                          .AddRequestUri(requestUri)
                          .AddContent(new JsonContent(value));

      return await builder.SendAsync();
    }

    public static async Task<HttpResponseMessage> Put(
       string requestUri, object value)
    {
      var builder = new HttpRequestBuilder()
                          .AddMethod(HttpMethod.Put)
                          .AddRequestUri(requestUri)
                          .AddContent(new JsonContent(value));

      return await builder.SendAsync();
    }

    public static async Task<HttpResponseMessage> Patch(
       string requestUri, object value)
    {
      var builder = new HttpRequestBuilder()
                          .AddMethod(new HttpMethod("PATCH"))
                          .AddRequestUri(requestUri)
                          .AddContent(new PatchContent(value));

      return await builder.SendAsync();
    }

    public static async Task<HttpResponseMessage> Delete(string requestUri)
    {
      var builder = new HttpRequestBuilder()
                          .AddMethod(HttpMethod.Delete)
                          .AddRequestUri(requestUri);

      return await builder.SendAsync();
    }
  }
  public class JsonContent : StringContent
  {
    public JsonContent(object value)
        : base(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json")
    {
    }

    public JsonContent(object value, string mediaType)
        : base(JsonConvert.SerializeObject(value), Encoding.UTF8, mediaType)
    {
    }
  }

  public class PatchContent : StringContent
  {
    public PatchContent(object value)
        : base(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json-patch+json")
    {
    }
  }

  public class FileContent : MultipartFormDataContent
  {
    public FileContent(string filePath, string apiParamName)
    {
      var filestream = File.Open(filePath, FileMode.Open);
      var filename = Path.GetFileName(filePath);

      Add(new StreamContent(filestream), apiParamName, filename);
    }
  }
}