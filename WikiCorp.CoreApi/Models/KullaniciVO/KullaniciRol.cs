using System.ComponentModel.DataAnnotations.Schema;
using WikiCorp.CoreApi.Models.Base;
using WikiCorp.CoreApi.Models.ParametreVO;

namespace WikiCorp.CoreApi.Models.KullaniciVO
{
    public class KullaniciRol : BaseModel
    {
        [ForeignKey("Kullanici")]
        public int KullaniciId { get; set; }

        [ForeignKey("Rol")]
        public int RolId { get; set; }

        public virtual Kullanici Kullanici { get; set; }
        
        public virtual Rol Rol { get; set; }
    }
}