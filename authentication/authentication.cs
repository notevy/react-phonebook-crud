using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// var httpClient = new HttpClient();

// var pairs = new List<KeyValuePair<string, string>>
// {
//     new KeyValuePair<string, string>("client_id", "fdda41a2-409b-48ee-a733-c027770f401d"),
//     new KeyValuePair<string, string>("code", "9AB40D099BB33A9EE57682B51111787E31EC4C6B5903BED4F8DAD0F14D1A9E03-1"),
//     new KeyValuePair<string, string>("grant_type", "authorization_code"),
//     new KeyValuePair<string, string>("client_secret", "fdda41a2-409b-48ee-a733-c027770f401d"),
//     new KeyValuePair<string, string>("redirect_uri", "https://phonebook-crud/redirect")
// };

// var content = new FormUrlEncodedContent(pairs);
// var result = await httpClient.PostAsync(new Uri("https://test-login.softrig.com/connect/token"), content)

//     Console.WriteLine(result);

namespace PhonebookCRUD.Controller
{
    Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TokensController : ControllerBase
    {

        private readonly Client Client = new Client
        {
            clientId = "fdda41a2-409b-48ee-a733-c027770f401d",
            clientSecret = "test"
        };

        [HttpGet]
        public async Task<IActionResult> GetToken([FromQuery(Name = "code")] string code = null)
        {
            if (code == null)
            {
                return Ok("No code");
            }

            var httpClient = new HttpClient();

            var pairs = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("client_id", Client.clientId),
                new KeyValuePair<string, string>("code", code),
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("client_secret", Client.clientSecret),
                new KeyValuePair<string, string>("redirect_uri", "https://phonebook-crud/redirect"),
            };

            var content = new FormUrlEncodedContent(pairs);
            var result = await httpClient.PostAsync(new Uri("https://test-login.softrig.com/connect/token"), content);
            var returnContent = await result.Content.ReadAsStringAsync();

            if (!result.IsSuccessStatusCode) return BadRequest(returnContent);

            var identityResponse = JsonConvert.DeserializeObject<IdentityResponse>(returnContent);

            return await GetDataFromCompany(identityResponse.access_token);
        }

        private async Task<IActionResult> GetDataFromCompany(string accessToken)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            try
            {

                var jwtSecurityToken = new JwtSecurityToken(accessToken);
                if (jwtSecurityToken.Payload.TryGetValue("AppFramework", out var baseUrl))
                {
                    Console.WriteLine($"Base url is {baseUrl}");
                    var apiResult = await httpClient.GetAsync(new Uri(baseUrl + "api/biz/contracts"));

                    return Ok(await apiResult.Content.ReadAsStringAsync());
                }
                else
                {
                    return BadRequest($"Could not find claim on token");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return BadRequest("this is wrong");
        }

    }

    internal class IdentityResponse
    {
        public string id_token { get; set; }
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }
        public string refresh_token { get; set; }
    }

    internal class Client
    {
        public string clientId { get; set; }
        public string clientSecret { get; set; }
    }
}
Develop
Authentication
Documentation
How to
Support
Chat with developers
Use of cookies
Data protection declaration
