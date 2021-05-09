using Microsoft.AspNetCore.Identity;

namespace WikiCorp.CoreApi.Models.KullaniciVO
{
    public class Kullanici : IdentityUser<int>
    {
        public string Adi { get; set; }
        public string Soyadi { get; set; }
    }
}