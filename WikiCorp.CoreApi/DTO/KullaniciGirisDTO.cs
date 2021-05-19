using System.ComponentModel.DataAnnotations;

namespace WikiCorp.CoreApi.DTO
{
    public class KullaniciGirisDTO
    {
        [Required]
        public string UserName { get; set; } 
        [Required]
        public string Password { get; set; }
    }
}