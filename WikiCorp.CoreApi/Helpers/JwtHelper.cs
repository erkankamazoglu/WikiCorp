using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace WikiCorp.CoreApi.Helpers
{
    public class JwtHelper
    {
        public static int GetUserIdFromToken(ClaimsPrincipal currentUser)
        {
            int userId = -1;
            Console.WriteLine("deneme1"); 
            if (currentUser.HasClaim(c => c.Type == (string)ClaimTypes.NameIdentifier))    
            {    
                userId = Int32.Parse(currentUser.FindFirstValue(ClaimTypes.NameIdentifier));      
                Console.WriteLine("userId");  
                Console.WriteLine(userId);  
            }
             Console.WriteLine("deneme1");

            return userId;
        }
    }
}