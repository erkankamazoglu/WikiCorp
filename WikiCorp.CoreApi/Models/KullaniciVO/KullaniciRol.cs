using WikiCorp.CoreApi.Models.Base;

namespace WikiCorp.CoreApi.Models.KullaniciVO
{
    public class KullaniciRol : BaseModel
    {
        public int KullaniciId { get; set; }
        public int RolId { get; set; }
    }
}