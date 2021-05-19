using System.ComponentModel.DataAnnotations;

namespace WikiCorp.CoreApi.DTO
{
    public class KullaniciKayitDTO
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Adi { get; set; }

        [Required]
        public string Soyadi { get; set; }

        [Required]
        public string Email { get; set; } 

        [Required]
        public string Password { get; set; }
    }
}