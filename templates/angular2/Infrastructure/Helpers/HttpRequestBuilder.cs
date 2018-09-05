using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace PROJECT_NAME.Infrastructure.Helpers
{
  public class HttpRequestBuilder
  {
    private HttpMethod method = null;
    private string requestUri = "";
    private HttpContent content = null;
    private string bearerToken = "";
    private string acceptHeader = "application/json";
    private TimeSpan timeout = new TimeSpan(0, 0, 15);

    public HttpRequestBuilder()
    {
    }

    public HttpRequestBuilder AddMethod(HttpMethod method)
    {
      this.method = method;
      return this;
    }

    public HttpRequestBuilder AddRequestUri(string requestUri)
    {
      this.requestUri = requestUri;
      return this;
    }

    public HttpRequestBuilder AddContent(HttpContent content)
    {
      this.content = content;
      return this;
    }

    public HttpRequestBuilder AddBearerToken(string bearerToken)
    {
      this.bearerToken = bearerToken;
      return this;
    }

    public HttpRequestBuilder AddAcceptHeader(string acceptHeader)
    {
      this.acceptHeader = acceptHeader;
      return this;
    }

    public HttpRequestBuilder AddTimeout(TimeSpan timeout)
    {
      this.timeout = timeout;
      return this;
    }

    public async Task<HttpResponseMessage> SendAsync()
    {
      // Setup request
      var request = new HttpRequestMessage
      {
        Method = this.method,
        RequestUri = new Uri(this.requestUri)
      };

      if (this.content != null)
        request.Content = this.content;

      if (!string.IsNullOrEmpty(this.bearerToken))
        request.Headers.Authorization =
          new AuthenticationHeaderValue("Bearer", this.bearerToken);

      request.Headers.Accept.Clear();
      if (!string.IsNullOrEmpty(this.acceptHeader))
        request.Headers.Accept.Add(
           new MediaTypeWithQualityHeaderValue(this.acceptHeader));

      // Setup client
      var client = new System.Net.Http.HttpClient();
      client.Timeout = this.timeout;

      return await client.SendAsync(request);
    }
  }
}